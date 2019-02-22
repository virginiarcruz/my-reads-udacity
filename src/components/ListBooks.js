import React, { Component } from 'react'
import Book from './Book'
import SearchBooks from './SearchBooks'


class ListBooks extends Component {

    render(){

        const { books, search } = this.props
        const shelfTypes = [
            { type: 'currentlyReading', title: 'Currently Reading' },
            { type: 'wantToRead', title: 'Want to Read' },
            { type: 'read', title: 'Read' }
        ];

        return(
          <div>
            <div className="list-books-content">
            { shelfTypes.map((shelf, index) => {
                const shelfBooks = books.filter( book => book.shelf === shelf.type)
                    return(
                        <div className="bookshelf" key={index}>
                             <h2 className="bookshelf-title">{shelf.title}</h2>
                             <div className="bookshelf-books">
                                <ol className="books-grid">
                                     <Book
                                        books={shelfBooks}
                                        changeShelf={this.props.changeShelf}
                                    />
                                </ol>
                             </div>
                        </div>
                    )
            })}
            </div>
            <SearchBooks
                searchBook={search} 
            />
          </div>
        )
    }
}

export default ListBooks