import React, { Component } from 'react'
import ListBooks from './ListBooks'
import FilterBooks from './FilterBooks'
import SearchBooks from './SearchBooks'


class Dashboard extends Component {
    render(){
            const {books} = this.props

        return (
            <div>
                <ListBooks 
                    books={books}
                    changeShelf={this.props.changeShelf}
                />
                <FilterBooks />
                <SearchBooks 
                    books={books}/>
            </div>
        )
    }
}

export default Dashboard