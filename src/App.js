import React from 'react'
import * as BooksAPI from './utils/BooksAPI'
import './App.css'
import Dashboard from './components/Dashboard'
import SearchBooks from './components/SearchBooks';

class BooksApp extends React.Component {
  state = {
    books: [],
    filteredBooks: [],
    allBooks: [],
    showSearchPage: false
  }

  componentDidMount() {
    this.allBooks()
  }

  allBooks = () => {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))
      })
  }

  searchBooks = (query) => {
    if (query) {
      BooksAPI.search(query)
        .then((result) => {
          this.updateSearchedResult(result)
          if (result.error !== 'empty query') {
            this.setState({filteredBooks: result})
          } else {
            this.setState({filteredBooks: []})
          }
        })
    } else {
      this.setState({filteredBooks: []})
    }
  }

  
  changeShelf = (e, filteredBook) => {
    const books = this.state.books;
    const shelf = e.target.value;
    console.log('shelf; ', shelf)
    filteredBook.shelf = e.target.value;
    this.setState({
      books
  });
  BooksAPI.update(filteredBook, shelf)
      .then(() => {
        this.setState(state => ({
          books: state.books
            .filter(book => book.id !== filteredBook.id)
            .concat([filteredBook])
        }));
    });
  };

  //is called when a shelf of the book is changed
  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(updated => (BooksAPI.getAll().then((books) => {
        this.setState({allBooks: books})
        this.updateSearchedResult(this.state.filteredBooks)
      })))
  }

  // update state of the book on both pages
  updateSearchedResult = (values) => {
    for (let value of values) {
      for (let book of this.state.allBooks) {
        if (value.id === book.id) {
          value.shelf = book.shelf
        }
      }
    }
    this.setState({
      filteredBooks: values
    })
  }

  render() {
    console.log('books', this.state.books)
    console.log('change', this.changeShelf)
    console.log('search', this.state.showSearchPage)

    return (
      <div className="app">
        {this.state.showSearchPage===true ?
          <SearchBooks
            filteredBooks={this.state.filteredBooks}
            updateOption={(book, shelf) => this.updateShelf(book, shelf)}
            showSearchPage={this.state.showSearchPage}
          />
         : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
             <Dashboard 
                books={this.state.books}
                changeShelf={this.changeShelf}
                search={this.state.showSearchPage}
              />
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>
                Add a book
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
