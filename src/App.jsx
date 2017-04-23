
import d3 from 'd3';
import React, { Component } from 'react';
import TextDisplay from './components/TextDisplay';
import hist from 'json!../dockerfile.json';

// console.log(githistory);

let i = 0;

class App extends Component {
    state = {text: ''};

    changeText(event) {
	this.setState({text: event.target.value});
    }

    iterate() {
	this.setState(hist[i++]);
	if (i >= hist.length) {
	    i = 0;
	}
    }

    start() {
	this.iterate();
	setInterval(this.iterate.bind(this), 2000);
    }
/*
		<! textarea rows="5" value={this.state.text}
		       onChange={::this.changeText} placeholder="Type here"
		       style={{padding: '.6em',
			       fontSize: '1.2em',
			       margin: '0px auto',
			       width: '80%'}} />
*/

    render() {

	return (
	    <div className="container">
		<h2>Git moving</h2>
		<button onClick={::this.start}>Start!</button>
		<p>{this.state.author}<br/>
		{this.state.date}<br/>
		{this.state.message}<br/>
		{this.state.commit}</p>
		<svg width="100%" height="800">
		    <TextDisplay x="32" y="32" text={this.state.text} />
		</svg>
	    </div>
	);
    }
}

export default App;
