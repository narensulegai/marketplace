const { Company, Employee } = require('../../mongodb');

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
  getQuotes: async (req, res) => {
    const company = await Company.findById(req.session.user._id);
    const id = company._id;
    const allEmployees = await Employee.find();
    const employees = allEmployees.filter((e) => !!e?.variables[id]);
    res.json(employees);
  },
};
