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
import {createMoneyFlow, getMoneyFlow, removeMoneyFlow} from '../../actions/moneyFlowAction';

var NumberFormat = require('react-number-format');

class JarSetup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      enumerateFlow: {},
      totalAmount: 0,
      myflow: {
        newRecord: {
          amount: 0,
          sub_type: 'เลือกชนิด',
          description: null
        }
      }
    }
  }

  open(moneyFlow) {
    this.setState({showModal: true, enumerateFlow: moneyFlow})
  }
  close() {
    this.setState({showModal: false})
  }

  componentWillMount() {
    // const totalAmount = this.props.myflow.reduce(function(a, b) {
    //   return a + b.amount;
    // }, 0);
    //
    // this.setState({totalAmount: totalAmount})
  }

  componentDidMount() {
    // this.props.getSelectedJar();
    // this.props.getNonSelectedJar();
    let contex = this;
    contex.props.getMyJar(); //
    contex.props.getMemberSession();
    contex.props.getMoneyFlow(function() {
      // const totalAmount = contex.props.myflow.reduce(function(a, b) {
      //   return a + b.amount;
      // }, 0);
      //
      // contex.setState({totalAmount: totalAmount})

    });

    // const totalAmount = this.props.myflow.reduce(function(a, b) {
    //   return a + b.amount;
    // }, 0);
    //
    // this.setState({totalAmount: totalAmount})
  }

  // componentWillReceiveProps(nextProps) {
  //   if (this.props.myflow != nextProps.myflow) {
  //     console.log('new flow');
  //
  //     console.log(this.state);
  //   }
  // }

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

  // handlerUpdateAJar() {
  //   let updatedJar = this.state.adjustJar;
  //   updatedJar.full = parseInt(findDOMNode(this.refs.updateFull).value);
  //   this.props.updateAJar(updatedJar);
  //   this.close();
  // }

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

      // const totalAmount = contex.props.myflow.reduce(function(a, b) {
      //   return a + b.amount;
      // }, 0);

      contex.setState({
        myflow: {
          newRecord: {
            amount: 0,
            sub_type: 'เลือกชนิด',
            description: null
          }
        }
      })

      // console.log(contex.state);
    });
  }

  handleInputFlowChange(event) {

    const target = event.target;
    const value = target.value;
    const name = target.name;
    // const amount = (value / 100) * this.state.totalAmount;

    // console.log(name)
    // console.log(value)

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

    // console.log(amount)

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

  handlerRemoveMoneyFlow(_income) {
    /* UPDATE TRANSACTION*/
    // console.log(_income)
    this.props.removeMoneyFlow(_income, function() {});

    // const totalAmount = this.props.myflow.reduce(function(a, b) {
    //   return a + b.amount;
    // }, 0);
    //
    // this.setState({totalAmount: totalAmount})
  }

  render() {

    // const enumulateList = this.props.selectedjar.map(function(jar, i) {
    //
    //   let percent = ((jar.full / this.state.totalAmount) * 100).toFixed(2);
    //   let amount = ((percent / 100) * this.state.totalAmount).toFixed(2);
    //   let controlName = 'flow-' + i;
    //   let amountName = 'amount-' + i;
    //
    //   return (
    //     <Row key={i}>
    //       <Col xs={12} sm={12} md={3} lg={1}>{jar.display}</Col>
    //       <Col xs={4} sm={4} md={3} lg={2}>
    //         <FormControl step={0.01} name={controlName} min="0" onChange={this.handleInputFlowChange.bind(this)} defaultValue={percent} type="number" placeholder="%" ref="percent"/>
    //       </Col>
    //       <Col xs={4} sm={4} md={3} lg={2}>
    //         <NumberFormat decimalPrecision={2} thousandSeparator={true} prefix={'฿ '} value={(this.state[controlName] == null)
    //           ? amount
    //           : this.state[controlName].value} displayType={'text'} ref={amountName}/>
    //       </Col>
    //       <Col xs={4} sm={4} md={3} lg={1}>
    //         {(this.state[controlName] != null)
    //           ? (this.state[controlName].isChange == 'saved')
    //             ? (
    //               <Button block bsStyle="success">
    //                 เรียบร้อย
    //               </Button>
    //             )
    //             : ((this.state[controlName].isChange == 'saving')
    //               ? (
    //                 <Button disabled block bsStyle="warning">
    //                   บันทึก...
    //                 </Button>
    //               )
    //               : (
    //                 <Button block bsStyle="warning" onClick={this.handleUpdateFullJar.bind(this, controlName, amountName, jar)}>
    //                   บันทึก
    //                 </Button>
    //               ))
    //           : (
    //             <Button block bsStyle="success">
    //               เรียบร้อย
    //             </Button>
    //           )}
    //       </Col>
    //     </Row>
    //   )
    // }, this)

    // const flowDirectors = this.props.selectedjar.map(function(jar, i) {
    //
    //   let percent = ((jar.full / this.props.totalAmount) * 100).toFixed(2);
    //   let amount = ((percent / 100) * this.state.totalAmount).toFixed(2);
    //   let controlName = 'flow-' + i;
    //   let amountName = 'amount-' + i;
    //
    //   return (
    //     <Row key={i}>
    //       <Col xs={12} sm={12} md={3} lg={1}>{jar.display}</Col>
    //       <Col xs={4} sm={4} md={3} lg={2}>
    //         <FormControl step={0.01} name={controlName} min="0" onChange={this.handleInputFlowChange.bind(this)} defaultValue={percent} type="number" placeholder="%" ref="percent"/>
    //       </Col>
    //       <Col xs={4} sm={4} md={3} lg={1}>
    //         {(this.state[controlName] != null)
    //           ? (this.state[controlName].isChange == 'saved')
    //             ? (
    //               <Button block bsStyle="success">
    //                 เรียบร้อย
    //               </Button>
    //             )
    //             : ((this.state[controlName].isChange == 'saving')
    //               ? (
    //                 <Button disabled block bsStyle="warning">
    //                   บันทึก...
    //                 </Button>
    //               )
    //               : (
    //                 <Button block bsStyle="warning" onClick={this.handleUpdateFullJar.bind(this, controlName, amountName, jar)}>
    //                   บันทึก
    //                 </Button>
    //               ))
    //           : (
    //             <Button block bsStyle="success">
    //               เรียบร้อย
    //             </Button>
    //           )}
    //       </Col>
    //     </Row>
    //   )
    // }, this)

    const selectedJars = this.props.selectedjar.map(function(jar, i) {
      // <Button onClick={this.open.bind(this, jar)} bsStyle="warning">แก้ไข</Button>
      return (
        <Col key={i} xs={6} sm={6} md={4} lg={2}>
          <JarItem code={jar.code} remain={jar.remain} full={jar.full}/>
          <br/>
          <Button onClick={this.handlerUnSelectJar.bind(this, jar._id)} bsStyle="danger" block>เก็บ</Button>
        </Col>
      )
    }, this)

    const nonSelectedJars = this.props.nonselected.map(function(jar, i) {
      // <Button onClick={this.open.bind(this, jar)} bsStyle="warning">แก้ไข</Button>
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
      let amount = ((percent / 100) * this.state.totalAmount).toFixed(2);
      let controlName = 'flow-' + i;
      let amountName = 'amount-' + i;

      return (
        <tr key={i}>
          <td>{jar.display}</td>
          <td>
            <NumberFormat thousandSeparator={true} prefix={'฿ '} value={(jar.full).toFixed(2)} displayType={'text'}/>
          </td>
          <td>
            {percent}
          </td>
          <td><FormControl step={0.01} name={controlName} min="0" onChange={this.handleInputFlowChange.bind(this)} type="number" defaultValue={(jar.full).toFixed(2)} placeholder="จำนวน" ref={amountName}/></td>
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

    const sumIncome = this.props.myflow.reduce(function(a, b) {
      return a + b.amount;
    }, 0);

    const sumFlow = this.props.selectedjar.reduce(function(a, b) {
      return a + b.full;
    }, 0);

    // <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
    //   <Modal.Header>
    //     <Modal.Title>
    //       <b>แก้ไข [{this.state.adjustJar.display}]</b>
    //     </Modal.Title>
    //   </Modal.Header>
    //   <Modal.Body>
    //     <Grid>
    //       <h4>ยอดเงิน</h4>
    //       <Col xs={12} sm={6} md={6} lg={6}>
    //         <FormGroup controlId="updateRemain">
    //           <ControlLabel>คงเหลือ</ControlLabel>
    //           <InputGroup>
    //             <InputGroup.Addon>฿</InputGroup.Addon>
    //             <FormControl ref="updateRemain" min="0" type="number" value={this.state.adjustJar.remain} disabled/>
    //           </InputGroup>
    //         </FormGroup>
    //       </Col>
    //       <Col xs={12} sm={6} md={6} lg={6}>
    //         <FormGroup controlId="updateFull">
    //           <ControlLabel>เต็ม</ControlLabel>
    //           <InputGroup>
    //             <InputGroup.Addon>฿</InputGroup.Addon>
    //             <FormControl ref="updateFull" min="0" type="number" placeholder={this.state.adjustJar.full}/>
    //           </InputGroup>
    //         </FormGroup>
    //       </Col>
    //     </Grid>
    //   </Modal.Body>
    //   <Modal.Footer>
    //     <Button onClick={this.handlerUpdateAJar.bind(this)} bsStyle="success">บันทึก</Button >
    //     <Button onClick={this.close.bind(this)} bsStyle="danger">ปิด</Button >
    //   </Modal.Footer>
    // </Modal>

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
              <td></td>
            </tr>
          </tbody>
        </Table>
        <hr/>
        <h3>จัดการรายรับ</h3>
        <p>ยอดรายรับทั้งหมด
          <NumberFormat decimalPrecision={2} thousandSeparator={true} prefix={'฿ '} displayType={'text'} value={sumIncome}/>
          <br/>
          คงเหลือในการแบ่ง
          <NumberFormat decimalPrecision={2} thousandSeparator={true} prefix={'฿ '} displayType={'text'} value={sumIncome - sumFlow}/>
          (
          <NumberFormat decimalPrecision={2} thousandSeparator={true} displayType={'text'} value={((sumIncome - sumFlow) / sumIncome * 100)}/>% )</p>
        <br/>
        <Table style={{
          color: 'black'
        }}>
          <thead>
            <tr>
              <th>#เหยือก</th>
              <th>จำนวน</th>
              <th>คิดเป็น % (ต่อรายได้ทั้งหมด)</th>
              <th>จำนวนปรับ</th>
              <th>จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {flowDirectorItem}
            <tr >
              <td>รวม</td>
              <td><NumberFormat decimalPrecision={2} thousandSeparator={true} value={(sumFlow / sumIncome * 100)} displayType={'text'}/></td>
            </tr>
          </tbody>
        </Table>
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
              <b>แจกแจงรายรับ [{this.state.enumerateFlow.description}]</b>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Grid>
              <h4>รายการ</h4>
            </Grid>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close.bind(this)} bsStyle="danger">ปิด</Button >
          </Modal.Footer>
        </Modal>
      </Grid>
    )
  }
}

function mapStateToProps(state) {
  return {selectedjar: state.myJar.selected, nonselected: state.myJar.nonselected, member: state.member, myflow: state.moneyflow.myflow , totalAmount : state.moneyflow.totalAmount}
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
    removeMoneyFlow: removeMoneyFlow
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(JarSetup);
