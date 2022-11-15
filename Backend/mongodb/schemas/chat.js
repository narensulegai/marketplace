module.exports = (mongoose) => {
  const chatSchema = new mongoose.Schema(
    {
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ChatUser",
        required: true,
      },
      receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ChatUser",
        required: true,
      },
      channel: { type: String, required: true },
      text: { type: String, required: true },
    },
    {
      timestamps: true,
    }
  );

  return mongoose.model("Chat", chatSchema);
};
