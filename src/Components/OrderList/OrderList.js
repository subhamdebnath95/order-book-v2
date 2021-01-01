import React from 'react';
import './OrderList.css';

export default class OrderList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="order-list">
                <h5>Order History</h5>
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Order Type</th>
                        <th scope="col">Order At</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price</th>
                        <th scope="col">Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.orderList.map((orderData, index) => {
                                return (
                                    <tr key={index + 1}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{orderData.orderType}</td>
                                        <td>{orderData.orderAt}</td>
                                        <td>{orderData.quantity}</td>
                                        <td>₹{orderData.price}</td>
                                        <td>{orderData.createdAt}</td>
                                    </tr>
                                );
                            })
                        }
                        
                    </tbody>
                </table>
            </div>
        );
    }
}