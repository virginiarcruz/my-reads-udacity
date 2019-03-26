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

  componentDidMount() {
    BooksAPI.getAll()
    .then((books) => {
      this.setState(() => ({
        books
      }))
    })
  }

updateShelf = (book, shelfName) => {
    const bookFromState = this.state.books.find(b => b.id === book.id);
    if (bookFromState) {
      bookFromState.shelf = shelfName;
      BooksAPI.update(book, shelfName)
      .then(this.setState(currentState => ({
        books: currentState.books
      })))
    } else {
        book.shelf = shelfName;
        BooksAPI.update(book, shelfName)
        .then(this.setState(prevState => ({
          books: prevState.books.concat(book)
      })))
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
