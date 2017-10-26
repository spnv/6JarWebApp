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

import {createMember, getMemberSession} from '../../actions/memberAction';

class SignUp extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isCreating: false
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

  render() {
    return (

      <Grid>
        <Row>
          <Col lgOffset={3} lg={6}>
            <h4>
              <b>การเข้าใช้ระบบ</b>
            </h4>
            <br></br>
            <FormGroup controlId="email" validationState={null}>
              <ControlLabel>อีเมล์</ControlLabel>
              <FormControl type="text" placeholder="กรอกอีเมล์" ref="email"/>
              <FormControl.Feedback/> {(this.props.member.mymember.message == 'email already exist')
                ? (
                  <p>*email already exist</p>
                )
                : ('')}
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
            <br/>
            <Button disabled={(this.state.isCreating)} onClick={this.handleSubmit.bind(this)} className="pull-right" bsStyle="primary">
              {(this.state.isCreating)
                ? ('กำลังสร้างบัญชี...')
                : ('สร้างบัญชี')}
            </Button>
            <Button onClick={this.handlerRedirect.bind(this,'signin')} className="pull-right" bsStyle="warning">ย้อนกลับ</Button>
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
