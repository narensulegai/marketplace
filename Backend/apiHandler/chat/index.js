const { Chat, Messages } = require("../../mongodb");
module.exports = {
  getChats: async (req, resp) => {
    const chats = await Chat.find({
      $or: [{ user1: req.params.id }, { user2: req.params.id }],
    }).populate({
      path: "messages",
      options: {
        limit: 10,
        sort: { created: -1 },
      },
    });
    resp.json(chats);
  },
  sendMessage: async (req, resp) => {
    console.log(req.body.channel);
    const channel = await Chat.findById(req.body.channel);
    const message = await new Messages({ ...req.body }).save();
    channel.messages.push(message._id);
    channel.save();
    resp.json(message);
  },

  createChannel: async (req, resp) => {
    console.log({ ...req.body });
    const channel = await new Chat({ ...req.body }).save();
    resp.json(channel);
  },
};
