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

class AccessApp extends React.Component {
  componentDidMount() {
    // TODO : get session
  }

  handleSubmit() {
    const newMember = {
      email: findDOMNode(this.refs.email).value,
      password: findDOMNode(this.refs.password).value,
      nickname: findDOMNode(this.refs.nickname).value
    };

    // TODO : add action
  }

  handleBack(){
    this.props.router.push('/signin');
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
        <FormGroup controlId="nickname">
          <ControlLabel>ชื่อเล่น</ControlLabel>
          <FormControl type="text" placeholder="กรอกชื่อเล่น" ref="nickname"/>
          <FormControl.Feedback/>
        </FormGroup>
        <br></br>
        <Button onClick={this.handleSubmit.bind(this)} className="pull-right" bsStyle="primary">สร้างบัญชี</Button>
        <Button onClick={this.handleBack.bind(this)} className="pull-right" bsStyle="warning">ย้อนกลับ</Button>
      </Col>
    );
  }
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch)
}

export default connect(null, null)(AccessApp);
