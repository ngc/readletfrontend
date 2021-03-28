import React, { Component } from 'react';
import './WritePanel.css';
import marked from 'marked';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Modal from 'react-modal';

class WritePanel extends Component{

    getMarkdownText(input) {
        var rawMarkup = marked(input);
        return rawMarkup;
    }

    constructor(props) {
        super(props);
        this.state = {value: '# Hello!\n\nThis is a bit of a sample text.\n\nErase me and write your own!\n\n',
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

      //https://jasonwatmore.com/post/2020/02/01/react-fetch-http-post-request-examples
      uploadPage(content){

        if(document.getElementById("upload-text").innerHTML === "uploaded!"){
          return;
        }

        const content_HTML = this.getMarkdownText(content);
        var name = null;
        while(name === null || name === ""){
          name = prompt("Page Name", "");
        }
        
        const POST_body = {
          "name": name,
          "content_HTML": content_HTML,
          "content": content
        };

        // Simple POST request
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(POST_body)
        };
        fetch('http://127.0.0.1:8000/pages/', requestOptions)
            .then(response => response.json())
            .then(data => this.setState({ postId: data.id }));

        document.getElementById("upload-text").innerHTML = "uploaded!"
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



              <span onClick={() => this.uploadPage(this.state.value)} id="upload-text" style = {{
                color: this.state.theme.foreground,
                paddingLeft: "1%",
                }}>
                upload
              </span>

            </p>
        </div>
        );
      }
}

export default WritePanel;