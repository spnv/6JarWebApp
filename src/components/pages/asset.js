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

import {getMemberSession} from '../../actions/memberAction';

class Asset extends React.Component {
  render () {
    return(
      <Grid>
        <h3>ทรัพย์สิน</h3>
        <Row>
          <Col xs={12} sm={6} md={4} lg={3}>
            <b>เพิ่ม</b>
          </Col>
        </Row>
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
    getMemberSession: getMemberSession
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Asset);
