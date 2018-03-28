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
  FormControl,
  Modal
} from 'react-bootstrap';

class Article extends React.Component {

  render() {
    return (<Grid>
      <div style={{
          'textAlign' : 'center'
        }}>
        <Row>
          หมวดบทความ : <Button bsSize="xsmall" bsStyle="warning">ลงทุน</Button>
        </Row>
        <br></br>
        <h1>
          <b>เมื่อสายเทรดไม่ใช่แนว อย่างนี้ต้อง Margin lending [พร้อมขั้นตอน]</b>
        </h1>
        <br></br>
        <Row>
          โดย <b>supanatv</b> - 04/11/2017
        </Row>
      </div>
      <br></br>
      <Row>
        <p>หลายคนทำกำไรมากมายจากตลาด Crypto ด้วยการซื้อเหรียญในราคาถูกและทำการขายตอนที่ราคาเพิ่มขึ้น หรือที่เรียกว่า การเทรดเก็งกำไร นั้นเอง อย่างไรก็ตามการเก็งกำไรนั้นต้องอาศัยปัจจัยหลายอย่างทั้ง ข่าวสาร ความรู้ จิตใจ และประสบการณ์ ซึ่งไม่ใช่เรื่องง่ายเลยที่ทุกคนจะสามารถทำได้ดีและได้กำไรจากมัน แต่ถึงนั้นอย่างนั้นตลาด Crypto ก็ยังมีช่องทางสร้างผลกำไรช่องทางอื่นนั้นคือการ Lending</p>
        <h3>คืออะไร</h3>
        <p>เป็นการปล่อยให้นักเก็งกำไรนำเหรียญหรือเงินของเราไปยืมใช้ในการเทรดเก็งกำไรเพื่อให้ได้ผลตอบแทนมากขึ้น ส่วนผู้ให้ยืมจะได้ผลตอบแทนเป็นกำไรบางส่วนจากการเทรดเก็งกำไรของผู้ยืมนั้นเอง
        ซึ่งเมื่อครบกำหนดการยืม ระบบของผู้ให้บริการจะทำการโอนเหรียญหรือเงินของผู้ให้ยืมคืนจากผู้ยืมครบจำนวน ทำให้เราไม่ต้องรับความเสี่ยงจากการเทรดเก็งกำไรเลย</p>
        <h3>ข้อดี</h3>
        <p>{'- ไม่มีความเสี่ยงจากการเทรดเก็งกำไร\n- ไม่ต้องใช้ประสบการณ์ ความรู้ จิตใจมากเท่าการเทรด'.split("\n").map(i => {
            return <div>{i}</div>;
        })}</p>
        <h3>ข้อเสีย</h3>
          <p>{'- ผลตอบแทนน้อยกว่าการเทรดเก็งกำไร\n- ไม่สามารถซื้อขายเหรียญที่ให้ยืมได้จนกว่าจะหมดเวลา'.split("\n").map(i => {
              return <div>{i}</div>;
          })}</p>
        <h3>ขั้นตอน</h3>
        <p>วิธีการทำ lending มีขั้นตอนดังต่อไปนี้</p>
        <h4>1. เปิดบัญชี</h4>
        <p>{'ก่อนอื่นเราต้องทำการเปิดบัญชีสำหรับฝากเงินที่จะให้ lending, บัญชีสำหรับ lending โดยแต่ละอย่างมีผู้ให้บริการดังนี้\nผู้ให้บริการฝากเงิน\n- Bx : เปิดบัญชี วิธีการเปิดบัญชี\nผู้ให้บริการ lending\n- Poloniex : เปิดบัญชี วิธีการเปิดบัญชี\n- Bitfinex : เปิดบัญชี วิธีการเปิดบัญชี'.split("\n").map(i => {
            return <div>{i}</div>;
        })}</p>
        <h4>2. เติมเงินเข้าระบบ</h4>
        <p>โอนเงินเข้าบัญชี bx สำหรับการ lending ควรมีจำนวนอย่างน้อย 5,000 บาท</p>
        <h4>3. โอนไปยังผู้ให้บริการ</h4>
        <p>{'หลังจากเงินเข้าบัญชี Bx เสร็จเรียบร้อย ทำการซื้อเหรียญที่มีลิสอยู่บนกระดานผู้ให้บริการ Bifinex หรือ Poloneix เช่น BTC, ETH, LTC ควรเป็นเหรียญที่มีแนวโน้มขึ้นรหือราคานิ่ง หลังจากการโอนเสร็จเรียบร้อยให้สังเกตุว่าเหรียญอยู่ในกระเป๋า lend หรือไม่ หากไมให้ทำการย้ายมาในกระเป๋า lend'.split("\n").map(i => {
            return <div>{i}</div>;
        })}</p>
        <h4>4. เปิด API Lending</h4>
        <p>เป็นการปล่อยให้นักเก็งกำไรนำเหรียญหรือเงินของเราไปยืมใช้ในการเก็งกำไรและได้ผลตอบแทนเป็นกำไรบางส่วนจากการเก็งกำไรของผู้ยืมนั้นเอง</p>
        <h4>5. ตั้งค่า Lending bot</h4>
        <p>เป็นการปล่อยให้นักเก็งกำไรนำเหรียญหรือเงินของเราไปยืมใช้ในการเก็งกำไรและได้ผลตอบแทนเป็นกำไรบางส่วนจากการเก็งกำไรของผู้ยืมนั้นเอง</p>
        <h3>ความเสี่ยง</h3>
        <p>{'ถึงอย่างไรไม่ว่ามากหรือน้อยทุกการลงทุนย่อมมีความเสี่ยง และการ lending ก็ไม่มีข้อยกเว้นเช่นกัน โดยมีความเสี่ยงเบื้องต้นดังนี้\n- ราคาของเหรียญที่ให้กู้ยืมตกระหว่างให้กู้ยืม\n- ผู้ให้บริหารปิดบริการหนี'.split("\n").map(i => {
            return <div>{i}</div>;
        })}</p>
      </Row>
    </Grid>)
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

export default connect(mapStateToProps, mapDispatchToProps)(Article);