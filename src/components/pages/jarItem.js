"use strict"
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {Image} from 'react-bootstrap';

var NumberFormat = require('react-number-format');

class JarItem extends React.Component {
  // calculate
  selectImage(remain, full, code) {
    var imgPath = '/images/' + code;
    let percent = remain / full * 100;
    if (percent <= 0) {
      imgPath = imgPath + '_0.jpg';
    } else if (percent < 31) {
      imgPath = imgPath + '_30.jpg';
    } else if (percent < 61) {
      imgPath = imgPath + '_60.jpg';
    } else if (percent < 101) {
      imgPath = imgPath + '_100.jpg';
    } else if (percent < 120) {
      imgPath = imgPath + '_120.jpg';
    } else {
      imgPath = imgPath + '_200.jpg';
    }
    return imgPath;
  }

  moneyStyle(remain, full) {
    var color = null;
    let percent = remain / full * 100;
    if (percent <= 0) {
      color = {
        color: 'red',
        fontSize: 'large'
      };
    } else if (percent < 31) {
      color = {
        color: 'yellow',
        fontSize: 'large'
      };
    } else if (percent < 61) {
      color = {
        color: 'black',
        fontSize: 'large'
      };
    } else if (percent < 101) {
      color = {
        color: 'black',
        fontSize: 'large'
      };
    } else if (percent < 120) {
      color = {
        color: 'green',
        fontSize: 'large'
      };
    } else {
      color = {
        color: 'green',
        fontSize: 'large'
      };
    }
    return color;
  }

  render() {
    return (
      <div className='text-center'>
        <Image src={this.selectImage(this.props.remain, this.props.full, this.props.code)} responsive/>
        <b style={this.moneyStyle(this.props.remain, this.props.full)}>
          <NumberFormat thousandSeparator={true} prefix={'฿ '} value={this.props.remain} displayType={'text'}/>
        </b>
      </div>
    )
  }
}

function StateToProps(state) {
  return {}
}
function DispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch)
}
export default connect(StateToProps, DispatchToProps)(JarItem);
