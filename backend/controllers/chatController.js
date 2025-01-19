// const ChatHistory = require('../models/ChatHistory');
// const axios = require('axios');

// const chatController = {
//   // Send message to AI and store in history
//   sendMessage: async (req, res) => {
//     try {
//       const { userId, message } = req.body;

//       // Find or create chat history for user
//       let chatHistory = await ChatHistory.findOne({ userId });
//       if (!chatHistory) {
//         chatHistory = new ChatHistory({ userId, messages: [] });
//       }




//       // Add user message to history
//       chatHistory.messages.push({
//         content: message,
//         sender: 'user'
//       });

//       // Call Gemini AI API
//       const aiResponse = await axios.post('http://localhost:5000/Ai', {
//         prompt: message
//       });

//       // Add AI response to history
//       chatHistory.messages.push({
//         content: aiResponse.data,
//         sender: 'bot'
//       });

//       chatHistory.lastUpdated = new Date();
//       await chatHistory.save();

//       res.status(200).json({
//         message: aiResponse.data,
//         history: chatHistory.messages
//       });
//     } catch (error) {
//       console.error('Chat error:', error);
//       res.status(500).json({ error: error.message });
//     }
//   },

//   // Get chat history for user
//   getChatHistory: async (req, res) => {
//     try {
//       const { userId } = req.params;
//       const chatHistory = await ChatHistory.findOne({ userId });
      
//       res.status(200).json({
//         history: chatHistory ? chatHistory.messages : []
//       });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   },

//   // Clear chat history
//   clearHistory: async (req, res) => {
//     try {
//       const { userId } = req.params;
//       await ChatHistory.findOneAndUpdate(
//         { userId },
//         { $set: { messages: [] } }
//       );
//       res.status(200).json({ message: 'Chat history cleared' });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   }
// };

// module.exports = chatController;