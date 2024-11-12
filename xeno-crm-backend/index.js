const express = require('express');
const mongoose = require('mongoose');
const Customer = require('./models/Customer');
const Order = require('./models/Order');

const app = express();
app.use(express.json());

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
