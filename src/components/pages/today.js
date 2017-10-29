"use strict"
import React from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {findDOMNode} from 'react-dom';

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
  FormGroup,
  FormControl,
  Image,
  Row,
  Col,
  Badge,
  Collapse
} from 'react-bootstrap';

import {selectedJar, updateAJar} from '../../actions/jarAction';
import {getTodayTransaction, createTransaction, removeTodayTransaction} from '../../actions/transactionAction';
import {getMemberSession} from '../../actions/memberAction';

var NumberFormat = require('react-number-format');

class Today extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      today: {
        newRecord: {
          name: null,
          code: null,
          display: 'เลือกเหยือก',
          amount: 0,
          description: null
        }
      }
    }
  }

  componentDidMount() {
    this.props.getSelectedJar(); //
    this.props.getTodayTransaction(); //
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

  handlerUpdateJarSelected(_code, _display) {
    this.setState({
      today: {
        newRecord: {
          code: _code,
          name: this.state.today.newRecord.name,
          display: _display,
          amount: this.state.today.newRecord.amount,
          description: this.state.today.newRecord.description
        }
      }
    })
  }

  handlerCreateTransaction(position) {

    // filter display doesn't match jar
    let newCode = this.state.today.newRecord.code;
    let newDisplay = this.state.today.newRecord.display;
    let newDescription = findDOMNode(this.refs.newDescription).value;
    let newAmount = parseInt(findDOMNode(this.refs.newAmount).value);
    if (newDisplay == 'เลือกเหยือก' | newDescription == '' | isNaN(newAmount)) {
      return 0;
    }
    // build new record
    const newRecord = {
      display: newDisplay,
      code: newCode,
      description: newDescription,
      amount: newAmount,
      type: null
    }
    // reformat number to positive
    if (newRecord.amount < 0) {
      newRecord.amount = newRecord.amount * -1;
    }
    // set format follow button
    if (position == 1) {
      newRecord.type = 'increase';
    } else {
      newRecord.amount = newRecord.amount * -1;
      newRecord.type = 'decrease';
    }

    /* UPDATE TRANSACTION*/
    this.props.createTransaction(newRecord.code, newRecord.display, newRecord.description, newRecord.amount, newRecord.type)

    /* UPDATE JAR */
    const currentJarsToUpdate = [...this.props.selectedjar];
    let jarIndex = this.props.selectedjar.findIndex(function(jar) {
      return jar.display === newDisplay;
    })

    let newJar = currentJarsToUpdate[jarIndex];
    newJar.remain = (currentJarsToUpdate[jarIndex].remain + newRecord.amount).toFixed(2);
    this.props.updateAJar(newJar, function() {})

    this.setState({
      today: {
        newRecord: {
          name: null,
          code: null,
          display: 'เลือกเหยือก',
          amount: 0,
          description: null
        }
      }
    })
  }

  handlerRemoveTodayTransaction(_transaction) {
    /* UPDATE TRANSACTION*/
    this.props.deleteTransaction(_transaction);

    /* UPDATE JAR */
    const currentJarsToUpdate = [...this.props.selectedjar];
    let jarIndex = this.props.selectedjar.findIndex(function(jar) {
      return jar.display === _transaction.display;
    })

    let newJar = currentJarsToUpdate[jarIndex];
    newJar.remain = (currentJarsToUpdate[jarIndex].remain - _transaction.amount).toFixed(2);
    this.props.updateAJar(newJar, function() {});
  }

  render() {
    const jars = this.props.selectedjar.map(function(jar, i) {
      return (
        <Col key={i} xs={6} sm={6} md={4} lg={2}>
          <JarItem code={jar.code} remain={jar.remain} full={jar.full}/>
        </Col>
      )
    })

    const jarList = this.props.selectedjar.map(function(jar, i) {
      return (
        <MenuItem key={i} eventKey={jar.name} style={{
          backgroundColor: '#222222'
        }} onClick={this.handlerUpdateJarSelected.bind(this, jar.code, jar.display)}>{jar.display}</MenuItem>
      )
    }, this)

    const records = this.props.transaction.map(function(transaction, i) {
      let style = null;
      i = i * i
      switch (transaction.type) {
        case 'decrease':
          style = {
            'color': 'red'
          };
          break;
        case 'increase':
          style = {
            'color': 'green'
          };
          break;
        default:
      }

      return (
        <tr key={i}>
          <td>{transaction.display}</td>
          <td>{transaction.description}</td>
          <td style={style}>
            <b>
              <NumberFormat thousandSeparator={true} prefix={'฿ '} value={transaction.amount} displayType={'text'}/>
            </b>

          </td>
          <td>
            <Button onClick={this.handlerRemoveTodayTransaction.bind(this, transaction)} block>ลบ</Button>
          </td>
        </tr>
      )
    }, this)

    return (
      <Grid>
        <h3>ยอดคงเหลือ (ต่อเดือน) <Badge onClick={() => this.setState({
            open1: !this.state.open1
          })}>?</Badge>
        </h3>
        <Collapse in={this.state.open1}>
          <div>
            <Well>
              ใช้แสดงถึงเงินที่เหลือในแต่ละเหยือก ซึ่งจะเปลี่ยนแปลงเพิ่มขึ้น-ลดลงตามรายการที่เพิ่มเข้ามา และเหยือกที่แสดงจะสัมพันธ์กันกับเหยือกที่เลือกหน้าจัดการ
            </Well>
          </div>
        </Collapse>
        <Row>
          {jars}
        </Row>
        <hr/>
        <h3>บันทึกวันนี <Badge onClick={() => this.setState({
            open2: !this.state.open2
          })}>?</Badge>
        </h3>
        <Collapse in={this.state.open2}>
          <div>
            <Well>
              ใช้บันทึกรายรับ-จ่าย ของวันนั้น ๆ เช่น ค่าข้าวเที่ยง, ค่าเดินทาง ซึ่งรายการที่แสดงจะมีของวันนี้เท่านั้นและส่งผลต่อปริมาณเงินในเหยือกด้านบนด้วย
              <br></br>
              <Button className="pull-right" bsStyle="warning">แนะนำการใช้งาน</Button>
            </Well>
          </div>
        </Collapse>
        <Table striped bordered condensed hover style={{
          color: 'black'
        }}>
          <thead>
            <tr>
              <th>#เหยือก</th>
              <th>รายการ</th>
              <th>จำนวน</th>
              <th>จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {records}
            <tr>
              <td>
                <InputGroup >
                  <DropdownButton componentClass={InputGroup.Button} id="input-dropdown-addon" title={this.state.today.newRecord.display} bsStyle="default">
                    {jarList}
                  </DropdownButton>
                </InputGroup>
              </td>
              <td><FormControl type="text" placeholder="กรอกรายละเอียด" ref="newDescription"/></td>
              <td>
                <FormGroup>
                  <InputGroup>
                    <InputGroup.Addon>฿</InputGroup.Addon>
                    <FormControl min="0" type="number" placeholder="กรอกจำนวน" ref="newAmount"/>
                  </InputGroup>
                </FormGroup>
              </td>
              <td>
                <ButtonGroup vertical block>
                  <Button onClick={this.handlerCreateTransaction.bind(this, 1)} bsStyle="success">เพิ่มเข้า</Button>
                  <Button onClick={this.handlerCreateTransaction.bind(this, -1)} bsStyle="danger">ถอนออก</Button>
                </ButtonGroup>
              </td>
            </tr>
          </tbody>
        </Table>
        <a href="https://bx.in.th/ref/sgrNrC/">
          <div style={{
            'textAlign': 'center',
            'background': '#144498'
          }}><Image responsive src="https://d2v7vc3vnopnyy.cloudfront.net/img/resource/bx1_en.gif" alt="BX.in.th Bitcoin Exchange Thailand"/>
          </div>
        </a>
        <br></br>
        <a href="https://bitconnect.co/?ref=supanat">
          <div style={{
            'textAlign': 'center',
            'background': 'black'
          }}>
            <Image responsive bsClass='img-responsive center-block' src="https://bitconnect.co/upload/image/banner/lending/BitConnect-lending-728X90.gif"/>
          </div>
        </a>
      </Grid>
    )
  }
}

function mapStateToProps(state) {
  return {selectedjar: state.myJar.selected, transaction: state.transaction.today, member: state.member}
  // / * TODO : Template Active - map state to prop totalQty : state.cart.totalQty * /
}
function mapDispatchToProps(dispatch) {

  // / * TODO : Template Active - map dispatch to prop getCart : getCart * /
  return bindActionCreators({
    getMemberSession: getMemberSession,
    getSelectedJar: selectedJar,
    updateAJar: updateAJar,
    getTodayTransaction: getTodayTransaction,
    createTransaction: createTransaction,
    deleteTransaction: removeTodayTransaction
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Today);
