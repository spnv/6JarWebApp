"use strict"
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Nav, NavItem, Navbar, Badge} from 'react-bootstrap';

import {getMemberSession, destroyMemberSession} from '../actions/memberAction';

class AppMenu extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getMemberSession();
  }

  handlerSignOut() {
    this.props.signOut();
  }

  render() {
    return (
      <Navbar inverse fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">บัญชี</a>
          </Navbar.Brand>
          <Navbar.Toggle/>
        </Navbar.Header>
        <Navbar.Collapse>

          {(this.props.member.mymember.message == 'session success' || this.props.member.mymember.message == 'signin success')
            ? (
              <Nav>
                <NavItem eventKey={1} href="/today">รายการวันนี้</NavItem>
                <NavItem eventKey={2} href="/summary">สรุปการใช้จ่าย</NavItem>
                <NavItem eventKey={3} href="/jar-setup">ตั้งค่า</NavItem>
              </Nav>
            )
            : (
              <Nav></Nav>
            )}

          <Nav pullRight>
            {(this.props.member.mymember.message == 'session success' || this.props.member.mymember.message == 'signin success')
              ? (
                <NavItem eventKey={10} onClick={this.handlerSignOut.bind(this)}>ออกจากระบบ</NavItem>
              )
              : (
                <NavItem eventKey={11} href="/signin">เข้าใช้ระบบ</NavItem>
              )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

function mapStateToProps(state) {
  return {member: state.member}
  // / * TODO : Template Active - map state to prop totalQty : state.cart.totalQty * /
}
function mapDispatchToProps(dispatch) {

  // / * TODO : Template Active - map dispatch to prop getCart : getCart * /
  return bindActionCreators({
    getMemberSession: getMemberSession,
    signOut: destroyMemberSession
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(AppMenu);
