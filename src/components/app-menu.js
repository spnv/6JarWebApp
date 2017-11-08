"use strict"
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Nav, NavItem, Navbar, Badge} from 'react-bootstrap';

import {getMemberSession, destroyMemberSession} from '../actions/memberAction';
import Footer from './footer';

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

  handlerRedirect(path) {
    switch (path) {
      case '/':
        this.props.router.push('/');
        break;
      case 'today':
        this.props.router.push('/today');
        break;
      case 'asset':
        this.props.router.push('/asset');
        break;
      case 'jar-setup':
        this.props.router.push('/jar-setup');
        break;
      case 'support-us':
        this.props.router.push('/support-us');
        break;
      case 'contact-us':
        this.props.router.push('/contact-us');
        break;
      case 'signin':
          this.props.router.push('/signin');
          break;
      case 'article':
            this.props.router.push('/article');
          break;
      default:
    }
  }

  render() {
    return (
      <div>
        <Navbar inverse fixedTop>
          <Navbar.Header>
            <Navbar.Brand onClick={this.handlerRedirect.bind(this, '/')}>
              บัญชี
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>
          <Navbar.Collapse>

            {(this.props.member.mymember.message == 'session success' || this.props.member.mymember.message == 'signin success')
              ? (
                <Nav>
                  <NavItem eventKey={1} onClick={this.handlerRedirect.bind(this, 'today')}>รายการวันนี้</NavItem>
                  <NavItem eventKey={2}>สรุปการใช้จ่าย (กำลังพัฒนา)</NavItem>
                  <NavItem eventKey={3} onClick={this.handlerRedirect.bind(this, 'asset')}>ทรัพย์สิน</NavItem>
                  <NavItem eventKey={4} onClick={this.handlerRedirect.bind(this, 'jar-setup')}>จัดการ</NavItem>
                </Nav>
              )
              : (
                <Nav>
                </Nav>
              )}

            {(this.props.member.mymember.message == 'session success' || this.props.member.mymember.message == 'signin success')
              ? (
                <Nav pullRight>
                  <NavItem eventKey={12} onClick={this.handlerRedirect.bind(this, 'support-us')}>สนับสนุน</NavItem>
                  <NavItem eventKey={10} onClick={this.handlerRedirect.bind(this, 'contact-us')}>ติดต่อเรา</NavItem>
                  <NavItem eventKey={11} onClick={this.handlerSignOut.bind(this)}>ออกจากระบบ</NavItem>
                </Nav>
              )
              : (
                <Nav pullRight>
                  <NavItem eventKey={13} onClick={this.handlerRedirect.bind(this, 'signin')}>เข้าใช้ระบบ</NavItem>
                </Nav>
              )}
          </Navbar.Collapse>
        </Navbar>
        {this.props.children}
        <Footer/>
      </div>
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
