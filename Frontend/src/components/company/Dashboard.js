import React from 'react';
import Paginate from '../Paginate';

const Dashboard = () => {
  return (
    <div className="row">
      <div className="col-12">
        <h4>Quotes from users</h4>
      </div>
      <div className="col-12">
        <table className="table mediumMarginTop">
          <thead className="thead-light">
            <tr>
              <th scope="col">#ID</th>
              <th scope="col">First name</th>
              <th scope="col">Last name</th>
              <th scope="col">Email</th>
              <th scope="col">Quote status</th>
              <th scope="col">Last updated</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1342</th>
              <td>Mark</td>
              <td>Otto</td>
              <td><a href="mailto:mark@gmail.com">mark@gmail.com</a></td>
              <td>
                <div className="badge badge-pill badge-success">Progress</div>
              </td>
              <td>
                <div className="small">15th Jan 2022, 5:20PM</div>
              </td>
              <td>
                <button className="btn-primary">Chat</button>
              </td>
            </tr>
            <tr>
              <th scope="row">2231</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td><a href="mailto:jacob@gmail.com">jacob@gmail.com</a></td>
              <td>
                <div className="badge badge-pill badge-secondary">Submitted</div>
              </td>
              <td>
                <div className="small">15th Jan 2022, 5:30PM</div>
              </td>
              <td>
                <button className="btn-primary">Chat</button>
              </td>
            </tr>
            <tr>
              <th scope="row">1233</th>
              <td>Larry</td>
              <td>Bird</td>
              <td><a href="mailto:larry@gmail.com">larry@gmail.com</a></td>
              <td>
                <div className="badge badge-pill badge-success">Progress</div>
              </td>
              <td>
                <div className="small">15th Jan 2022, 5:31PM</div>
              </td>
              <td>
                <button className="btn-primary">Chat</button>
              </td>
            </tr>
            <tr>
              <th scope="row">1232</th>
              <td>Guy</td>
              <td>Larry</td>
              <td><a href="mailto:guy@gmail.com">guy@gmail.com</a></td>
              <td>
                <div className="badge badge-pill badge-danger">Denied</div>
              </td>
              <td>
                <div className="small">14th Jan 2022, 4:31PM</div>
              </td>
              <td>
                <button className="btn-primary">Chat</button>
              </td>
            </tr>
            <tr>
              <th scope="row">1212</th>
              <td>Thrump</td>
              <td>Joe</td>
              <td><a href="mailto:thrump@gmail.com">thrump@gmail.com</a></td>
              <td>
                <div className="badge badge-pill badge-danger">Denied</div>
              </td>
              <td>
                <div className="small">12th Jan 2022, 4:31PM</div>
              </td>
              <td>
                <button className="btn-primary">Chat</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="col-12">
        <Paginate
          numItems={10}
          onPageChange={() => {
          }}
          currentPage={0}
                />
      </div>
    </div>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
