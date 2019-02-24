import React, { Component } from 'react'



class SearchBooks extends Component {
  
  render(){
    
    const {showSearchPage} = this.props

      console.log('show: ', showSearchPage)

        return(
        <div className="search-books">
            { showSearchPage &&
              <div className="search-books-bar">
                <button
                  className="close-search"
                  onClick={() => this.setState({ showSearchPage: false })}>
                  Close
                </button>
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
                <div> aqui </div>
              </ol>

            </div>
          </div>
        )
    }
}

export default SearchBooks