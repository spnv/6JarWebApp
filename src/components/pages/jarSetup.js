"use strict"
import React from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {findDOMNode} from 'react-dom';

import JarItem from './jarItem';

import {
  MenuItem,
  Table,
  InputGroup,
  DropdownButton,
  ButtonGroup,
  Button,
  Well,
  Grid,
  FormControl,
  FormGroup,
  ControlLabel,
  Row,
  Col,
  Modal
} from 'react-bootstrap';

import {activeMyJar, updateAJar, myJar} from '../../actions/jarAction';
import {getMemberSession} from '../../actions/memberAction';

class JarSetup extends React.Component {

  constructor() {
    super();
    this.state = {
      showModal: false,
      adjustJar: {}
    }
  }

  open(jar) {
    this.setState({showModal: true, adjustJar: jar})
  }
  close() {
    this.setState({showModal: false})
  }

  componentDidMount() {
    // this.props.getSelectedJar();
    // this.props.getNonSelectedJar();
    this.props.getMyJar(); //
    this.props.getMemberSession();
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

  handlerSelectJar(_id) {
    this.props.activeMyJar({_id: _id, selected: true})
  }

  handlerUnSelectJar(_id) {
    this.props.activeMyJar({_id: _id, selected: false})
  }

  handlerUpdateAJar() {
    let updatedJar = this.state.adjustJar;
    updatedJar.full = parseInt(findDOMNode(this.refs.updateFull).value);
    this.props.updateAJar(updatedJar);
    this.close();
  }

  render() {
    const selectedJars = this.props.selectedjar.map(function(jar, i) {
      return (
        <Col key={i} xs={6} sm={6} md={4} lg={2}>
          <JarItem code={jar.code} remain={jar.remain} full={jar.full}/>
          <br/>
          <ButtonGroup>
            <Button onClick={this.open.bind(this, jar)} bsStyle="warning">แก้ไข</Button>
            <Button onClick={this.handlerUnSelectJar.bind(this, jar._id)} bsStyle="danger">เก็บ</Button>
          </ButtonGroup>
        </Col>
      )
    }, this)

    const nonSelectedJars = this.props.nonselected.map(function(jar, i) {
      return (
        <Col key={i} xs={6} sm={6} md={4} lg={2}>
          <JarItem code={jar.code} remain={jar.remain} full={jar.full}/>
          <br/>
          <ButtonGroup>
            <Button onClick={this.open.bind(this, jar)} bsStyle="warning">แก้ไข</Button>
            <Button onClick={this.handlerSelectJar.bind(this, jar._id)} bsStyle="success">ใช้งาน</Button>
          </ButtonGroup>
        </Col>
      )
    }, this)

    return (
      <Grid>
        <h2>ใช้งาน</h2>
        <Row>
          {selectedJars}
        </Row>
        <hr/>
        <h2>เก็บ</h2>
        <Row>
          {nonSelectedJars}
        </Row>

        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header>
            <Modal.Title>
              <b>แก้ไข [{this.state.adjustJar.display}]</b>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Grid>
              <h4>ยอดเงิน</h4>
              <Col xs={12} sm={6} md={6} lg={6}>
                <FormGroup controlId="updateRemain">
                  <ControlLabel>คงเหลือ</ControlLabel>
                  <InputGroup>
                    <InputGroup.Addon>฿</InputGroup.Addon>
                    <FormControl ref="updateRemain" type="number" value={this.state.adjustJar.remain} disabled/>
                  </InputGroup>
                </FormGroup>
              </Col>
              <Col xs={12} sm={6} md={6} lg={6}>
                <FormGroup controlId="updateFull">
                  <ControlLabel>เต็ม</ControlLabel>
                  <InputGroup>
                    <InputGroup.Addon>฿</InputGroup.Addon>
                    <FormControl ref="updateFull" type="number" placeholder={this.state.adjustJar.full}/>
                  </InputGroup>
                </FormGroup>
              </Col>
            </Grid>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handlerUpdateAJar.bind(this)} bsStyle="success">บันทึก</Button >
            <Button onClick={this.close.bind(this)} bsStyle="danger">ปิด</Button >
          </Modal.Footer>
        </Modal>
      </Grid>
    )
  }
}

function mapStateToProps(state) {
  return {selectedjar: state.myJar.selected, nonselected: state.myJar.nonselected, member: state.member}
  // / * TODO : Template Active - map state to prop totalQty : state.cart.totalQty * /
}
function mapDispatchToProps(dispatch) {

  // / * TODO : Template Active - map dispatch to prop getCart : getCart * /
  return bindActionCreators({
    getMemberSession: getMemberSession,
    activeMyJar: activeMyJar,
    updateAJar: updateAJar,
    getMyJar: myJar
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(JarSetup);
