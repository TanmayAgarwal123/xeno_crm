const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  orderDate: Date,
  amount: Number,
});

module.exports = mongoose.model('Order', OrderSchema);
