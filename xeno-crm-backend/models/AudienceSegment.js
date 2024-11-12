const mongoose = require('mongoose');

const AudienceSegmentSchema = new mongoose.Schema({
  name: String,
  conditions: [
    {
      field: String,
      operator: String, // e.g., ">", "<=", "=="
      value: mongoose.Schema.Types.Mixed, // can be a number, date, etc.
    }
  ],
  audienceSize: Number,
});

module.exports = mongoose.model('AudienceSegment', AudienceSegmentSchema);
