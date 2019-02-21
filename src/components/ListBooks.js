import React, { Component } from 'react'
import Book from './Book'


class ListBooks extends Component {

    render(){
        const { books, changeShelf } = this.props

         const shelfTypes = [
            { type: 'currentlyReading', title: 'Currently Reading' },
            { type: 'wantToRead', title: 'Want to Read' },
            { type: 'read', title: 'Read' }
        ];

        console.log('props listBooks', books)

        // const shelfBooks = books.filter(book => book.shelf === shelf.type)


        return(
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
            {
                shelfTypes.map((shelf, index) => {
                    const shelfBooks = books.filter( book => book.shelf === shelf.type)

                    console.log('shelf Pai: ', shelfBooks.map(book => book.title))

                    return(
                        <div className="bookshelf" key={index}>
                             <h2 className="bookshelf-title">{shelf.title}</h2>
                             <div className="bookshelf-books">
                                <ol className="books-grid">
                                     <Book
                                        books={shelfBooks}
                                        changeShelf={this.changeShelf} 
                                    />
                                </ol>

                             </div>
                        </div>
                    )

            })}

            </div>
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div>
          </div>
        )
    }
}

export default ListBooks