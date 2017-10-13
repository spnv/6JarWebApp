"use strict"
import React from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {findDOMNode} from 'react-dom';

import {
  MenuItem,
  InputGroup,
  DropdownButton,
  ButtonGroup,
  Button,
  Grid,
  Row,
  Col
} from 'react-bootstrap';

import {getAsset, createAsset, removeAsset} from '../../actions/assetAction';
import {getMemberSession} from '../../actions/memberAction';

var NumberFormat = require('react-number-format');

class Asset extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      myasset: {
        newRecord: {
          name: null,
          catagory: 'ประเภท',
          risk_level: 'ความเสี่ยง',
          invest_amount: 0,
          description: null
        }
      }
    }
  }

  componentDidMount() {
    this.props.getgetMyAsset(); //
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

  handlerCreateAsset() {

    let contex = this;
    let newName = this.state.myasset.newRecord.name;
    let newCatagory = this.state.myasset.newRecord.catagory;
    let newRiskLevel = this.state.myasset.newRecord.risk_level;
    let newDescription = findDOMNode(this.refs.newDescription).value;
    let newAmount = parseInt(findDOMNode(this.refs.newAmount).value);
    if (newName == '' | newCatagory == 'ประเภท' | newRiskLevel == 'ความเสี่ยง' | newDescription == '' | isNaN(newAmount)) {
      return 0;
    }
    // build new record
    const newRecord = {
      name: newName,
      catagory: newCatagory,
      risk_level: newRiskLevel,
      invest_amount: newAmount,
      description: newDescription
    }
    // reformat number to positive
    if (newRecord.amount < 0) {
      newRecord.amount = newRecord.amount * -1;
    }

    this.props.createAsset(newRecord.name, newRecord.catagory, newRecord.risk_level, newRecord.description, newRecord.invest_amount, function() {
      contex.setState({
        myasset: {
          newRecord: {
            name: null,
            catagory: 'ประเภท',
            risk_level: 'ความเสี่ยง',
            invest_amount: 0,
            description: null
          }
        }
      })
    });
  }

  handlerRemoveAsset(_aseet) {
    this.props.deleteAsset(_asset, function() {});
  }

  render() {

    const assetItems = this.props.myasset.map(function(item, i) {
      return (
        <tr key={i}>
          <td>{item.catagory}</td>
          <td>{item.risk_level}</td>
          <td>{item.name}</td>
          <td>
            <b>
              <NumberFormat thousandSeparator={true} prefix={'฿ '} value={item.invest_amount} displayType={'text'}/>
            </b>
          </td>
          <td>{item.description}</td>
          <td>
            <Button onClick={this.handlerRemoveAsset.bind(this, item)} block>ลบ</Button>
          </td>
        </tr>
      )
    }, this)

    return (
      <Grid>
        <h3>ทรัพย์สิน</h3>
          <Table striped bordered condensed hover style={{
            color: 'black'
          }}>
            <thead>
              <tr>
                <th>#ประเภท</th>
                <th>ความเสี่ยง</th>
                <th>สินทรัพย์</th>
                <th>ทุน</th>
                <th>จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {assetRecords}
              <tr>
                <td>
                  <InputGroup >
                    <DropdownButton componentClass={InputGroup.Button} id="input-dropdown-addon" title={this.state.myasset.newRecord.catagory} bsStyle="default">
                      {assetCatagory}
                    </DropdownButton>
                  </InputGroup>
                </td>
                  <td>
                    <InputGroup >
                      <DropdownButton componentClass={InputGroup.Button} id="input-dropdown-addon" title={this.state.myasset.newRecord.risk_level} bsStyle="default">
                        {assetRiskLevel}
                      </DropdownButton>
                    </InputGroup>
                  </td>
                <td><FormControl type="text" placeholder="ชื่อสินทรัพย์" ref="newDescription"/></td>
                <td>
                  <FormGroup>
                    <InputGroup>
                      <InputGroup.Addon>฿</InputGroup.Addon>
                      <FormControl min="0" type="number" placeholder="จำนวนทุน" ref="newAmount"/>
                    </InputGroup>
                  </FormGroup>
            </td>
                <td>
                    <Button onClick={this.handlerCreateAsset.bind(this)} bsStyle="success">เพิ่ม</Button>
                </td>
              </tr>
            </tbody>
          </Table>
      </Grid>
    )
  }
}

function mapStateToProps(state) {
  return {myasset: state.asset.myasset, member: state.member}
  // / * TODO : Template Active - map state to prop totalQty : state.cart.totalQty * /
}
function mapDispatchToProps(dispatch) {

  // / * TODO : Template Active - map dispatch to prop getCart : getCart * /
  return bindActionCreators({
    getMemberSession: getMemberSession,
    getMyAsset: getAsset,
    createAsset: createAsset,
    deleteAsset: removeAsset
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Asset);
