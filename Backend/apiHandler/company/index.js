const { Company, Employee } = require("../../mongodb");

module.exports = {
  update: async (req, resp) => {
    const company = await Company.findById(req.session.user._id);
    Object.assign(company, req.body);
    resp.json(await company.save());
  },
  getEmployee: async (req, res) => {
    const { id: employeeId } = req.params;
    res.json(await Employee.findById(employeeId));
  },
};
