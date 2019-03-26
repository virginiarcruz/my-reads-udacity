import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Book from './Book'


const shelfTypes = [
    { key: 'currentlyReading', name: 'Currently Reading' },
    { key: 'wantToRead', name: 'Want to Read' },
    { key: 'read', name: 'Read' }
];

class ListBooks extends Component {

    render(){

        const { books, onUpdateShelf } = this.props

        function getBooksForShelf(shelfKey) {
          return books.filter(book => book.shelf === shelfKey);
        }

        return(
                <div className="list-books">
                    <div className="list-books-title">
                        <h1>MyReads</h1>
                    </div>

                    <div className="list-books-content">
                          <div>
                            { shelfTypes.map((shelf) => (
                                <div key={shelf.key} className="bookshelf">
                                    <h2 className="bookshelf-title">{shelf.name}</h2>
                                    
                                    { getBooksForShelf(shelf.key).length === 0 ? (
                                        <div className="bookshelf-books">
                                            <h4>No books in this shelf</h4>
                                        </div>
                                        ) : (
                                        <div className="bookshelf-books">
                                            <ol className="books-grid">
                                                { getBooksForShelf(shelf.key).map((book) => (
                                                    <Book 
                                                        key={book.id}
                                                        book={book}
                                                        updateShelf={onUpdateShelf}
                                                    />
                                                ))}
                                            </ol>
                                        </div> 
                                    )}
                                </div>
                            )) }
                        </div>
                    </div>
                    <div className="open-search">
                        <Link to='/search'>Add a book</Link>
                    </div>
            </div>
        )
    }
}

export default ListBooks