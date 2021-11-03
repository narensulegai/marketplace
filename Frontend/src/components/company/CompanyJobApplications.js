import React, { useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import {
  fileUrl,
  getCompanyJobApplications, getJobPosting, setJobApplicationStatus,
} from '../../util/fetch/api';
import { formatDate } from '../../util';

const CompanyJobApplications = () => {
  const [jobApplications, setJobApplications] = useState({});
  const [jobPosting, setJobPosting] = useState([]);

  const statusRef = useRef({});

  useEffect(() => {
    (async () => {
      const jobPosting = await getJobPosting();
      const jobApplications = await getCompanyJobApplications();
      setJobPosting(jobPosting);
      setJobApplications(_.groupBy(jobApplications, 'job._id'));
    })();
  }, []);

  const handleOnChangeStatus = async (id) => {
    const status = statusRef.current[id].value;
    await setJobApplicationStatus(id, { status });
    window.alert('Status updated.');
  };

  return (
    <div className="row">
      <div className="col-6">
        <h6>Product orders</h6>
        {jobPosting.length === 0 && <div>You have not got any orders yet</div>}
        {jobPosting.map((jp) => {
          return (
            <div key={jp._id} className="card mb-3">
              <div className="card-body">

                <div className="mb-3">
                  <span><span className="inputLabel">Product name</span>{jp.title}</span>
                  <span> (has {jobApplications[jp._id] ? jobApplications[jp._id].length : 'no'} orders)</span>
                </div>
                {jobApplications[jp._id]
                  ? (
                    <div>
                      {jobApplications[jp._id]
                        .map((jobApplication) => {
                          return (
                            <div key={jobApplication._id} className="card mb-3">
                              <div className="card-body">
                                <div>
                                  <span><span className="inputLabel">Order placed by</span>
                                    <a target="_blank" href={`#/employeeHome/${jobApplication.employee._id}`}>
                                      {jobApplication.employee.name}
                                    </a>
                                  </span>
                                </div>
                                <div>
                                  <span className="inputLabel">Change order status</span>
                                  <select ref={(el) => statusRef.current[jobApplication._id] = el}
                                    defaultValue={jobApplication.status}>
                                    <option value="submitted">Order placed</option>
                                    <option value="reviewed">Processing</option>
                                    <option value="screening">Packing</option>
                                    <option value="interviewing">Out for delivery</option>
                                    <option value="hired">Delivered</option>
                                    <option value="rejected">Cancelled</option>
                                  </select>
                                </div>
                                <div><span
                                  className="inputLabel small">Order placed on {formatDate(jobApplication.createdAt)}</span>
                                </div>
                                <div className="mt-2">
                                  <button className="btn-primary"
                                    onClick={() => handleOnChangeStatus(jobApplication._id)}>
                                    Change status
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  )
                  : <div>No orders yet</div>}
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
};

CompanyJobApplications.propTypes = {};

export default CompanyJobApplications;
