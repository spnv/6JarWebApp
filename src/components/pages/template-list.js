"use strict"
import React from 'react';
import {connect} from 'react-redux';
import {getBooks} from '../../actions/booksActions';
import {bindActionCreators} from 'redux';
import {Carousel, Grid, Col, Row, Button} from 'react-bootstrap';

import BookItem from './bookItem';
import BooksForm from './bookForm';
import Cart from './cart';

import {
  createMember,
  signIn,
  getMemberSession,
  destroyMemberSession,
  changePriorityTo,
  changeStatusTo
} from '../../actions/memberActions';

class BooksList extends React.Component {
  componentDidMount() {
    this.props.getBooks();
    this.props.getMemberSession();
  }

  handlerCreateMember() {
    const detail = {
      // TODO : change from const data to getting from DOM
      username: 'developer',
      password: '1412',
      display: 'Spnv',
      name: 'Supanat',
      surname: 'Veerahong',
      email: 'supanat.ve@gmail.com',
      phone: '0893054958'
    }
    this.props.createMember(detail.username, detail.password, detail.display, detail.name, detail.surname, detail.email, detail.phone);
  }

  handlerSignIn() {
    const detail = {
      // TODO : change from const data to getting from DOM
      username: 'developer',
      password: '1412'
    }
    this.props.signIn(detail.username, detail.password);
  }

  handlerLogout() {
    this.props.destroyMemberSession();
  }

  handlerUpdatePrior() {
    // TODO : change from const data to getting from DOM or state
    const detail = {
      username: 'developer',
      password: '1412',
      priority: 'vip'
    }
    this.props.changePriorityTo(detail.username, detail.password, detail.priority);
  }

  handlerStatusUpdate() {
    // TODO : change from const data to getting from DOM or state
    const detail = {
      username: 'developer',
      password: '1412',
      status: 'approved'
    }
    this.props.changeStatusTo(detail.username, detail.password, detail.status);
  }

  render() {
    const booksList = this.props.books.map(function(booksArr) {
      return (
        <Col xs={12} sm={6} md={4} key={booksArr._id}>
          <BookItem _id={booksArr._id} title={booksArr.title} description={booksArr.description} images={booksArr.images} price={booksArr.price}/>
        </Col>
      )
    })
    return (
      <Grid>
        <Row></Row>
        <Row>
          <Cart/>
        </Row>
        <Row>
          <Col xs={12} sm={12}>
            <BooksForm/>
          </Col>
          {booksList}
        </Row>
        <h6>
          {(this.props.member.signin == true)
            ? (this.props.member.data.name)
            : ('')}
        </h6>
        <Button onClick={this.handlerCreateMember.bind(this)} bsStyle="success">Create user</Button>
        <Button onClick={this.handlerSignIn.bind(this)} bsStyle="primary">Sign in</Button>
        <Button onClick={this.handlerLogout.bind(this)} bsStyle="danger">Logout</Button>
        <Button onClick={this.handlerUpdatePrior.bind(this)} bsStyle="warning">Set VIP</Button>
        <Button onClick={this.handlerStatusUpdate.bind(this)} bsStyle="default">Approve</Button>
      </Grid>
    )
  }
}
function mapStateToProps(state) {
  return {books: state.books.books, member: state.member.mymember}
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getBooks: getBooks,
    createMember: createMember,
    signIn: signIn,
    getMemberSession: getMemberSession,
    destroyMemberSession: destroyMemberSession,
    changePriorityTo: changePriorityTo,
    changeStatusTo: changeStatusTo
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(BooksList);
