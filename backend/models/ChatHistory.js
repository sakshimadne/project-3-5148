// const mongoose = require('mongoose');

// const messageSchema = new mongoose.Schema({
//   content: {
//     type: String,
//     required: true
//   },
//   sender: {
//     type: String,
//     enum: ['user', 'bot'],
//     required: true
//   },
//   timestamp: {
//     type: Date,
//     default: Date.now
//   }
// });

// const chatHistorySchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   messages: [messageSchema],
//   lastUpdated: {
//     type: Date,
//     default: Date.now
//   }
// });

// module.exports = mongoose.model('ChatHistory', chatHistorySchema);