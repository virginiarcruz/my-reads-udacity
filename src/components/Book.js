import React from 'react'

const Book = (props) => {
    
    const { book, updateShelf } = props

    return (
        <li>
            <div key={book.id} className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ 
                            width: 128, 
                            height: 193, 
                            backgroundImage: (book.imageLinks) ? `url(${book.imageLinks.thumbnail})`
                            : `url(${'icons/no_image_available'})`}}>
                        </div>
                        <div className="book-shelf-changer"> 
                            <select value={book.shelf ? book.shelf : 'none'} 
                                onChange={(e) => updateShelf(book, e.target.value)}>
                                <option disabled >Move to...</option>
                                <option value="currentlyReading" >Currently Reading</option>
                                <option value="wantToRead" >Want to Read</option>
                                <option value="read" >Read</option>
                                <option value="none" >None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors.map((author) => author)}
                    </div>
            </div>
        </li>
    )
}

export default Book