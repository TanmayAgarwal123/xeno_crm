const express = require('express');
const mongoose = require('mongoose');
const Customer = require('./models/Customer');
const Order = require('./models/Order');

const app = express();
require('dotenv').config();

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

app.get('/', (req, res) => {
    res.send('Hello World from Xeno CRM!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
app.post('/api/customers', async (req, res) => {
    try {
      const customer = new Customer(req.body);
      await customer.save();
      res.status(201).json(customer);
    } catch (error) {
      res.status(400).json({ message: 'Error saving customer data' });
    }
  });
  app.post('/api/orders', async (req, res) => {
    try {
      const order = new Order(req.body);
      await order.save();
      res.status(201).json(order);
    } catch (error) {
      res.status(400).json({ message: 'Error saving order data' });
    }
  });

  const AudienceSegment = require('./models/AudienceSegment');

app.post('/api/audience-segments', async (req, res) => {
  try {
    const { name, conditions } = req.body;

    // Build a MongoDB filter based on conditions
    const filter = conditions.reduce((acc, cond) => {
      if (cond.operator === '>') acc[cond.field] = { $gt: cond.value };
      if (cond.operator === '<=') acc[cond.field] = { $lte: cond.value };
      if (cond.operator === '==') acc[cond.field] = cond.value;
      return acc;
    }, {});

    // Calculate audience size
    const audienceSize = await Customer.countDocuments(filter);

    // Create and save the audience segment
    const audienceSegment = new AudienceSegment({ name, conditions, audienceSize });
    await audienceSegment.save();

    res.status(201).json(audienceSegment);
  } catch (error) {
    res.status(400).json({ message: 'Error creating audience segment' });
  }
});
const Campaign = require('./models/Campaign');

app.get('/api/campaigns', async (req, res) => {
    try {
      const campaigns = await Campaign.find().populate('audienceSegmentId'); // Populate audience segment
      res.status(200).json(campaigns);
    } catch (error) {
      console.error('Error retrieving campaigns:', error);
      res.status(500).json({ message: 'Error retrieving campaigns', error: error.message });
    }
  });
  
// POST /api/campaigns - Create a new campaign with dynamic data
app.post('/api/campaigns', async (req, res) => {
    try {
        // Get campaign data from the body (raw JSON input from Postman)
        const { name, audienceSegmentId, messageContent, deliveryStatus, stats } = req.body;

        // Create a new campaign object
        const campaign = new Campaign({
            name,
            audienceSegmentId,  // Ensure this ID is valid from the Audience Segment collection
            messageContent,
            deliveryStatus,
            stats
        });

        // Save campaign to the database
        await campaign.save();

        // Send a success response
        res.status(201).json(campaign);
    } catch (error) {
        console.error('Error creating campaign:', error);
        res.status(400).json({ message: 'Error creating campaign', error: error.message });
    }
});