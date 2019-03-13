import React, { Component } from 'react'
import  Carousel  from  'semantic-ui-carousel-react';

export default class DatabaseContainer extends Component {

    state = {
        restaurants: []
    }

    async componentDidMount () {
        try{
            let restaurants = await fetch ('http://localhost:9000/restaurants') 
            console.log(restaurants)
            let restaurantsJSON = await restaurants.json()
            this.setState({
                restaurants: restaurantsJSON
              })
            // await this.props.getMovieData(this.state.restaurants)
            return restaurantsJSON
        }
        catch(error){
            console.log(error.stack)
            return error
          }
    }

    handleClick = (lat, lng) => {
        this.props.getCoordinates(lat, lng)
    }

    handleClick2 = (url) => {
        console.log(url)
        //window.location.assign(url)
    }

    render () {
        let returnData = this.state.restaurants.map(item => {
            return(
                {render: () => {
                    return (
                    <div class="ui rasied card cardClass">
                    <div class="image">
                        <img className ='imageClass'src={item.image}></img>
                    </div>
                    <div class="content">
                        <a class="header">{item.title}</a>
                        <div class="meta">
                        <span class="date">{item.release_date}</span>
                        </div>
                        <div class="description">
                            {item.description}
                        </div>
                    </div>
                    <div className='ui buttons'>
                    <div className='webButton'>
                    <div class="ui animated fade button locationButton" tabindex="0" onClick={this.handleClick.bind(null, parseFloat(item.latitude), parseFloat(item.longitude))}>
                    <div class="visible content">Where is this located?</div>
                    <div class="hidden content">
                     {item.location_name}
                    </div>
                    </div>
                    </div>
                    <div className='webButton'>
                        <button class="ui icon button" onClick={this.handleClick2.bind(item.website)}>
                        <i aria-hidden="true" class="world icon"></i>
                        </button>
                    </div>
                    </div>
                    </div>
                  
                    )}}
            )
        })
        return (
            <div className="ui one cards">
                <Carousel className='carousel'
				elements  =  { returnData }
				duration  ={10000}
				animation  ='slide left'
				showNextPrev  =  {false}
                showIndicators  ={true}
			/>
            </div>
        )
    }
}