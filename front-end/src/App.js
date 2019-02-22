import React, { Component } from 'react';
import { Input } from 'antd';
import 'antd/dist/antd.css';
import './App.css';
var request = require("request");


class App extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  getStreamerAvailability(streamer_name){
      if (streamer_name.length === 0){
          this.setState({'content': null})
      } else {
        var options = { method: 'GET',
        url: 'http://ec2-3-95-152-200.compute-1.amazonaws.com/getUser',
        qs: { streamer: streamer_name },
        headers: 
         { 'Postman-Token': '7fcc1910-0523-4fb1-ac60-98c02da20464',
           'cache-control': 'no-cache' } };

      request(options, function (error, response, body) {
        if (error) throw new Error(error);
        if (body === 'streamer doesnt exsist'){
          this.setState({'content':
                  <div>
                      <p>no streamer</p>
                  </div>
          })
        } else {
          let parsedBody = JSON.parse(body)
          this.setState({'content':
                  <div className='content-container'>
                      <p>{parsedBody.display_name}</p>
                      <img src={parsedBody.logo}/>
                      <p>{parsedBody.name}</p>
                      <p>Is active: {parsedBody.isLive}</p>
                  </div>
          })
        }
        
      }.bind(this));
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
