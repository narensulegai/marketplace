import React, { useEffect, useState } from 'react';
import {
  currentUser, getEmployeeJobApplications, withdrawJobApplication,
} from '../../util/fetch/api';
import { formatDate } from '../../util';

const status = {
  submitted: 'Order Placed',
  reviewed: 'Processing',
  screening: 'Packing',
  interviewing: 'Out for delivery',
  hired: 'Delivered',
  rejected: 'Cancelled',
};
const MyJobApplications = () => {
  const [employee, setEmployee] = useState(null);
  const [jobApplications, setJobApplications] = useState([]);

  const reloadJobs = async () => {
    const jobApplications = await getEmployeeJobApplications();
    setJobApplications(jobApplications);
  };

  useEffect(() => {
    (async () => {
      const { user: employee } = await currentUser();
      setEmployee(employee);
      await reloadJobs();
    })();
  }, []);

  const withdrawJob = async (id) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      await withdrawJobApplication(id);
      await reloadJobs();
    }
  };

  return (
    <div className="row">
      <div className="col-6">
        {employee && (
        <>
          <h6>My orders</h6>
          {jobApplications.length === 0 && <div>You have not ordered for any products yet.</div>}
          {jobApplications.map((jobApplication) => {
            return (
              <div key={jobApplication._id} className="card mb-3">
                <div className="card-body">
                  <div><span className="inputLabel">Product name</span>{jobApplication.job.title}</div>
                  <div><span className="inputLabel">Seller name</span>{jobApplication.job.company.name}</div>
                  <div><span className="inputLabel">Status</span>{status[jobApplication.status]}</div>
                  <div><span className="inputLabel small">Ordered on {formatDate(jobApplication.createdAt)}</span></div>
                  <div className="mt-3">
                    <button className="btn-danger" onClick={() => withdrawJob(jobApplication._id)}>Cancel order</button>
                  </div>
                </div>
              </div>
            );
          })}
        </>
        )}
      </div>
    </div>
  );
};

MyJobApplications.propTypes = {

};

export default MyJobApplications;
