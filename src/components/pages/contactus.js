"use strict"
import React from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {findDOMNode} from 'react-dom';

import {
  MenuItem,
  Table,
  InputGroup,
  DropdownButton,
  ButtonGroup,
  Button,
  Well,
  Grid,
  Row,
  Col,
  Image,
  FormGroup,
  ControlLabel,
  FormControl,
  Modal
} from 'react-bootstrap';

import * as EmailValidator from 'email-validator';

import {sendMessage} from '../../actions/messageAction';
import {getMemberSession} from '../../actions/memberAction';

class ContactUs extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      send_btn_state: 'none',
      email:'',
      isFulFil:null
    }
  }

  open() {
    this.setState({showModal: true})
  }
  close() {
    this.setState({showModal: false})
  }

  handlerSendMessage() {

    let contex = this;

    /* Check form fulfill */
    if (findDOMNode(this.refs.message).value == null || findDOMNode(this.refs.message).value == '' || findDOMNode(this.refs.message).value == undefined ||
    findDOMNode(this.refs.type).value == null || findDOMNode(this.refs.type).value == '' || findDOMNode(this.refs.type).value == undefined ||
    findDOMNode(this.refs.name).value == null || findDOMNode(this.refs.name).value == '' || findDOMNode(this.refs.name).value == undefined ||
    findDOMNode(this.refs.email).value == null || findDOMNode(this.refs.email).value == '' || findDOMNode(this.refs.email).value == undefined ||
    contex.getEmailValidationState() != 'success') {
      contex.setState({isFulFil: false})
      return;
    }


    this.setState({send_btn_state: 'sending'});

    let name = findDOMNode(this.refs.name).value;
    let email = findDOMNode(this.refs.email).value;
    let type = findDOMNode(this.refs.type).value;
    let message = findDOMNode(this.refs.message).value;

    this.props.sendMessage(name, email, type, message, function() {
      findDOMNode(contex.refs.message).value = ''
      findDOMNode(contex.refs.name).value = ''
      contex.setState({email:''});
      contex.setState({isFulFil: null})
      contex.setState({send_btn_state: 'none'})
      contex.open();
    });

  }

  componentDidUpdate() {
    let myMemberMessage = this.props.member.mymember.message;
    if (myMemberMessage == 'no session' || myMemberMessage == null) {
      this.handlerRedirect('signin')
    }
  }

  handlerRedirect(path) {
    switch (path) {
      case 'signin':
        this.props.router.push('/signin');
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

  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }

  render() {
    return (
      <Grid>
        <h3>ติดต่อเรา</h3>
        <Row>
          <Col xs={12} sm={12} md={12} lg={6}>
            <p>ติดต่อเราเพื่อให้คำแนะนำเกี่ยวกับการพัฒนาเว็บไซต์นี้หรือหากคุณต้องการโฆษณากับเรา คุณสามารถใช้แบบฟอร์มด้านล่างเพื่อส่งข้อความหาเรา หรือส่งอีเมลล์มาที่ supanat.ve@gmail.com</p>
          </Col>
          <Col xs={12} sm={12} md={12} lg={6}>
            <p>101/86 ซอย 10 หมู่บ้านโชคประชา ซอย 5-7 ถนนเทิดราชัน แขวงสีกัน เขตดอนเมือง กรุงเทพฯ 10210<br/>
              โทร: +66 893054958</p>
          </Col>
        </Row>
        <hr/>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            {(this.state.isFulFil == false)
              ? (
                <p style={{
                  'color': 'red'
                }}>กรุณากรอกแบบฟอร์มให้ถูกต้อง และครบถ้วน</p>
              )
              : ('')}
            <form>
              <FormGroup bsSize="large">
                <InputGroup style={{
                  'width': '100%'
                }}>
                  <ControlLabel>ชื่อ</ControlLabel>
                  <FormControl type="text" ref="name"/>
                </InputGroup>
              </FormGroup>

              <FormGroup bsSize="large" validationState={this.getEmailValidationState()}>
                <InputGroup style={{
                  'width': '100%'
                }}>
                  <ControlLabel>อีเมล์</ControlLabel>
                  <FormControl onChange={this.handleEmailChange.bind(this)} value={this.state.email} type="email" ref="email"/>
                  <FormControl.Feedback/>
                </InputGroup>
              </FormGroup>

              <FormGroup bsSize="large" controlId="formControlsSelect">
                <ControlLabel>ติดต่อเรื่อง</ControlLabel>
                <FormControl componentClass="select" placeholder="..." ref="type">
                  <option value="แนะนำ">แนะนำเกี่ยวกับเว็บไซต์</option>
                  <option value="โฆษณา">ติดต่อพื้นที่โฆษณา</option>
                </FormControl>
              </FormGroup>

              <FormGroup bsSize="large" controlId="formControlsTextarea">
                <ControlLabel>ข้อความ</ControlLabel>
                <FormControl rows="4" componentClass="textarea" ref="message"/>
              </FormGroup>
              {(this.state.send_btn_state == 'none')
                ? (
                  <Button className="pull-left" onClick={this.handlerSendMessage.bind(this)} bsStyle="default">ส่ง</Button>
                )
                : (
                  <Button disabled className="pull-left" bsStyle="default">กำลังส่ง...</Button>
                )}
            </form>
          </Col>
        </Row>
        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header style={{
              'backgroundColor' : 'green'
            }}>
          </Modal.Header>
          <Modal.Body>
            ข้อความถูกส่งเรียบร้อย
          </Modal.Body>
        </Modal>
      </Grid>
    )
  }
}

function mapStateToProps(state) {
  return {member: state.member}
  // / * TODO : Template Active - map state to prop totalQty : state.cart.totalQty * /
}

function mapDispatchToProps(dispatch) {

  // / * TODO : Template Active - map dispatch to prop getCart : getCart * /
  return bindActionCreators({
    sendMessage: sendMessage
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);
