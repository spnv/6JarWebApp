"use strict"
import React from 'react';
/* TODO : Template Active - import header footer */
// import Menu from './components/menu';
// import Footer from './components/footer';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

/* TODO : Template Active - update component */
class Main extends React.Component {
  componentDidMount() {
    /* TODO : Template Active - get early bird data */
    // this.props.getCart();
  }
  render() {
    return (
      <div>
        /* TODO : Template Active import tag
        <Menu cartItemsNumber={this.props.totalQty}/> {this.props.children}
        <Footer/>
        */
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {/*
    TODO : Template Active - map state to prop
    totalQty: state.cart.totalQty
    */
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    /*
    TODO : Template Active - map dispatch to prop
    getCart: getCart
    */
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);
