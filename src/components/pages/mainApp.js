"use strict"
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {findDOMNode} from 'react-dom';
import {
  Col,
  Row,
  Grid,
  FormControl,
  FormGroup,
  ControlLabel,
  Button
} from 'react-bootstrap';

import {getTodayTransaction} from '../../actions/transactionAction';
import {myJar} from '../../actions/jarAction';
import {selectedJar} from '../../actions/jarAction';

class MainApp extends React.Component {
  componentDidMount() {
    // TODO : get session
    // this.props.getSelectedJar();
    // this.props.getTodayTransaction();
    // this.props.getMyJar();
  }

  render() {
    return (
      <Grid>
        <Row>
          {this.props.children}
        </Row>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getTodayTransaction:getTodayTransaction,
    getMyJar:myJar,
    getSelectedJar:selectedJar
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MainApp);
