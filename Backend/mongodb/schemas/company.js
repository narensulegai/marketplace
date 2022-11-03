module.exports = (mongoose) => {
  const companySchema = new mongoose.Schema(
    {
      name: { type: String, required: true, index: { unique: true } },
      email: { type: String, required: true, index: { unique: true } },
      password: { type: String, required: true },
      description: { type: String },
      size: { type: Number },
      type: { type: String },
      revenue: { type: String },
      headquarters: { type: String },
      founded: { type: String },
      website: { type: String },
      mission: { type: String },
      profilePic: { type: String },
      formData: { type: Array, default: [] },
      ruleFormula: { type: String },
      mlRuleEngine: { type: Boolean },
      dataFile: { type: String },
      dataFileLocation: { type: String },
      targetColumn: { type: String },
    },
    {
      timestamps: true,
      toJSON: {
        transform: (doc, ret) => {
          // eslint-disable-next-line no-param-reassign
          delete ret.password;
        },
      },
      // eslint-disable-next-line comma-dangle
    }
  );

  return mongoose.model('Company', companySchema);
};
