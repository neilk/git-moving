
import d3 from 'd3';
import React, { Component } from 'react';
import TextDisplay from './components/TextDisplay';
// import githistory from 'json!./gitlog-with-text.json';

// console.log(githistory);


const hist = [
{
  "commit": "a9894a8194159ad9963565ade75038a7635cfeb2",
  "text": "FROM nginx:1.9.10\nMAINTAINER Bench <dev@bench.co>\n\nCOPY ./target /app/\nCOPY ./.nginx-default.conf /etc/nginx/conf.d/default.conf\n\nEXPOSE 8079\nCMD nginx -g 'daemon off;'\n",
  "author": "Trevor O <trevor@trevoro.net>",
  "date": "Mon Feb 1 21:40:11 2016 -0800",
  "message": "this actually works now"
},
{
  "commit": "b2a7d026b40e7b9787893e863f60f565e22159e1",
  "text": "FROM nginx:latest\nMAINTAINER Bench <dev@bench.co>\n\nCOPY ./target /app/\nCOPY ./.nginx-default.conf /etc/nginx/conf.d/default.conf\n\nEXPOSE 80 8079\nCMD nginx -g 'daemon off;'\n",
  "author": "Trevor O <trevor@trevoro.net>",
  "date": "Mon Feb 1 12:37:20 2016 -0800",
  "message": "we build locally and distribute remotely"
},
{
  "commit": "d24941dd1a05112c157db6313d54a6e7aeab1561",
  "text": "FROM node:0.12.9\nMAINTAINER Bench <dev@bench.co>\n\nRUN echo '{ \"allow_root\": true }' > /root/.bowerrc\nRUN echo 'unsafe-perm = true' > /root/.npmrc\n\nCOPY package.json bower.json /app/\nWORKDIR /app\nRUN npm install --quiet\n\nCOPY . /app\nWORKDIR /app\nRUN npm run build\nRUN chmod +x /app/docker_entry.sh\n\nEXPOSE 80 8079\n\nENV RIND_ENV benchception\n\nENTRYPOINT /app/docker_entry.sh\n\n",
  "author": "Jean-Martin Archer <jm@bench.co>",
  "date": "Fri Jan 29 10:08:42 2016 -0800",
  "message": "adding entry point"
},
{
  "commit": "d24941dd1a05112c157db6313d54a6e7aeab1561",
  "text": "FROM node:0.12.9\nMAINTAINER Bench <dev@bench.co>\n\n# allow us to run npm and bower as root\nRUN echo '{ \"allow_root\": true }' > /root/.bowerrc\nRUN echo 'unsafe-perm = true' > /root/.npmrc\n\n# caches npm install as a layer for faster builds\nCOPY package.json bower.json /app/\nWORKDIR /app\nRUN npm install --quiet\n\nCOPY . /app\nWORKDIR /app\nRUN npm run build\nRUN chmod +x /app/docker_entry.sh\n\nEXPOSE 80 8079\n\nENV RIND_ENV benchception\n\nENTRYPOINT /app/docker_entry.sh\n\n",
  "author": "Jean-Martin Archer <jm@bench.co>",
  "date": "Fri Jan 29 10:08:42 2016 -0800",
  "message": "adding entry point"
},
{
  "commit": "4db505457460085bbf094cc2ac34d0a5495b4ec2",
  "text": "FROM node:0.12.9\nMAINTAINER Bench <dev@bench.co>\n\n# allow us to run npm and bower as root\nRUN echo '{ \"allow_root\": true }' > /root/.bowerrc\nRUN echo 'unsafe-perm = true' > /root/.npmrc\n\n# caches npm install as a layer for faster builds\nCOPY package.json bower.json /app/\nWORKDIR /app\nRUN npm install --quiet\n\nCOPY . /app\nWORKDIR /app\nRUN npm run build\n\nEXPOSE 80\n",
  "author": "Trevor O <trevor@trevoro.net>",
  "date": "Thu Jan 28 17:47:41 2016 -0800",
  "message": "add docker build mechanism fixes 595"
},
{
  "commit": "a5495b4ec20085bbf094cc2ac34d0a5495b4ec2",
  "text": "FROM node:0.12.9\n\n\n\n# Hi this is Neil\nIsn't this cool?\n\n\MAINTAINER Bench <dev@bench.co>\n\n# allow us to run npm and bower as root\nRUN echo '{ \"allow_root\": true }' > /root/.bowerrc\nRUN echo 'unsafe-perm = true' > /root/.npmrc\n\n# caches npm install as a layer for faster builds\nCOPY package.json bower.json /app/\nWORKDIR /app\nRUN npm install --quiet\n\nCOPY . /app\nWORKDIR /app\nRUN npm run build\n\nEXPOSE 80\n",
  "author": "Neil Kandalgaonkar <neilk@brevity.org>",
  "date": "Thu Apr 21 17:47:41 2016 -0800",
  "message": "Hackathon!!"
}];

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
        setInterval(this.iterate.bind(this), 3000);
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
