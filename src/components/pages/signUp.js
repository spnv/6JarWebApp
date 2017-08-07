"use strict"
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {findDOMNode} from 'react-dom';
import {
  Col,
  Row,
  Grid,
  FormControl,
  FormGroup,
  ControlLabel,
  Button
} from 'react-bootstrap';

import {createMember, getMemberSession, signIn, destroyMemberSession} from '../../actions/memberAction';

class AccessApp extends React.Component {
  componentDidMount() {
    this.props.getMemberSession();
  }

  componentDidUpdate() {
    let signUpMessage = this.props.member.mymember.message;
    if (signUpMessage == 'create success') {
      this.handlerRedirect('signin')
    }
  }

  handleSubmit() {
    const newMember = {
      email: findDOMNode(this.refs.email).value,
      password: findDOMNode(this.refs.password).value,
      name: findDOMNode(this.refs.name).value
    };
    this.props.createMember(newMember.email, newMember.password, newMember.name);
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
      <Col lgOffset={3} lg={6}>
        <h4>
          <b>การเข้าใช้ระบบ</b>
        </h4>
        <br></br>
        <FormGroup controlId="email" validationState={null}>
          <ControlLabel>อีเมล์</ControlLabel>
          <FormControl type="text" placeholder="กรอกอีเมล์" ref="email"/>
          <FormControl.Feedback/>
        </FormGroup>
        <FormGroup controlId="password" validationState={null}>
          <ControlLabel>รหัสผ่าน</ControlLabel>
          <FormControl type="password" placeholder="กรอกรหัสผ่าน" ref="password"/>
          <FormControl.Feedback/>
        </FormGroup>
        <FormGroup controlId="re-password" validationState={null}>
          <ControlLabel>ยืนยันรหัสผ่าน</ControlLabel>
          <FormControl type="password" placeholder="กรอกยืนยันรหัสผ่าน" ref="rePassword"/>
          <FormControl.Feedback/>
        </FormGroup>
        <br></br>
        <h4>
          <b>ข้อมูลผู้ใช้</b>
        </h4>
        <br></br>
        <FormGroup controlId="name">
          <ControlLabel>ชื่อเล่น</ControlLabel>
          <FormControl type="text" placeholder="กรอกชื่อเล่น" ref="name"/>
          <FormControl.Feedback/>
        </FormGroup>
        <br></br>
        <Button onClick={this.handleSubmit.bind(this)} className="pull-right" bsStyle="primary">สร้างบัญชี</Button>
        <Button onClick={this.handlerRedirect.bind(this,'signin')} className="pull-right" bsStyle="warning">ย้อนกลับ</Button>
      </Col>
    );
  }
}

function mapStateToProps(state) {
  return {member: state.member}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createMember: createMember,
    getMemberSession: getMemberSession,
    signIn: signIn,
    destroyMemberSession: destroyMemberSession
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AccessApp);
