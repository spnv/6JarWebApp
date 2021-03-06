"use strict"
import React from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {findDOMNode} from 'react-dom';
import Clipboard from 'react-clipboard.js';

import {
  MenuItem,
  Table,
  InputGroup,
  DropdownButton,
  ButtonGroup,
  Button,
  Well,
  Grid,
  Row,
  Col,
  Image
} from 'react-bootstrap';

import {getMemberSession} from '../../actions/memberAction';

class SupportUs extends React.Component {

  componentDidUpdate() {
    let myMemberMessage = this.props.member.mymember.message;
    if (myMemberMessage == 'no session' || myMemberMessage == null) {
      this.handlerRedirect('signin')
    }
  }

  componentDidMount() {
    let contex = this;
    contex.props.getMemberSession();
  }

  handlerRedirect(path) {
    switch (path) {
      case 'signin':
        this.props.router.push('/signin');
        break;
      default:
    }
  }


  render() {
    return (
      <Grid>
        <h3>สนับสนุนเว็บไซต์</h3>
        <Row>
          <Col style={{
            'textAlign': 'center'
          }} xs={12} sm={12} md={12} lg={4}>
            <h4>BTC</h4>
            <Image src='/images/wallet/BTC-wallet.png'></Image>
            <p><br/>1GkX1ZmG732reSYjm9v1XhqaaC5MEkicFP</p>
            <Clipboard data-clipboard-text="1GkX1ZmG732reSYjm9v1XhqaaC5MEkicFP">
              copy to clipboard
            </Clipboard>
          </Col>
          <Col style={{
            'textAlign': 'center'
          }} xs={12} sm={12} md={12} lg={4}>
            <h4>ETH</h4>
            <Image src='/images/wallet/ETH-wallet.png'></Image>
            <p><br/>0x3507568Ab03e546aFc363b54a1db0Aa4EE5D2e87</p>
            <Clipboard data-clipboard-text="0x3507568Ab03e546aFc363b54a1db0Aa4EE5D2e87">
              copy to clipboard
            </Clipboard>
          </Col>
          <Col style={{
            'textAlign': 'center'
          }} xs={12} sm={12} md={12} lg={4}>
            <h4>Kasikorn</h4>
            <Image src='/images/wallet/KSK-wallet.png'></Image>
            <p><br/>009-3-79637-3</p>
            <Clipboard data-clipboard-text="009-3-79637-3">
              copy to clipboard
            </Clipboard>
          </Col>
        </Row>
      </Grid>
    )
  }
}

function mapStateToProps(state) {
  return {member: state.member}
  // / * TODO : Template Active - map state to prop totalQty : state.cart.totalQty * /
}

function mapDispatchToProps(dispatch) {

  // / * TODO : Template Active - map dispatch to prop getCart : getCart * /
  return bindActionCreators({
    getMemberSession: getMemberSession
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SupportUs);
