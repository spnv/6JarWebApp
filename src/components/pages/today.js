"use strict"
import React from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {findDOMNode} from 'react-dom';
import axios from 'axios';

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
  Row,
  Col
} from 'react-bootstrap';

var NumberFormat = require('react-number-format');

class Today extends React.Component {

  constructor() {
    super();
    this.state = {
      today: {
        jars: [],
        records: [],
        newRecord: {
          name: null,
          display: 'เลือกเหยือก',
          amount: 0,
          description: null
        }
      }
    }
  }

  componentDidMount() {
    // TODO : Change to action
    this.setState({
      today: {
        newRecord: {
          name: null,
          display: 'เลือกเหยือก',
          amount: 0,
          description: null
        },
        jars: [
          {
            name: 'ff',
            display: 'ลงทุน',
            remain: 4209,
            full: 5000
          }, {
            name: 'ed',
            display: 'ความรู้',
            remain: 3200,
            full: 1000
          }, {
            name: 'pl',
            display: 'เล่น',
            remain: 2780,
            full: 3200
          }, {
            name: 'lts',
            display: 'เก็บยาว',
            remain: 29000,
            full: 10000
          }, {
            name: 'gv',
            display: 'ให้',
            remain: 280,
            full: 100
          }, {
            name: 'na',
            display: 'ประจำวัน',
            remain: 4827,
            full: 2950
          }
        ],
        records: [
          {
            jar: 'ลงทุน',
            description: 'บิทคอยน์',
            amount: -5000,
            type: 'decrease'
          }, {
            jar: 'ลงทุน',
            description: 'บิทคอยน์',
            amount: 5000,
            type: 'increase'
          }, {
            jar: 'ลงทุน',
            description: 'บิทคอยน์',
            amount: -5000,
            type: 'decrease'
          }
        ]
      }
    })
  }

  handlerUpdateJarSelected(updateSelected) {
    this.setState({
      today: {
        jars: this.state.today.jars,
        records: this.state.today.records,
        newRecord: {
          name: this.state.today.newRecord.name,
          display: updateSelected,
          amount: this.state.today.newRecord.amount,
          description: this.state.today.newRecord.description
        }
      }
    })
  }

  handlerAddNewRecord(position) {
    // filter display doesn't match jar
    let newDisplay = this.state.today.newRecord.display;
    let newDescription = findDOMNode(this.refs.newDescription).value;
    let newAmount = parseInt(findDOMNode(this.refs.newAmount).value);
    if (newDisplay == 'เลือกเหยือก' | newDescription == '' | isNaN(newAmount)) {
      return 0;
    }
    // build new record
    const newRecord = {
      jar: newDisplay,
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

    // update jar
    const currentJarsToUpdate = [...this.state.today.jars];

    let jarIndex = this.state.today.jars.findIndex(function(jar) {
      return jar.display === newDisplay;
    })

    const newJarsToUpdate = {
      ...currentJarsToUpdate[jarIndex],
      remain: currentJarsToUpdate[jarIndex].remain + newRecord.amount
    }

    // TODO : Change to action
    // update state
    this.setState({
      today: {
        jars: [
          ...currentJarsToUpdate.slice(0, jarIndex),
          newJarsToUpdate,
          ...currentJarsToUpdate.slice(jarIndex + 1)
        ],
        records: [
          ...this.state.today.records,
          newRecord
        ],
        newRecord: {
          name: null,
          display: 'เลือกเหยือก',
          amount: 0,
          description: null
        }
      }
    })
  }

  render() {
    const jars = this.state.today.jars.map(function(jar) {
      return (
        <Col xs={6} sm={6} md={4} lg={2}>
          <JarItem name={jar.name} remain={jar.remain} full={jar.full}/>
        </Col>
      )
    })

    const jarList = this.state.today.jars.map(function(jar, i) {
      return (
        <MenuItem key={i} eventKey={jar.name} style={{
          backgroundColor: '#222222'
        }} onClick={this.handlerUpdateJarSelected.bind(this, jar.display)}>{jar.display}</MenuItem>
      )
    }, this)

    const records = this.state.today.records.map(function(record) {
      let style = null;

      switch (record.type) {
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
        <tr>
          <td>{record.jar}</td>
          <td>{record.description}</td>
          <td style={style}>
            <b>
              <NumberFormat thousandSeparator={true} prefix={'฿ '} value={record.amount} displayType={'text'}/>
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
        <h2>ยอดคงเหลือ</h2>
        <Row>
          {jars}
        </Row>
        <hr/>
        <h2>บันทึกวันนี้</h2>
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
              <td><FormControl type="number" placeholder="กรอกจำนวน" ref="newAmount"/></td>
              <td>
                <ButtonGroup vertical block>
                  <Button onClick={this.handlerAddNewRecord.bind(this, 1)} bsStyle="success">เพิ่มเข้า</Button>
                  <Button onClick={this.handlerAddNewRecord.bind(this, -1)} bsStyle="danger">ถอนออก</Button>
                </ButtonGroup>
              </td>
            </tr>
          </tbody>
        </Table>
      </Grid>
    )
  }
}

function mapStateToProps(state) {
  return {}
  // / * TODO : Template Active - map state to prop totalQty : state.cart.totalQty * /
}
function mapDispatchToProps(dispatch) {

  // / * TODO : Template Active - map dispatch to prop getCart : getCart * /
  return bindActionCreators({}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Today);
