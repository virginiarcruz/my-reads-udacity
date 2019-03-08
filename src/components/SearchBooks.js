import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Book from './Book'
class SearchBooks extends Component {
  
  render(){
    console.log('filter', filteredBooks)
    
    const {filteredBooks, searchBooks, updateOption, showSearchPage} = this.props

      console.log('show: ', showSearchPage)

        return(
        <div className="search-books">
            { showSearchPage &&
              <div className="search-books-bar">
               <Link to='/' className='close-search'>Close</Link>
            
                  <div className="search-books-input-wrapper">
                    <input 
                      type="text"
                      placeholder="Search by title or author"
                      onChange={this.handleChange}/>
                  </div>
              </div>
              }
            <div className="search-books-results">
              <ol className="books-grid">
                  {/* {filteredBooks.map(book => (<Book book={book} key={book.id} updateOption={updateOption}/>))} */}
              </ol>

            </div>
          </div>
        )
    }
}

export default SearchBooks