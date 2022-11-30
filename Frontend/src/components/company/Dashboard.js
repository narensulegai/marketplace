import React, { useEffect, useState } from "react";
// import Paginate from '../Paginate';
import { currentUser, getCompanyQuotes } from "../../util/fetch/api";

const Dashboard = () => {
  const [quotes, setQuotes] = useState([]);
  const [current, setCurrent] = useState({});
  useEffect(() => {
    (async () => {
      setQuotes(await getCompanyQuotes());
      const { user } = await currentUser();
      setCurrent(user);
    })();
  }, []);

  return (
    <div className="row">
      <div className="col-12">
        <h4>Quotes from users</h4>
      </div>
      <div className="col-12">
        <table className="table mediumMarginTop">
          <thead className="thead-light">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Quote status</th>
              <th scope="col">Last updated</th>
              <th scope="col"></th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {quotes.map((buyer) => {
              return (
                <tr key={buyer._id}>
                  <td>{buyer.name}</td>
                  <td>
                    <a href={`mailto:${buyer.email}`}>{buyer.email}</a>
                  </td>
                  <td>
                    <div className="badge badge-pill badge-success">
                      Progress
                    </div>
                  </td>
                  <td>
                    <div className="small">
                      {new Date(buyer.updatedAt).toLocaleString()}
                    </div>
                  </td>
                  <td>
                    {/* You can add any more parameters you want */}
                    <a href={`#/company/${buyer._id}/${current._id}/chat`}>
                      <button className="btn-primary">Chat</button>
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* <div className="col-12"> */}
      {/*  <Paginate numItems={10} onPageChange={() => {}} currentPage={0} /> */}
      {/* </div> */}
    </div>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
