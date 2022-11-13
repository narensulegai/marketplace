module.exports = (mongoose) => {
  const chatUserSchema = new mongoose.Schema(
    {
      user: { type: String, required: true },
      type: { type: String, required: true },
    },
    {
      timestamps: true,
    }
  );

  return mongoose.model("ChatUser", chatUserSchema);
};
