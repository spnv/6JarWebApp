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
import {createMoneyFlow, getMoneyFlow} from '../../actions/moneyFlowAction';

var NumberFormat = require('react-number-format');

class JarSetup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      adjustJar: {},
      myflow: {
        newRecord: {
          amount: 0,
          sub_type: 'เลือกชนิด',
          description: null
        }
      }
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
    this.props.getMoneyFlow();
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

  handlerUpdateMoneyFlowSubtype(_subtype) {
    this.setState({
      myflow: {
        newRecord: {
          amount: 0,
          sub_type: _subtype,
          description: null
        }
      }
    })
  }

  handlerCreateMoneyFlow(position) {

    let newSubType = this.state.myflow.newRecord.sub_type;
    let newDescription = findDOMNode(this.refs.newDescription).value;
    let newAmount = parseInt(findDOMNode(this.refs.newAmount).value);
    if (newSubType == 'เลือกชนิด' | newDescription == '' | isNaN(newAmount)) {
      return 0;
    }
    // build new record
    const newRecord = {
      type: null,
      sub_type: newSubType,
      description: newDescription,
      amount: newAmount
    }

    // reformat number to positive
    if (newRecord.amount < 0) {
      newRecord.amount = newRecord.amount * -1;
    }
    // set format follow button
    if (position == 1) {
      newRecord.type = 'in';
    } else {
      newRecord.amount = newRecord.amount * -1;
      newRecord.type = 'out';
    }

    this.props.createMoneyFlow(newRecord.type, newRecord.sub_type, newRecord.amount, newRecord.description);

    this.setState({
      myflow: {
        newRecord: {
          amount: 0,
          sub_type: 'เลือกชนิด',
          description: null
        }
      }
    })
  }

  render() {
    const flowDirectors = this.props.selectedjar.map(function(jar, i) {
      return (
        <Row key={i}>
          <Col xs={12} sm={12} md={3} lg={1}>{jar.display}</Col>
          <Col xs={4} sm={4} md={3} lg={2}><FormControl min="0" type="number" placeholder="%" ref="percent"/></Col>
          <Col xs={4} sm={4} md={3} lg={2}><FormControl min="0" type="number" placeholder="จำนวนเงิน" ref="amount"/></Col>
          <Col xs={4} sm={4} md={3} lg={1}><Button block bsStyle="success">บันทึก</Button></Col>
        </Row>
      )
    }, this)

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

    const moneyFlowItems = this.props.myflow.map(function(item, i) {
      return (
        <tr key={i}>
          <td>{item.sub_type}</td>
          <td>{item.description}</td>
          <td>
            <b>
              <NumberFormat thousandSeparator={true} prefix={'฿ '} value={item.amount} displayType={'text'}/>
            </b>
          </td>
          <td>
            <Button block>ลบ</Button>
          </td>
        </tr>
      )
    })

    return (
      <Grid>
        <h3>รายรับ - จ่ายคงที่</h3>
        <Table style={{
          color: 'black'
        }}>
          <thead>
            <tr>
              <th>#รูปแบบ</th>
              <th>ช่องทาง</th>
              <th>จำนวน</th>
              <th>จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {moneyFlowItems}
            <tr>
              <td>
                <InputGroup >
                  <DropdownButton componentClass={InputGroup.Button} title='เลือกรูปแบบ' bsStyle="default" id="input-dropdown-addon" title={this.state.myflow.newRecord.sub_type}>
                    <MenuItem style={{
                      backgroundColor: '#222222'
                    }} onClick={this.handlerUpdateMoneyFlowSubtype.bind(this, 'Active')}>Active</MenuItem>
                    <MenuItem style={{
                      backgroundColor: '#222222'
                    }} onClick={this.handlerUpdateMoneyFlowSubtype.bind(this, 'Passive')}>Passive</MenuItem>
                  </DropdownButton>
                </InputGroup>
              </td>
              <td><FormControl type="text" placeholder="กรอกช่องทาง" ref="newDescription"/></td>
              <td><FormControl min="0" type="number" placeholder="กรอกจำนวน" ref="newAmount"/></td>
              <td>
                <Button onClick={this.handlerCreateMoneyFlow.bind(this, 1)} block bsStyle="success">เพิ่ม</Button>
              </td>
            </tr>
          </tbody>
        </Table>
        <hr/>
        <h3 style={{
          color: 'red'
        }}>จัดการ (กำลังพัฒนา)</h3>
        <p>ยอดรายรับทั้งหมด 25,500 คงเหลือ 25,500 (100%)</p>
        <br></br>
        <Row>
          <Col xs={12} sm={12} md={3} lg={1}>#เหยือก</Col>
          <Col xs={4} sm={4} md={3} lg={2}>% (ต่อรายได้)</Col>
          <Col xs={4} sm={4} md={3} lg={2}>คิดเป็นเงิน</Col>
          <Col xs={4} sm={4} md={3} lg={1}>จัดการ</Col>
        </Row>
        {flowDirectors}
        <Row>
          <Col xs={12} sm={12} md={3} lg={1}>รวม</Col>
          <Col xs={4} sm={4} md={3} lg={2}>100</Col>
          <Col xs={4} sm={4} md={3} lg={2}>25,500</Col>
        </Row>
        <hr/>
        <h3>ใช้งาน</h3>
        <Row>
          {selectedJars}
        </Row>
        <hr/>
        <h3>เก็บ</h3>
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
                    <FormControl ref="updateRemain" min="0" type="number" value={this.state.adjustJar.remain} disabled/>
                  </InputGroup>
                </FormGroup>
              </Col>
              <Col xs={12} sm={6} md={6} lg={6}>
                <FormGroup controlId="updateFull">
                  <ControlLabel>เต็ม</ControlLabel>
                  <InputGroup>
                    <InputGroup.Addon>฿</InputGroup.Addon>
                    <FormControl ref="updateFull" min="0" type="number" placeholder={this.state.adjustJar.full}/>
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
  return {selectedjar: state.myJar.selected, nonselected: state.myJar.nonselected, member: state.member, myflow: state.moneyflow.myflow}
  // / * TODO : Template Active - map state to prop totalQty : state.cart.totalQty * /
}
function mapDispatchToProps(dispatch) {

  // / * TODO : Template Active - map dispatch to prop getCart : getCart * /
  return bindActionCreators({
    getMemberSession: getMemberSession,
    activeMyJar: activeMyJar,
    updateAJar: updateAJar,
    getMyJar: myJar,
    createMoneyFlow: createMoneyFlow,
    getMoneyFlow: getMoneyFlow
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(JarSetup);
