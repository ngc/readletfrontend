import React, { Component } from 'react';
import './WritePanel.css';
import marked from 'marked';
import {CopyToClipboard} from 'react-copy-to-clipboard';

class WritePanel extends Component{

    getMarkdownText(input) {
        var rawMarkup = marked(input);
        return rawMarkup;
    }

    constructor(props) {
        super(props);
        this.state = {value: '# Hello!\n\nThis is a bit of a sample text.\n\nErase me and write your own!',
                      theme:  props.theme};
        this.handleChange = this.handleChange.bind(this);
      }

      handleChange(event) {
        this.setState({
          value: event.target.value, theme: this.props.theme});
      }

      async shakeCopy() {
        document.getElementById("copy-text").innerHTML = "copied!"
        await new Promise(r => setTimeout(r, 2000));
        document.getElementById("copy-text").innerHTML = "copy as html"
      }
      
      render() {
        if(this.state.theme.name != this.props.theme.name){
          this.setState({theme: this.props.theme});
        }

        return (
          <div align="center" className="writePanel">
          <div className="column">
            <textarea className="writeFrame viewer" 
              style={{
                background: this.state.theme.foreground,
              }}
              maxLength="20000"
            type="text" value={this.state.value} onChange={this.handleChange}/>
          </div>
          <div className="column">       
            <section 
              style={{
                background: this.state.theme.foreground,
              }}
            className="readFrame viewer" dangerouslySetInnerHTML={{__html: this.getMarkdownText(this.state.value)}}></section>
          </div>
          <p className="read-sub">
            <CopyToClipboard text={this.getMarkdownText(this.state.value)}
            onCopy={() => this.shakeCopy()}>
              <span 
              style = {{color: this.state.theme.foreground}}
              id="copy-text"> 
                copy as html
              </span>
            </CopyToClipboard>
            </p>
        </div>
        );
      }
}

export default WritePanel;