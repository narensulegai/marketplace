const { Chat, Company, Employee, ChatUser } = require("../../mongodb");
module.exports = {
  getChats: async (req, resp) => {
    console.log(req.params);

    await Chat.find()
      .populate({
        path: "sender",
        model: "ChatUser",
        options: {
          sort: { createdAt: -1 },
        },
      })
      .populate({
        path: "receiver",
        model: "ChatUser",
        options: {
          sort: { createdAt: -1 },
        },
      })
      .exec(async (err, chat) => {
        const chats = [];
        for (let i = 0; i < chat.length; i++) {
          const c = chat[i];
          let chatSenderUser = {};
          let chatReceiverUser = {};
          if (c.sender.type === "company") {
            chatSenderUser = await Company.findOne({
              _id: c.sender.user,
            });
          } else {
            chatSenderUser = await Employee.findOne({
              _id: c.sender.user,
            });
          }
          if (c.receiver.type === "company") {
            chatReceiverUser = await Company.findOne({
              _id: c.receiver.user,
            });
          } else {
            chatReceiverUser = await Employee.findOne({
              _id: c.receiver.user,
            });
          }

          c.sender = Object.assign(chatSenderUser);
          c.receiver = Object.assign(chatReceiverUser);
          chats.push(c);
        }
        console.log(chats);
        resp.json(chats);
      });
  },
  sendMessage: async (req, resp) => {
    // const sender = Object.assign(req.body.user1);
    // const receiver = Object.assign(req.body.user2);
    let sender = await ChatUser.findOne({
      user: req.body.user1.user,
    });
    if (sender === null) {
      userSeller = await new ChatUser({
        user: req.body.user1.user,
        type: "company",
      }).save();
    }

    let receiver = await ChatUser.findOne({ user: req.body.user2.user });
    if (receiver === null) {
      receiver = await new ChatUser({
        user: req.body.user2.user,
        type: "employee",
      }).save();
    }

    const chat = await new Chat({
      sender: sender,
      receiver: receiver,
      text: req.body.text,
      channel: req.body.channel,
    }).save();
    resp.json(chat);
  },

  createChannel: async (req, resp) => {
    console.log({ ...req.body });
    const channel = await new Chat({ ...req.body }).save();
    resp.json(channel);
  },
  getCompanyOrEmployee: async (req, res) => {
    const { id } = req.params;
    console.log("Employeee>>>" + id);
    const company = await Company.findById(id);
    console.log("company>>>" + company);
    if (company === null) {
      res.json(await Employee.findById(id));
    } else {
      res.json(await company);
    }
  },
};
