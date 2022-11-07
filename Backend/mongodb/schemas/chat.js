module.exports = (mongoose) => {
  const chatSchema = new mongoose.Schema(
    {
      user1: { type: String, required: true },
      user2: { type: String, required: true },
      channel: { type: String, required: true },
      messages: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Messages",
        },
      ],
    },
    {
      timestamps: true,
    }
  );

  return mongoose.model("Chat", chatSchema);
};
