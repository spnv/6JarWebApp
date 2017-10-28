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
import {getTodayTransaction} from '../../actions/transactionAction';
import {myJar} from '../../actions/jarAction';
import {selectedJar} from '../../actions/jarAction';

class SignIn extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isSigningIn: false,
      correction: null
    }
  }

  componentDidMount() {
    this.props.getMemberSession();
  }

  componentDidUpdate() {
    let myMemberMessage = this.props.member.mymember.message;
    if (myMemberMessage == 'session success' || myMemberMessage == 'signin success') {
      this.handlerRedirect('today')
      // this.props.getSelectedJar();
      // this.props.getTodayTransaction();
      // this.props.getMyJar();
    }
  }

  handleSubmit() {
    let contex = this;
    contex.setState({isSigningIn: true})
    const member = {
      email: findDOMNode(this.refs.email).value,
      password: findDOMNode(this.refs.password).value
    };
    this.props.signIn(member.email, member.password, function() {
      contex.setState({isSigningIn: false})
      let myMemberMessage = contex.props.member.mymember.message;
      if (myMemberMessage != 'session success' && myMemberMessage != 'signin success') {
        contex.setState({correction: false})
        // this.props.getSelectedJar();
        // this.props.getTodayTransaction();
        // this.props.getMyJar();
      }
    });
  }

  handlerRedirect(path) {
    switch (path) {
      case 'signup':
        this.props.router.push('/signup');
        break;
      case 'today':
        this.props.router.push('/today');
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
              <b>เข้าใช้ระบบ</b>
            </h4>
            {(this.state.correction == false)
              ? (
                <p style={{
                  'color': 'red'
                }}>username or password is incorrect</p>
              )
              : ('')}
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
            <br/>
            <Button disabled={(this.state.isSigningIn)} onClick={this.handleSubmit.bind(this)} className="pull-right" bsStyle="success">
              {(this.state.isSigningIn)
                ? ('กำลังเข้าสู่ระบบ...')
                : ('เข้าสู่ระบบ')}
            </Button>
            <Button onClick={this.handlerRedirect.bind(this, 'signup')} className="pull-right" bsStyle="primary">สร้างบัญชี</Button>
            <br></br>
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
    getMemberSession: getMemberSession,
    signIn: signIn,
    destroyMemberSession: destroyMemberSession
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
