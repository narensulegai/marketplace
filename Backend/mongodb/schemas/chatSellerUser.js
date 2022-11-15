module.exports = (mongoose) => {
  const chatSellerUserSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    type: { type: String, required: true },
  });

  return mongoose.model("ChatSellerUser", chatSellerUserSchema);
};
