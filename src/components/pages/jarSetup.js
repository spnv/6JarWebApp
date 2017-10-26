"use strict"
import React from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {findDOMNode} from 'react-dom';

// import {HorizontalBar, Pie} from 'react-chartjs-2';
var ProgressBar = require('react-progressbar.js')
var Line = ProgressBar.Line;
// var Bars = require("react-chartjs").Bars;
// var LineChart = require("react-chartjs").Line;

var PieChart = require('react-d3-components').PieChart;
// var HorizontalBar = require("react-chartjs-2").HorizontalBar;

import JarItem from '../items/jarItem';

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
  Image,
  ControlLabel,
  Row,
  Col,
  Modal
} from 'react-bootstrap';

import {activeMyJar, updateAJar, myJar} from '../../actions/jarAction';
import {getMemberSession} from '../../actions/memberAction';
import {createMoneyFlow, getMoneyFlow, removeMoneyFlow} from '../../actions/moneyFlowAction';
import {createTransaction} from '../../actions/transactionAction';

var NumberFormat = require('react-number-format');

class JarSetup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      paid: {
        owner: null,
        type: null,
        sub_type: null,
        amount: null,
        description: null
      },
      totalAmount: 0,
      myflow: {
        newRecord: {
          amount: 0,
          sub_type: 'เลือกชนิด',
          description: null
        }
      },
      paiding: 'none'
    }
  }

  open(moneyFlow) {
    this.setState({showModal: true, paid: moneyFlow})
  }
  close() {
    this.setState({showModal: false})
  }

  componentDidMount() {
    let contex = this;
    contex.props.getMemberSession();
    contex.props.getMyJar();
    contex.props.getMoneyFlow(function() {});
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

  handlerRemoveMoneyFlow(_income) {
    this.props.removeMoneyFlow(_income, function() {});
  }

  handlerCreateMoneyFlow(position) {

    let contex = this;
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

    this.props.createMoneyFlow(newRecord.type, newRecord.sub_type, newRecord.amount, newRecord.description, function() {
      contex.setState({
        myflow: {
          newRecord: {
            amount: 0,
            sub_type: 'เลือกชนิด',
            description: null
          }
        }
      })
    });
  }

  handleInputFlowChange(event) {

    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: {
        value: value,
        isChange: 'unsave'
      }
    });
  }

  handleUpdateFullJar(controlName, amountName, jar) {

    let parent = this;
    let amount = parseFloat(this.state[controlName].value);

    this.setState({
      [controlName]: {
        value: amount,
        isChange: 'saving'
      }
    });

    let updatedJar = jar;
    updatedJar.full = amount;
    this.props.updateAJar(updatedJar, function() {
      parent.setState({
        [controlName]: {
          value: amount,
          isChange: 'saved'
        }
      });
    });
  }

  handlePaidToJar() {

    let contex = this;

    contex.setState({paiding: 'paiding'});

    let requests = contex.props.selectedjar.map((jar, i) => {
      return new Promise((resolve) => {
        let percent = ((jar.full / contex.props.totalAmount) * 100);
        let paid = parseFloat((percent / 100 * contex.state.paid.amount).toFixed(2));
        contex.props.createTransaction(jar.code, jar.display, contex.state.paid.description, paid, 'increase');

        /* UPDATE JAR */
        const currentJarsToUpdate = [...contex.props.selectedjar];
        let jarIndex = contex.props.selectedjar.findIndex(function(jarList) {
          return jarList.display === jar.display;
        })

        let newJar = currentJarsToUpdate[jarIndex];
        newJar.remain = currentJarsToUpdate[jarIndex].remain + paid;
        contex.props.updateAJar(newJar, function() {
          resolve();
        });
      });
    })

    Promise.all(requests).then(function() {
      contex.setState({paiding: 'none'});
      contex.close();
    });
  }

  render() {
    let contex = this;

    const selectedJars = this.props.selectedjar.map(function(jar, i) {
      return (
        <Col key={i} xs={6} sm={6} md={4} lg={2}>
          <JarItem code={jar.code} remain={jar.remain} full={jar.full}/>
          <br/>
          <Button onClick={this.handlerUnSelectJar.bind(this, jar._id)} bsStyle="danger" block>เก็บ</Button>
        </Col>
      )
    }, this)

    const nonSelectedJars = this.props.nonselected.map(function(jar, i) {
      return (
        <Col key={i} xs={6} sm={6} md={4} lg={2}>
          <JarItem code={jar.code} remain={jar.remain} full={jar.full}/>
          <br/>
          <Button onClick={this.handlerSelectJar.bind(this, jar._id)} bsStyle="success" block>ใช้งาน</Button>
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
            <Button onClick={this.open.bind(this, item)} bsStyle='success' block>เงินเข้า</Button>
          </td>
          <td>
            <Button onClick={this.handlerRemoveMoneyFlow.bind(this, item)} block>ลบ</Button>
          </td>
        </tr>
      )
    }, this)

    const flowDirectorItem = this.props.selectedjar.map(function(jar, i) {

      let percent = ((jar.full / this.props.totalAmount) * 100).toFixed(2);
      let jarFull = (jar.full).toFixed(2);
      let percentName = 'percent-' + i;
      let controlName = 'flow-' + i;
      let amountName = 'amount-' + i;

      var options = {
        strokeWidth: 5
      };

      var containerStyle = {
        width: '100px'
      };

      return (
        <tr key={i}>
          <td>{jar.display}</td>
          <td>
            <NumberFormat thousandSeparator={true} suffix={' %'} value={percent} displayType={'text'}/>
            <Line progress={percent / 100} options={options} initialAnimate={true} containerStyle={containerStyle} containerClassName={'.progressbar'}/>
          </td>
          <td>
            <NumberFormat thousandSeparator={true} prefix={'฿ '} value={jarFull} displayType={'text'}/>
          </td>
          <td style={{
            width: 50
          }}>
            <FormGroup>
              <InputGroup>
                <InputGroup.Addon>฿</InputGroup.Addon>
                <FormControl step={0.01} name={controlName} min="0" onChange={this.handleInputFlowChange.bind(this)} type="number" defaultValue={jarFull} placeholder="จำนวน" ref={amountName}/>
              </InputGroup>
            </FormGroup>
          </td>
          <td>
            {(this.state[controlName] != null)
              ? (this.state[controlName].isChange == 'saved')
                ? (
                  <Button block bsStyle="success">
                    เรียบร้อย
                  </Button>
                )
                : ((this.state[controlName].isChange == 'saving')
                  ? (
                    <Button disabled block bsStyle="warning">
                      บันทึก...
                    </Button>
                  )
                  : (
                    <Button block bsStyle="warning" onClick={this.handleUpdateFullJar.bind(this, controlName, amountName, jar)}>
                      บันทึก
                    </Button>
                  ))
              : (
                <Button block bsStyle="success">
                  เรียบร้อย
                </Button>
              )}
          </td>
        </tr>
      )
    }, this)

    const paidDirectorItem = this.props.selectedjar.map(function(jar, i) {

      let percent = ((jar.full / this.props.totalAmount) * 100).toFixed(2);
      let paid = (percent / 100 * this.state.paid.amount).toFixed(2);
      let controlName = 'paid-flow-' + i;
      let amountName = 'paid-amount-' + i;

      return (
        <tr key={i}>
          <td>{jar.display}</td>
          <td>
            <NumberFormat thousandSeparator={true} suffix={' %'} value={percent} displayType={'text'}/>
          </td>
          <td>
            <NumberFormat thousandSeparator={true} prefix={'฿ '} value={paid} displayType={'text'}/>
          </td>
        </tr>
      )
    }, this)

    const sumPaid = this.props.selectedjar.reduce(function(a, b) {
      let percent = ((b.full / contex.props.totalAmount) * 100).toFixed(2);
      let paid = parseFloat(percent / 100 * contex.state.paid.amount);

      return a + paid;
    }, 0);

    const sumIncome = this.props.myflow.reduce(function(a, b) {
      return a + b.amount;
    }, 0);

    const sumFlow = this.props.selectedjar.reduce(function(a, b) {
      return a + b.full;
    }, 0);

    const pieData = this.props.selectedjar.map(function(jar, i) {

      let percent = parseFloat((jar.full / contex.props.totalAmount) * 100).toFixed(2);

      return {x: jar.display, y: percent}
    });

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
              <td>
                <FormGroup>
                  <InputGroup>
                    <InputGroup.Addon>฿</InputGroup.Addon>
                    <FormControl min="0" type="number" placeholder="กรอกจำนวน" ref="newAmount"/>
                  </InputGroup>
                </FormGroup>
              </td>
              <td>
                <Button onClick={this.handlerCreateMoneyFlow.bind(this, 1)} block bsStyle="success">เพิ่ม</Button>
              </td>
              <td></td>
            </tr>
          </tbody>
        </Table>
        <br/>
        <a href="https://bitconnect.co/?ref=supanat">
          <div style={{
            'textAlign': 'center',
            'background': 'black'
          }}>
            <Image responsive bsClass='img-responsive center-block' src="https://bitconnect.co/upload/image/banner/lending/BitConnect-lending-728X90.gif"/>
          </div>
        </a>
        <br/>
        <h3>จัดการรายรับ</h3>
        <Row>
          <Col lg={8}>
            <Table style={{
              color: 'black'
            }}>
              <thead>
                <tr>
                  <th>#เหยือก</th>
                  <th>สัดส่วนต่อรายได้</th>
                  <th>จำนวนแบ่ง</th>
                  <th>แก้ไขจำนวน</th>
                  <th>จัดการ</th>
                </tr>
              </thead>
              <tbody>
                {flowDirectorItem}
                <tr style={(sumIncome - sumFlow) >= 0
                  ? {
                    color: 'green'
                  }
                  : {
                    color: 'red'
                  }}>
                  <td>รวม</td>
                  <td><NumberFormat decimalPrecision={2} thousandSeparator={true} suffix={' %'} value={(sumFlow / sumIncome * 100)} displayType={'text'}/></td>
                  <td><NumberFormat decimalPrecision={2} thousandSeparator={true} prefix={'฿ '} value={sumFlow} displayType={'text'}/></td>
                  <td>
                    {(sumIncome - sumFlow) >= 0
                      ? 'คงเหลือในการแบ่ง'
                      : 'เกินจำนวนรายรับ '}
                    <NumberFormat decimalPrecision={2} thousandSeparator={true} prefix={' ฿ '} value={sumIncome - sumFlow} displayType={'text'}/>
                    <NumberFormat decimalPrecision={2} thousandSeparator={true} prefix={' ('} suffix={' %)'} displayType={'text'} value={((sumIncome - sumFlow) / sumIncome * 100)}/>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col lg={4}><PieChart data={{
        label: 'chart',
        values: pieData
      }} width={450} height={300} margin={{
        top: 2,
        bottom: 2,
        left: 2,
        right: 2
      }} sort={null}/>
          </Col>
        </Row>
        <hr/>
        <br/>
        <h3>ใช้งาน</h3>
        <Row>
          {selectedJars}
        </Row>
        <hr/>
        <br/>
        <h3>เก็บ</h3>
        <Row>
          {nonSelectedJars}
        </Row>
        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header>
            <Modal.Title>
              <b>แบ่งเงินเข้าจาก {this.state.paid.description}</b>
              <Button bsSize="xsmall" onClick={this.close.bind(this)} bsStyle="danger" className="pull-right">ปิด</Button >
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table style={{
              color: 'black'
            }}>
              <thead>
                <tr>
                  <th>#เหยือก</th>
                  <th>สัดส่วนต่อรายได้</th>
                  <th>จำนวนแบ่ง</th>
                </tr>
              </thead>
              <tbody>
                {paidDirectorItem}
                <tr style={(sumIncome - sumFlow) >= 0
                  ? {
                    color: 'green'
                  }
                  : {
                    color: 'red'
                  }}>
                  <td>รวม</td>
                  <td><NumberFormat decimalPrecision={2} thousandSeparator={true} suffix={' %'} value={(sumFlow / sumIncome * 100)} displayType={'text'}/></td>
                  <td><NumberFormat decimalPrecision={2} thousandSeparator={true} prefix={'฿ '} value={sumPaid} displayType={'text'}/></td>
                </tr>
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            {(this.state.paiding == 'none')
              ? (
                <Button bsSize="large" onClick={this.handlePaidToJar.bind(this)} bsStyle="success">
                  <b>แบ่งจ่ายเข้าเหยือก</b>
                </Button>
              )
              : (
                <Button disabled bsSize="large" bsStyle="success">
                  <b>กำลังจ่าย...</b>
                </Button>
              )
}
          </Modal.Footer>
        </Modal>
      </Grid>
    )
  }
}

function mapStateToProps(state) {
  return {selectedjar: state.myJar.selected, nonselected: state.myJar.nonselected, member: state.member, myflow: state.moneyflow.myflow, totalAmount: state.moneyflow.totalAmount}
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
    getMoneyFlow: getMoneyFlow,
    removeMoneyFlow: removeMoneyFlow,
    createTransaction: createTransaction
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(JarSetup);
