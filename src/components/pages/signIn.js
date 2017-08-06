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
    const member = {
      email: findDOMNode(this.refs.email).value,
      password: findDOMNode(this.refs.password).value
    };

    // TODO : add action
  }

  handleCreateAccount(){
    this.props.router.push('/signup');
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
            <Button onClick={this.handleCreateAccount.bind(this)} className="pull-right" bsStyle="primary">สร้างบัญชี</Button>
            <br></br>
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
