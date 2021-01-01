import React from 'react';
import './Dashboard.css';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stocks: 1000,
            limitPrice: 0 ,
            user : 0
        }
    }

    stockHandler = (quantity, type) => {
        let currentStock = parseInt(this.state.stocks);
        switch(type) {
            case 'Buy':
                currentStock -= parseInt(quantity);
                break;
            case 'Sell':
                currentStock += parseInt(quantity);
                break;
            default:
                alert('Some error occured!');
                break;
        }

        this.setState({stocks: currentStock});
    }

    handleChange = (event)=> {
        if (event.target.value > this.state.stocks) {
            return;
        }
        this.setState({
            user: event.target.value
        });
    }

    changeStocks = () => {
        this.setState({
            stocks : this.state.stocks - this.state.user
        });
    }

    limitPrice = (event) =>{
        this.setState({
            limitPrice: event.target.value
        });
    }

    render() {
        return (
            <React.Fragment>
                <div className="order-area">
                    <div className="stock-box">
                        <h6 className="stock-head">Available Stocks</h6>
                        <h2 className="stock-val">{this.state.stocks}</h2>
                    </div>
                    <div className="basket">
                        <button
                            onClick={() => this.props.basketSheetHandler(true, 'Buy')}
                            className="order-buttons buy">Buy</button>
                        <button
                            onClick={() => this.props.basketSheetHandler(true, 'Sell')}
                            className="order-buttons sell">Sell</button>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}