import {
  get, post, destroy, put, apiUrl,
} from '..';

export const currentUser = () => get('currentUser');
export const loginUser = (type, d) => put(`login/${type}`, d);
export const signupCompany = (d) => post('signup/company', d);
export const signupEmployee = (d) => post('signup/employee', d);
export const updateCompany = (d) => put('company', d);
export const updateEmployee = (d) => put('employee', d);
export const getCompany = (id) => get(`company/profile/${id}`);
export const getEmployee = (id) => get(`employee/profile/${id}`);
export const addCompanyPhotos = (id, d) => post(`companyPhoto/${id}`, d);
export const logout = () => put('logout');
export const fetchCompanyPhotos = (unApproved) => get(`admin/companyPhotos/${unApproved}`);

export const fileUrl = (fileId) => {
  return `${apiUrl}/file/${fileId}`;
};

export const getAnalyticsData = () => get('admin/analytics');
