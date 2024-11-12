const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  name: String,
  totalSpent: Number,
  visits: Number,
  lastVisit: Date,
});

// Create indexes on fields used for querying
CustomerSchema.index({ totalSpent: 1 });
CustomerSchema.index({ visits: 1 });

module.exports = mongoose.model('Customer', CustomerSchema);
