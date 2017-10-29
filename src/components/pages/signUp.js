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
  Button,
  HelpBlock
} from 'react-bootstrap';

import * as EmailValidator from 'email-validator';

import {createMember, getMemberSession} from '../../actions/memberAction';

class SignUp extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isCreating: false,
      email: '',
      password: '',
      confirm_password: '',
      isFulFil: null
    }
  }

  componentDidMount() {
    this.props.getMemberSession();
  }

  componentDidUpdate() {
    let myMemberMessage = this.props.member.mymember.message;
    if (myMemberMessage == 'create success') {
      this.handlerRedirect('jar-setup')
    }
  }

  handleSubmit() {
    let contex = this;

    /* Check form fulfill */
    if (findDOMNode(this.refs.rePassword).value == null || findDOMNode(this.refs.rePassword).value == '' || findDOMNode(this.refs.rePassword).value == undefined || findDOMNode(this.refs.password).value == null || findDOMNode(this.refs.password).value == '' || findDOMNode(this.refs.password).value == undefined || findDOMNode(this.refs.name).value == null || findDOMNode(this.refs.name).value == '' || findDOMNode(this.refs.name).value == undefined || findDOMNode(this.refs.email).value == null || findDOMNode(this.refs.email).value == '' || findDOMNode(this.refs.email).value == undefined ||
    (contex.getEmailValidationState() != 'success' || contex.getPasswordValidationState() != 'success') ) {
      contex.setState({isFulFil: false})
      return;
    }

    contex.setState({isCreating: true})
    if (findDOMNode(this.refs.password).value != findDOMNode(this.refs.rePassword).value) {
      contex.setState({isCreating: false})
      return;
    }
    const newMember = {
      email: findDOMNode(this.refs.email).value,
      password: findDOMNode(this.refs.password).value,
      name: findDOMNode(this.refs.name).value
    };
    this.props.createMember(newMember.email, newMember.password, newMember.name, function() {
      contex.setState({isFulFil: null})
      contex.setState({isCreating: false})
    })
  }

  handlerRedirect(path) {
    switch (path) {
      case 'signin':
        this.props.router.push('/signin');
        break;
      case 'jar-setup':
        this.props.router.push('/jar-setup');
        break;
      default:
    }
  }

  getEmailValidationState() {
    if (this.state.email.length > 0) {
      if (EmailValidator.validate(this.state.email) == true)
        return 'success'
      else
        return 'error'
    } else
      return null
  }

  getPasswordValidationState() {
    if (this.state.confirm_password.length > 0) {
      if (this.state.confirm_password == this.state.password)
        return 'success'
      else
        return 'error'
    } else
      return null
  }

  handleChange(e) {
    this.setState({email: e.target.value});
  }

  handleChangePass(e) {
    this.setState({password: e.target.value});
  }

  handleChangeConPass(e) {
    this.setState({confirm_password: e.target.value});
  }

  render() {
    return (

      <Grid>
        <Row>
          <Col lgOffset={3} lg={6}>
            <h4>
              <b>การเข้าใช้ระบบ</b>
            </h4>
            {(this.state.isFulFil == false)
              ? (
                <p style={{
                  'color': 'red'
                }}>กรุณากรอกแบบฟอร์มให้ถูกต้อง และครบถ้วน</p>
              )
              : ('')}
            <br></br>
            <FormGroup controlId="email" validationState={this.getEmailValidationState()}>
              <ControlLabel>อีเมล์</ControlLabel>
              <FormControl onChange={this.handleChange.bind(this)} value={this.state.email} type="email" placeholder="กรอกอีเมล์" ref="email"/>
              <FormControl.Feedback/>{(this.props.member.mymember.message == 'email already exist')
                ? (
                  <p style={{
                    'color': 'red'
                  }}>อีเมล์นี้ถูกใช้งานแล้ว</p>
                )
                : ('')}
            </FormGroup>
            <FormGroup controlId="password" validationState={null}>
              <ControlLabel>รหัสผ่าน</ControlLabel>
              <FormControl onChange={this.handleChangePass.bind(this)} value={this.state.password} type="password" placeholder="กรอกรหัสผ่าน" ref="password"/>
              <FormControl.Feedback/>
            </FormGroup>
            <FormGroup controlId="re-password" validationState={this.getPasswordValidationState()}>
              <ControlLabel>ยืนยันรหัสผ่าน</ControlLabel>
              <FormControl onChange={this.handleChangeConPass.bind(this)} value={this.state.confirm_password} type="password" placeholder="กรอกยืนยันรหัสผ่าน" ref="rePassword"/>
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
            <br/>
            <Button disabled={(this.state.isCreating)} onClick={this.handleSubmit.bind(this)} className="pull-right" bsStyle="primary">
              {(this.state.isCreating)
                ? ('กำลังสร้างบัญชี...')
                : ('สร้างบัญชี')}
            </Button>
            <Button onClick={this.handlerRedirect.bind(this, 'signin')} className="pull-right" bsStyle="warning">ย้อนกลับ</Button>
          </Col>
        </Row>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {member: state.member}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createMember: createMember,
    getMemberSession: getMemberSession
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
