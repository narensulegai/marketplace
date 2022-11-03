const { Employee, Company, CompanyPhoto } = require('../../mongodb');

module.exports = {
  update: async (req, resp) => {
    const employee = await Employee.findById(req.session.user._id);
    Object.assign(employee, req.body);
    const emp = await employee.save();
    resp.json(emp);
  },
  getCompany: async (req, res) => {
    const { id } = req.params;
    res.json(await Company.findById(id));
  },
  addCompanyPhoto: async (req, res) => {
    const { id: companyId } = req.params;
    const employeeId = req.session.user._id;
    const review = new CompanyPhoto({
      ...req.body,
      company: companyId,
      employee: employeeId,
    });
    res.json(await review.save());
  },
  getCompanyPhotos: async (req, res) => {
    const { id: companyId } = req.params;
    res.json(
      await CompanyPhoto.find({
        $and: [
          { company: companyId },
          { $or: [{ employee: req.session.user._id }, { status: 'approved' }] },
        ],
      })
        .populate('employee', '-resumes')
        .sort({ createdAt: -1 })
    );
  },
};
