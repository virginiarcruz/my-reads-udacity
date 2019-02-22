import React, { Component } from 'react'


class SearchBooks extends Component {
    render(){
        const { searchBook } = this.props
        return(
            <div className="open-search">
              <button onClick={() => this.setState({ searchBook: true })}>Add a book</button>
            </div>
        )
    }
}

export default SearchBooks