
import * as d3 from "d3";
import * as diff from "diff";
import Letter from './Letter';
import React, { Component } from 'react';
import ReactTransitionGroup from 'react-addons-transition-group';

class Line extends Component {
    state = {
        // the text
        text: '',

        // textWithIds is an array of two-element arrays; character and id
        // e.g. [ ["t", 0], ["h", 1], ["e", 2]]
        // the idea is, d3 will create objects with those Ids on the page.
        // If we give the object a new position, d3 will transition them automatically.
        // So, as much as possible, we try to preserve the old ids! See below.
        textWithIds: [],

        // this is a counter of new chars we have seen. We use it to make new text ids
        lastId: 0
    };

    componentWillReceiveProps(newProps) {
        const newText = newProps.text;

        const oldText = this.state.text;
        const oldTextWithIds = this.state.textWithIds;
        let newLastId = this.state.lastId;

        // Now we calculate the new text with ids
        let hunks = diff.diffChars(oldText, newProps.text);
        /*

        hunks will look like this:
        [ { count: 2, value: 'ab' },
          { count: 1, added: undefined, removed: true, value: 'c' },
          { count: 4, value: 'defg' },
          { count: 2, added: undefined, removed: true, value: 'hi' },
          { count: 1, value: 'j' },
          { count: 3, added: true, removed: undefined, value: 'klm' } ]
         */
        var newTextWithIds = [];
        var oldIndex = 0;
        hunks.forEach((hunk) => {
            hunk.value.split('').forEach((c) => {
                if (hunk.added) {
                    // add chars with new ids
                    newTextWithIds.push([c, newLastId++]);
                } else if (hunk.removed) {
                    // do nothing, but advance through old string
                    oldIndex++;
                } else {
                    // hunk is same as original text; copy, and advance
                    newTextWithIds.push(oldTextWithIds[oldIndex++]);
                }
            })
        });

        this.setState({text: newProps.text,
                       textWithIds: newTextWithIds,
                       lastId: newLastId});
    }

    render() {
        let { x, y } = this.props,
            transition = d3.transition()
                           .duration(750)
                           .ease(d3.easeCubicInOut);

        return (
            <g transform={`translate(${x}, ${y})`}>
                <ReactTransitionGroup component="g">
                    {this.state.textWithIds.map(([l, id], i) =>
                        <Letter letter={l} i={i} key={id} transition={transition} />
                     )}
                </ReactTransitionGroup>
            </g>
        );
    }
}

export default Line;
