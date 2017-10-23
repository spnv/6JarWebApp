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
  FormControl

} from 'react-bootstrap';

class ContactUs extends React.Component {
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
            <form>
              <FormGroup bsSize="large">
                <InputGroup style={{
                  'width': '100%'
                }}>
                  <ControlLabel>ชื่อ</ControlLabel>
                  <FormControl type="text" ref="newAmount"/>
                </InputGroup>
              </FormGroup>

              <FormGroup bsSize="large">
                <InputGroup style={{
                  'width': '100%'
                }}>
                  <ControlLabel>อีเมล์</ControlLabel>
                  <FormControl type="text" ref="newAmount"/>
                </InputGroup>
              </FormGroup>

              <FormGroup bsSize="large" controlId="formControlsSelect">
                <ControlLabel>ติดต่อเรื่อง</ControlLabel>
                <FormControl componentClass="select" placeholder="...">
                  <option value="แนะนำ">แนะนำ</option>
                  <option value="โฆษณา">โฆษณา</option>
                </FormControl>
              </FormGroup>

              <FormGroup bsSize="large" controlId="formControlsTextarea">
                <ControlLabel>ข้อความ</ControlLabel>
                <FormControl rows="4" componentClass="textarea"/>
              </FormGroup>
              <Button  bsStyle="default">ส่ง</Button>
            </form>
          </Col>
        </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);
