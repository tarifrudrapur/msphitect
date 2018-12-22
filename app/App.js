import { connect } from 'react-redux'
import React from 'react';
import './styles/main.scss';

class App extends React.Component {
  render() {
	  return (
	  	<div>React</div>
		);
  }
}

function mapStateToProps(state){
    return {}
}

export default connect(
  mapStateToProps
)(App);
