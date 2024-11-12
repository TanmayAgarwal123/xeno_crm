const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  audienceSegmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AudienceSegment',
    required: true,
  },
  messageContent: {
    type: String,
    required: true,
  },
  deliveryStatus: {
    type: String,
    enum: ['SENT', 'FAILED'],
    required: true,
  },
  stats: {
    totalSent: {
      type: Number,
      default: 0,
    },
    totalFailed: {
      type: Number,
      default: 0,
    },
  },
}, { timestamps: true });

module.exports = mongoose.model('Campaign', campaignSchema);
