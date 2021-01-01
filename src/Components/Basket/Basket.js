import React from 'react';
import './Basket.css';

export default class Basket extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            basketWidth: 0,
            quantity: 1,
            price: 0,
            limit: 0,
            orderAt: 'MARKET'
        };
    }

    componentDidMount() {
        this.handleBasketWidth();
        window.addEventListener('resize', this.handleBasketWidth);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleBasketWidth);
    }

    handleBasketWidth = () => {
        const containerWidth = document.querySelector('.container').clientWidth;
        this.setState({
            basketWidth: containerWidth
        });
    }

    handleInput = (event, type) => {
        this.setState({[type]: event.target.value});
    }

    render() {
        return (
            <div className="basket-container" style={{width: 'calc(100vw - (100vw - '
                + this.state.basketWidth + 'px'
                + '))'}}>
                <div className="basket-heading">
                    <h5 style={{marginBottom: 0}}>{this.props.basketType} Stocks</h5>
                    <span className="qty-span">x {this.state.quantity || 0}</span>
                    <span className="cost-span">₹{this.props.perUnitCost}</span>
                </div>
                <div className="basket-fields">
                    <div className="row" style={{margin: '20px'}}>
                        <div className="col-6">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1">Quantity</span>
                                </div>
                                <input
                                    value={this.state.quantity}
                                    onChange={(event) => this.handleInput(event, 'quantity')}
                                    type="number" className="form-control" placeholder="Enter Quantity" aria-label="quantity" aria-describedby="basic-addon1" />
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1">Price</span>
                                </div>
                                <input
                                    disabled={this.state.orderAt === 'MARKET' ? true : false}
                                    value={this.state.price}
                                    onChange={(event) => this.handleInput(event, 'price')}
                                    type="number" className="form-control" placeholder="Enter the Price" aria-label="price" aria-describedby="basic-addon1" />
                            </div>
                        </div>
                    </div>
                    <div className="row" style={{margin: '20px'}}>
                        <div className="col-12 radio-select">
                            <div className="form-check">
                                <input 
                                    className="form-check-input" 
                                    type="radio" 
                                    name="order_at" 
                                    id="market"
                                    defaultChecked={this.state.orderAt === 'MARKET' ? true : false}
                                    onChange={(event) => this.handleInput(event, 'orderAt')}
                                    value="MARKET" />
                                <label className="form-check-label" htmlFor="market">
                                    Market
                                </label>
                            </div>
                            <div className="form-check">
                                <input 
                                    className="form-check-input"
                                    type="radio" 
                                    name="order_at" 
                                    id="limit" 
                                    defaultChecked={this.state.orderAt === 'LIMIT' ? true : false}
                                    onChange={(event) => this.handleInput(event, 'orderAt')}
                                    value="LIMIT" />
                                <label className="form-check-label" htmlFor="limit">
                                    Limit
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="basket-controller">
                    <div className="basket-controller-buttons">
                        <span className="margin-span">
                            Margin required ₹{this.state.quantity * this.props.perUnitCost}
                        </span>
                        <button
                            onClick={() => this.props.placeOrder(this.state)}
                            style={{backgroundColor: (this.props.basketType === 'Sell' ? 'red' : 'blue')}}
                            className="controller-button place-order">
                            {
                                this.props.basketType
                            }
                        </button>
                        <button
                            onClick={() => this.props.basketSheetHandler(false)}
                            className="controller-button cancel-order">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}