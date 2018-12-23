import { connect } from 'react-redux'
import React from 'react';
import './styles/main.scss';
import * as actions from './actions' 
import _ from 'lodash';


const getPrice = (weight)=> {
	if(weight <= 200) {
		return 5;
	} else if(weight > 200 && weight <= 500) {
		return 10;
	} else if(weight > 500 && weight <=1000) {
		return 15;
	} else if(weight >1000 && weight <= 5000) {
		return 20;
	}
}


const renderChild = (item)=> item.map((data, index)=> <p key={index} className="list-group-item-text">Name: <b>{data.name}</b> -- Price: <b>${data.price}</b> -- Weight: <b>{data.weight}</b></p> )

const renderProductCard = (item, index, handleCart, isAdded) => {
	return(
	  <div key={index} className="col-sm-6 col-md-4">
			<div className="thumbnail" >
				<img src={`http://placehold.it/450x250&text=${item.name}`} className="img-responsive" />
				<div className="caption" style={{textAlign: 'center'}}>
					<div className="row">
						<div className="col-md-6 col-xs-6">
							<h4>{item.weight}GM</h4>
						</div>
						<div className="col-md-6 col-xs-6 price">
							<h4>
							<label>${item.price}</label></h4>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
							{ isAdded ? 
								<button  style={{width: '100%'}} disabled className="btn btn-info btn-product"><span className="glyphicon glyphicon-ok"></span> Added </button> :
								<button onClick={()=> handleCart(item)}  style={{width: '100%'}} className="btn btn-success btn-product"><span className="glyphicon glyphicon-plus"></span> Add to cart</button> 
							}
							
						</div>
					</div>

					<p> </p>
				</div>
			</div>
		</div>
	)
}

class App extends React.Component {
	state = {
		isPlaced: false
	}

	componentDidMount() {
    this.props.dispatch(actions.getProducts())
  }

  handleCart = (data)=> {
  	let newData = [...this.props.cartData];
  	newData.push(data);
  	this.props.dispatch(actions.addCart(newData))
  }

  handleDelete = (itemname) => {
  	let newData = [...this.props.cartData];
  	_.remove(newData, function(n) {
		  return n.name == itemname;
		});
		this.props.dispatch(actions.addCart(newData))
  }
  
  isAdded = (itemname)=> {
  	return _.find(this.props.cartData, { 'name': itemname});
  }

  handlePlaceOrder = ()=> {
  	if(this.props.cartData.length > 0 ){
  		this.setState({isPlaced: true})
  	} else {
  		alert("No item in cart")
  	}
  }

  render() {
  	const { products, cartData } = this.props;
  	let result = []
  	if(this.state.isPlaced) {
  		var sum = 0;
  		var arr = [0];
  		var cart = _.sortBy(cartData, [(o)=> { return o.price; }]);
  		var totalPrice = _.sumBy(cart, (o)=> { return o.price; });
  		if(totalPrice <= 250) {
  			result.push({index: 0, data: cart})
  		} else {
  			for(var i =0; i<cart.length;i++) {
  				sum = cart[i].price + sum;
  				if((sum + (cart[i+1] && cart[i+1].price)) >= 250) {
  					var temp = [...cart]
  					result.push({index: i-1, data: temp.splice(arr.length, i)})
  					sum = 0;
  				} else {
  					if(cart.length == i+1) {
							sum = sum + cart[i].price;
							var temp = [...cart]
							result.push({index: i-1, data: temp.splice(arr.length, i)})
  					}
  				}
  			}
  		}

  		for(var j=result.length;j>0;j--) {
  			if(result[j] && result[j].data && result[j-1] && result[j-1].data) {
  				result[j].data = result[j].data.filter(val => !result[j-1].data.includes(val));
  				
  			}
  		}
  	}

  	console.log(result)
	  return (
	  	<div style={{padding: 20}} className="container">
		  { !this.state.isPlaced ?
		  	<div className="row">
		    	<div className="col-md-8">

						{products && products.map((data, index)=> {
			  			return(
			  				renderProductCard(data, index, this.handleCart, this.isAdded(data.name))
			  			)
			  		})}
			            
			    </div> 
			    <div className="col-md-4">
						<div className="thumbnail" style={{width: 350}} data-spy="affix" data-offset-top="205">
							<h4 className="text-center"><span className="label label-info">Shopping Cart</span></h4>
							<div className="caption" style={{textAlign: 'center'}}>
								<div className="row" style={{maxHeight: 300 ,overflowX: 'hidden', overflowY: 'scroll'}}>
									<ul className="list-group" style={{padding: 1, textAlign: 'left'}}>
									  { cartData && cartData.map((data, index)=> {
										return(
									  	<li key={index} style={{borderRadius: 0}} className="list-group-item">{`${data.name} (${data.weight}GM)`}<span style={{float: 'right', cursor: 'pointer'}} onClick={()=> this.handleDelete(data.name)} className="glyphicon glyphicon-trash"></span><span className="badge">${data.price}</span></li>
											)
										})}
									</ul>
								</div>
								<div className="row">
									<div className="col-md-12">
										{cartData.length > 0 ? <a onClick={this.handlePlaceOrder} style={{width: '100%'}} className="btn btn-warning btn-product"><span className="glyphicon glyphicon-shopping-cart"></span> Place order</a>  : 'Cart is empty'}
									</div>
								</div>

								<p> </p>
							</div>
						</div>
			    </div> 
				</div> :
		  	<div className="row">
		    	<div className="col-md-12">

		    		<div className="list-group">
					    <a style={{textAlign: 'center'}} className="list-group-item active">
					      <h4>Order can be shipped in multiple courier partners if price more then $250</h4>
					      <p className="list-group-item-text">Order Details</p>
					    </a>
					    {result && result.map((data, index)=> {
					    	const totalWeight = _.sumBy(data.data, 'weight')
					    	const totalPrice = _.sumBy(data.data, 'price')
					    	return(
							    <a key={index} className="list-group-item">
							      <h4 className="list-group-item-heading">Package #{index+1} - ({data.data.length} {data.data.length > 1 ? 'Items' : 'Item'})</h4>
							      {renderChild(data.data)}
							      <br />Total: <b>${totalPrice}</b> -- Total Weight: <b>{totalWeight} gm</b> -- Courier Charges: ${getPrice(totalWeight)}
							    </a>
					    	)
					    })}
					  </div>


		    	</div>
		    </div>
		  }
			</div>
		);
  }
}

function mapStateToProps(state){
    return {
    	products: state.cart.products,
    	cartData: state.cart.cartData
    }
}

export default connect(
  mapStateToProps
)(App);
