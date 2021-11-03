import React, { createRef, useEffect, useState } from 'react';
import { addJobPosting, getJobPosting } from '../../util/fetch/api';
import { formatDate, slicePage } from '../../util';
import Paginate from '../Paginate';

const JobPosting = () => {
  const [jobPosting, setJobPosting] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const reloadJobPosting = async () => {
    const jobPosting = await getJobPosting();
    setJobPosting(jobPosting);
  };
  useEffect(() => {
    (async () => {
      await reloadJobPosting();
    })();
  }, []);

  const titleRef = createRef();
  const industryRef = createRef();
  const countryRef = createRef();
  const remoteRef = createRef();
  const streetAddressRef = createRef();
  const cityRef = createRef();
  const stateRef = createRef();
  const zipRef = createRef();

  const handleOnAdd = async () => {
    const d = {
      title: titleRef.current.value,
      industry: industryRef.current.value,
      country: countryRef.current.value,
      inPerson: !remoteRef.current.checked,
      streetAddress: streetAddressRef.current.value,
      city: cityRef.current.value,
      state: stateRef.current.value,
      zip: zipRef.current.value,
    };
    await addJobPosting(d);
    await reloadJobPosting();
  };

  return (
    <div className="row">
      <div className="col-6">
        <h6>Add a new product to sell</h6>
        <div className="inputLabel">Product name</div>
        <input type="text" ref={titleRef} />
        <div className="inputLabel">Product category</div>
        <input type="text" ref={industryRef} />
        <div className="inputLabel">Price</div>
        <input type="text" ref={countryRef} />
        <div className="inputLabel">Delivery type</div>
        <input type="radio" name="workStyle" defaultChecked />
        &nbsp;Self pickup&nbsp;&nbsp;&nbsp;
        <input type="radio" name="workStyle" ref={remoteRef} />
        &nbsp;Will be shipped by seller
        <h6 className="smallMarginTop">Pickup address</h6>
        <div className="inputLabel">Street address</div>
        <input type="text" ref={streetAddressRef} />
        <div className="inputLabel">City</div>
        <input type="text" ref={cityRef} />
        <div className="inputLabel">State</div>
        <input type="text" ref={stateRef} />
        <div className="inputLabel">Zip</div>
        <input type="text" ref={zipRef} />
        <div className="mt-3">
          <button className="btn-primary" onClick={handleOnAdd}>
            Add
          </button>
        </div>
      </div>
      <div className="col-6">
        <h6>Products</h6>
        {jobPosting.length === 0 && (
          <div>You have not added any products yet.</div>
        )}
        {slicePage(jobPosting, currentPage).map((j) => {
          return (
            <div key={j._id} className="card mb-3">
              <div className="card-body">
                <div>
                  <span className="inputLabel">Product name&nbsp;</span>
                  {j.title}
                </div>
                <div>
                  <span className="inputLabel">Product category&nbsp;</span>
                  {j.industry}
                </div>
                <div>
                  <span className="inputLabel">Price&nbsp;</span>
                  {j.country}
                </div>
                <div>
                  <span className="inputLabel">Delivery type&nbsp;</span>
                  {j.inPerson ? 'Self-pickup' : 'Will be shipped by seller'}
                </div>
                <div className="small inputLabel">
                  Created on {formatDate(j.createdAt)}
                </div>
              </div>
            </div>
          );
        })}
        <div className="mt-3">
          <Paginate
            numItems={jobPosting.length}
            onPageChange={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
};

JobPosting.propTypes = {};

export default JobPosting;
