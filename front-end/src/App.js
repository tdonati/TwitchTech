import React, { Component } from 'react';
import { Input } from 'antd';
import 'antd/dist/antd.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  getStreamerAvailability(streamer_name){
      let x = {
          "_id": "202030",
          "display_name": "shroud",
          "logo": "https://ichef.bbci.co.uk/news/660/cpsprodpb/37B5/production/_89716241_thinkstockphotos-523060154.jpg",
          "name": "shroud",
          "isLive": true
      };
      if (streamer_name.length === 0){
          this.setState({'content': null})
      } else {
          this.setState({'content':
                  <div>
                      <p>{x.display_name}</p>
                      <img src={x.logo}/>
                      <p>{x.name}</p>
                      <p>Is active{x.isLive}</p>
                  </div>
          })
      }
  }

  render() {
    return (
      <div className="App">
        <Input onChange={event => this.getStreamerAvailability(event.target.value)} />
          {this.state.content}
      </div>
    );
  }
}

export default App;
