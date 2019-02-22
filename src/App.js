import React from 'react'
import * as BooksAPI from './utils/BooksAPI'
import './App.css'
import Dashboard from './components/Dashboard'

class BooksApp extends React.Component {
  state = {
    showSearchPage: false,
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

  render() {
    console.log('books', this.state.books)
    console.log('change', this.changeShelf)
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button
                className="close-search"
                onClick={() => this.setState({ showSearchPage: false })}
              >
                Close
              </button>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                 <input type="text" placeholder="Search by title or author" />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid" />
            </div>
          </div>
        ) : (
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
