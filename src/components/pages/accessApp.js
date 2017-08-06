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

class AccessApp extends React.Component {
  componentDidMount() {
    // TODO : get session
  }

  handleSubmit() {
    const newMember = {
      email: findDOMNode(this.refs.email).value,
      password: findDOMNode(this.refs.password).value,
      nickname: findDOMNode(this.refs.nickname).value
    };

    // TODO : add action
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
  return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AccessApp);
