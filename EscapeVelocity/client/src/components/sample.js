import React, { Component } from 'react'
import axios from 'axios'
export default class sample extends Component {
    render() {

        axios.get('/api/optionchain').then(response => console.log(response))
        return (
            <div>
                

            </div>
        )
    }
}
