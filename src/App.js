import './App.css';
import React from 'react';
import * as Papa from 'papaparse';
const axios = require('axios').default;

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      image: 'None',
      choice: ''
    };
  }

  onValueChange = (event) => {
    this.setState({choice: event.target.value})
  }

  handleSubmit = (event) => {
    if (this.state.choice == '') {
      event.preventDefault();
    } else {
      let file_name = this.state.image.split('/').reverse()[0];
      let img_id = file_name.substring(0, file_name.indexOf('.'));
      axios({
        url: 'http://localhost:3000/submit',
        method: 'post',
        params:{
          'img_id' : img_id,
          response: this.state.choice 
        }
        ,headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
      })
      .then( (response) => {
        console.log(response);
      })
      .catch(function(err){
        console.log(err);
      });
    }
  };

  componentDidMount() {
    axios.get('http://localhost:3000/')
    .then( (response) => {
      this.setState({image: response.data});
    })
    .catch(function(err){
      console.log(err)
    });
  }
  render() {
    console.log(this.state.image);
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Evaluating referring expression
          </p>
        </header>
        <img src={this.state.image} />
        <form onSubmit={this.handleSubmit}>
        <label>
          <input type="radio" name="name" checked={this.state.choice=='0'} value="0" onChange={this.onValueChange}/>
          0
        </label><br/>
        <label>
          <input type="radio" name="name" checked={this.state.choice=='1'} value="1" onChange={this.onValueChange}/>
          1
        </label><br/>
        <label>
          <input type="radio" name="name" checked={this.state.choice=='2'} value="2" onChange={this.onValueChange}/>
          2
        </label><br/>
        <label>
          <input type="radio" name="name" checked={this.state.choice=='3'} value="3" onChange={this.onValueChange}/>
          3
        </label><br/>
        <label>
          <input type="radio" name="name" checked={this.state.choice=='4'} value="4" onChange={this.onValueChange}/>
          4
        </label><br/>
        <label>
          <input type="radio" name="name" checked={this.state.choice=='5'} value="5" onChange={this.onValueChange}/>
          5
        </label><br/>
        <label>
          <input type="radio" name="name" checked={this.state.choice=='no_match'} value="no_match" onChange={this.onValueChange}/>
          there is nothing in the picture matching this description
        </label><br/>
        <label>
          <input type="radio" name="name" checked={this.state.choice=='underinformative'} value="underinformative" onChange={this.onValueChange}/>
          there are several things that match this description equally well
        </label><br/>
        <label>
          <input type="radio" name="name" checked={this.state.choice=='not_highlighted'} value="not_highlighted" onChange={this.onValueChange}/>
          the thing that matches the description best is not highlighted 
        </label><br/>
        <input type="submit" value="Submit" />
      </form>
      <br/>
      </div>
    )
  }
}



export default App;
