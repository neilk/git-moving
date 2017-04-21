
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as d3 from "d3";

const ExitColor = 'brown',
      UpdateColor = '#333',
      EnterColor = 'green',
      Font = '14px Inconsolata-g, monospace',
      Vanish = 1e-6; // a float very close to zero, for transition


class Letter extends Component {
    state = {
	y: 0,
	x: 0,
	color: EnterColor,
	fillOpacity: Vanish
    }

    componentWillEnter(callback) {
	let node = d3.select(ReactDOM.findDOMNode(this));

	this.setState({x: this.props.x, y: this.props.y});

	node.transition(this.transition)
	    .style('fill-opacity', 1)
	    .on('end', () => {
		this.setState({x: this.props.x,
			       y: this.props.y,
			       fillOpacity: 1,
			       color: UpdateColor});
		callback()
	    });
    }

    componentWillLeave(callback) {
        let node = d3.select(ReactDOM.findDOMNode(this));

	this.setState({color: ExitColor});

	// .attr('y', 60)

	node.interrupt()
	    .transition(this.transition)
	    .style('fill-opacity', Vanish)
	    .on('end', () => {
		this.setState({fillOpacity: Vanish});
		callback();
	    });
    }

    componentWillReceiveProps(nextProps) {
	if ((this.props.x != nextProps.x) || (this.props.y != nextProps.y)) {
	    let node = d3.select(ReactDOM.findDOMNode(this));

	    this.setState({color: UpdateColor});

	    node.transition(this.transition)
		.attr('x', nextProps.x)
		.attr('y', nextProps.y)
		.on('end', () => this.setState({x: nextProps.x,
						y: nextProps.y}));
	}
    }

    render() {
	return (
	    <text dy=".35em"
		  x={this.state.x}
		  y={this.state.y}
		  style={{fillOpacity: this.state.fillOpacity,
			  fill: this.state.color,
			  font: Font}}>
                {this.props.letter}
            </text>
        );
    }
};

export default Letter;
