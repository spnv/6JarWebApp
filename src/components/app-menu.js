"use strict"
import React from 'react';
import {Nav, NavItem, Navbar, Badge} from 'react-bootstrap';
class AppMenu extends React.Component {
  render() {
    return (
      <Navbar  inverse fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">Bunche</a>
          </Navbar.Brand>
          <Navbar.Toggle/>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="/today">รายการวันนี้</NavItem>
            <NavItem eventKey={2} href="/summary">สรุปการใช้จ่าย</NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="/signin">เข้าใช้ระบบ</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
export default AppMenu;
