import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { getOrders } from '../../helpers/adminFetch';
import { isAuthenticated } from '../../helpers/authFetch';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { user, token } = isAuthenticated();

  useEffect(() => {
    getOrders(user._id, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        console.log(data);
        setOrders(data);
      }
    });
  }, []);

  const showInput = (key, value) => (
    <div className="input-group mb-2 mr-sm-2">
      <div className="input-group-prepend">
        <div className="input-group-text">{key}</div>
      </div>
      <input type="text" value={value} className="form-control" readOnly />
    </div>
  );

  return (
    <div>
      <h1 className="text-center mt-2">Total orders: {orders.length}</h1>
      {orders.map(o => {
        return (
          <div className="row m-2">
            <div className="col-6">
              <div className="" key={o._id}>
                <h4 className="mb-3 text-primary">
                  <span className="">Order ID: {o._id}</span>
                </h4>

                <ul className="list-group mb-2">
                  <li className="list-group-item text-danger">
                    <strong>{o.status}</strong>
                  </li>
                  <li className="list-group-item">
                    Transaction ID: {o.transaction_id}
                  </li>
                  <li className="list-group-item">Amount: ${o.amount}</li>
                  <li className="list-group-item">Ordered by: {o.user.name}</li>
                  <li className="list-group-item">
                    Ordered on: {moment(o.createdAt).fromNow()}
                  </li>
                  <li className="list-group-item">
                    Delivery address: {o.address}
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-6 m-auto">
              <h3 className="mt-4 mb-4 font-italic">
                Total products in the order: {o.products.length}
              </h3>
              {o.products.map(p => (
                <div key={p._id}>
                  {showInput('Name', p.name)}
                  {showInput('Price', `$${p.price}`)}
                  {showInput('Count', p.count)}
                  {showInput('ID', p._id)}
                </div>
              ))}
            </div>
            <hr style={{ borderBottom: '3px solid indigo', width: '50%' }} />
          </div>
        );
      })}
    </div>
  );
};

export default Orders;
