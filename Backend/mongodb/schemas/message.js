module.exports = (mongoose) => {
  const messageSchema = new mongoose.Schema(
    {
      msg: { type: String, required: true },
      user1: { type: String, required: true },
      user2: { type: String, required: true },
      channel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "chats",
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

  return mongoose.model("Messages", messageSchema);
};
