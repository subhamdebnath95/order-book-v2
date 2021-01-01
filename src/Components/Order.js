import React , {Component} from 'react';
import './Order.css';

import Navbar from './Navbar/Navbar';
import Dashboard from './Dashboard/Dashboard';
import OrderList from './OrderList/OrderList';
import Basket from './Basket/Basket';

export default class Order extends Component{
    constructor(props){
        super(props)
        this.state = {
            orderList: [],
            showBasket: false,
            basketType: '',
            perUnitCost: 16.27
        };
    }

    basketSheetHandler = (boolVal, type) => {
        this.setState({showBasket: boolVal, basketType: type});
    }

    placeOrder = (orderData) => {
        if (orderData.orderAt === 'LIMIT' && !orderData.price) {
            alert('Please enter the price!');
            return;
        }

        if (parseInt(this.dashboardComponent.state.stocks) < parseInt(orderData.quantity) && this.state.basketType === 'Sell') {
            alert('Sorry! No stocks available to sell.');
            return;
        }

        if (parseInt(this.dashboardComponent.state.stocks) < parseInt(orderData.quantity) && this.state.basketType === 'Buy') {
            alert('Sorry! Stock exceeded.');
            return;
        }

        let order = {
            orderType: this.state.basketType,
            orderAt: orderData.orderAt,
            quantity: orderData.quantity,
            price: orderData.price.length ? orderData.price : this.state.perUnitCost,
            createdAt: new Date().toLocaleDateString()
        };

        let newOrderList = this.state.orderList;
        newOrderList.push(order);

        this.setState({orderList: newOrderList, showBasket: false, basketType: order.orderType}, () => {
            this.dashboardComponent.stockHandler(order.quantity, order.orderType);
        });
    }

    render(){
        return(
            <div className="container">
                <Navbar />
                <Dashboard
                    ref={ref => this.dashboardComponent = ref}    
                    basketSheetHandler={this.basketSheetHandler}
                />
                <OrderList orderList={this.state.orderList} />
                {
                    this.state.showBasket && <Basket 
                        placeOrder={this.placeOrder}
                        perUnitCost={this.state.perUnitCost}
                        basketSheetHandler={this.basketSheetHandler}
                        basketType={this.state.basketType} 
                    />
                }
            </div>   
        );
    }
}