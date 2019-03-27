import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import { debounce } from 'throttle-debounce';
import * as BooksAPI from '../utils/BooksAPI'
import Book from './Book';

class SearchBooks extends Component {

  state = {
    query: '',
    results: []
  }

  updateQuery(query) {
        if(query.length > 0 ) {
          this.setState(() => ({
            results: [],
            query: query
        }))
          this.bookSearch(query)
        }
        else {
          this.clearQuery()
        }
    }

    clearQuery = () => {
      this.setState({
        query: '',
        results: []
      })
    }

    bookSearch = debounce(300, false, query => {
      if (query.length > 0)
        BooksAPI.search(query)
        .then(searchResults => {
          if(query === this.state.query)
            this.setState(currentState => ({ 
            results: this.updateExistingShelves(searchResults)
            }))
          }
        );
    });


     updateExistingShelves(searchResults) {
       if(!searchResults.error) {
        const myBooks = this.props.books
        const addToState = searchResults.filter((result) => myBooks.find(b => {
          if(b.id === result.id) {
            result.shelf = b.shelf
            return result
          }
        }))
        myBooks.concat(addToState)
        return searchResults
       }
     }

  render() {
    const { query, results } = this.state
    const { onUpdateShelf } = this.props

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className='close-search'>Close</Link>
          <div className='search-books-input-wrapper'>
               <input
                type="text"
                placeholder="Search by title, author or subject"
                value={query}
                onChange={(event) => this.updateQuery(event.target.value)}/>
          </div>
        </div>

        <div className="search-books-results">
          <ol className="books-grid">
               { results ? (
                  results.map((book) => (
                    <Book
                      key={book.id}
                      book={book}
                      updateShelf={onUpdateShelf} 
                        />
                    ))
                  ) : (
                   <h4> No results for, "{query}" </h4>
                )}
          </ol>
        </div>

      </div>
    )
  }
}

export default SearchBooks