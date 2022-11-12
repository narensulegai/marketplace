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
      mlRuleEngine: { type: Boolean, default: false },
      dataFile: { type: String, default: '' },
      dataFileLocation: { type: String, default: '' },
      targetColumn: { type: String, default: '' },
      mlJobCompletion: { type: String, default: 'Not Started' },
      mlJobFailureMessage: { type: String, default: '' },
      endPoint: { type: String, default: '' },
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
