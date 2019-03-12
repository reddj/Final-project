import React, { Component } from 'react'

export default class RestaurantList extends Component {

    state = {
        locations: []
    }

    async componentDidMount () {
        try{
            let locations = await fetch ('http://localhost:9000/locations') 
            console.log(locations)
            let restaurantsJSON = await locations.json()
            this.setState({
                locations: restaurantsJSON
              })
            // await this.props.getMovieData(this.state.locations)
            return locationsJSON
        }
        catch(error){
            console.log(error.stack)
            return error
          }
    }

    render () {
        let returnData = this.state.locations.map(item => {
            return(
                <li>
                    {item.title}
                </li>
            )
        })
        return (
            <ul>
                {returnData}
            </ul>
        )
   
        }
    } 




