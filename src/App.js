import React from 'react'
import * as BooksAPI from './utils/BooksAPI'
import './App.css'
import SearchBooks from './components/SearchBooks';
import ListBooks from './components/ListBooks';
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  async componentDidMount() {
    const books = await BooksAPI.getAll()
    this.setState({
      books
    })
  }


  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).catch(err => {
      console.log(err);
      this.setState({
        error: true
      });
    });
    if (shelf === 'none') {
      this.setState(prevState => ({
        books: prevState.books.filter(b => b.id !== book.id)
      }));
    } else {
      book.shelf = shelf;
      this.setState(prevState => ({
        books: prevState.books.filter(b => b.id !== book.id).concat(book)
      }));
    }
  };


  render() {

    return (
      <div className="app">
       <Route exact path='/' render={() => (
          <ListBooks
            books={this.state.books}
            onUpdateShelf={this.updateShelf}
          />
        )} />
        <Route path='/search' render={() => (
          <SearchBooks
            books={this.state.books}
            onUpdateShelf={this.updateShelf}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
