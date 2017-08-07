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

import {getMemberSession, signIn, destroyMemberSession} from '../../actions/memberAction';

class AccessApp extends React.Component {
  componentDidMount() {
    this.props.getMemberSession();
  }

  componentDidUpdate() {
    let myMemberMessage = this.props.member.mymember.message;
    if (myMemberMessage == 'session success') {
      this.handlerRedirect('today')
    }
  }

  handleSubmit() {
    const member = {
      email: findDOMNode(this.refs.email).value,
      password: findDOMNode(this.refs.password).value
    };
    this.props.signIn(member.email, member.password);
  }

  handlerRedirect(path) {
    switch (path) {
      case 'signup':
        this.props.router.push('/signup');
        break;
      case 'today':
        this.props.router.push('/today');
        break;
      default:
    }
  }

  render() {
    return (
      <Col lgOffset={3} lg={6}>
        <h4>
          <b>เข้าใช้ระบบ</b>
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
        <br></br>
        <Button onClick={this.handleSubmit.bind(this)} className="pull-right" bsStyle="success">เข้าสู่ระบบ</Button>
        <Button onClick={this.handlerRedirect.bind(this, 'signup')} className="pull-right" bsStyle="primary">สร้างบัญชี</Button>
        <br></br>
      </Col>
    );
  }
}

function mapStateToProps(state) {
  return {member: state.member}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getMemberSession: getMemberSession,
    signIn: signIn,
    destroyMemberSession: destroyMemberSession
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AccessApp);
