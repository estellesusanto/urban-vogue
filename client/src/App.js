import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    response: '',
    post: '',
    responseToPost: '',
  };

  // Called immediately after a component is mounted. Setting state here will trigger re-rendering.
  componentDidMount() {
    this.callApi()
      .then(res => this.setState({response: res.express}))
      .catch(err=> console.log(err));
  };

  callApi = async () => {
    // GET request in react is fetch
    // await allows us to wait for the response of an asynchronous request 
    // tests to make sure that the api is available
    const response = await fetch('/api/hello', {
      method: 'GET'
    });

    // calling the GET
    const body = await response.json();
    
    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  // in order for await to work, we need to wrap it in an async function
  handleSubmit = async e => {
    e.preventDefault();
    // await allows us to wait for the response of an asynchronous request 
    //(a Promise to resolve to a value, request to finish)
    // defining the post call
    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({post: this.state.post}),
    });

    // calling the post call
    const body = await response.text();

    // saving the response of the post in a variable that
    // was initialized in the state
    this.setState({responseToPost: body})
  };

  // The only method you MUST define in a React.Component
  render = () => {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <p>
          {this.state.response}
        </p>
        <form onSubmit={this.handleSubmit}>
          <p>
            <strong>Post to Server: </strong>
          </p>
          <input
            type="text"
            value={this.state.post}
            onChange={e => this.setState({post: e.target.value})}/>
          <button type="submit">Submit</button>
        </form>
        <p>
          {this.state.responseToPost}
        </p>
      </div>
    );
  }
}

export default App;
