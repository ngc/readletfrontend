import React, { Component, useState } from 'react';
import Modal from 'react-modal';
import './App.css';
import WritePanel from './components/WritePanel/WritePanel';
import ThemeButton from './components/ThemeButton/ThemeButton';

class App extends Component{

  adjust(color, amount) {
    //This is some stackoverflow code that you can use to convert HEX colours
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
  }

  constructor(props){
    super(props)
    this.state = {
      theme: {'name': 'mint', 'foreground': '#B9D9EB', 'background': '#253746'},
      pageData: {},
      themes: [ 
      {'name': 'mint', 'foreground': '#B9D9EB', 'background': '#253746'}, 
      {'name': 'rasin', 'foreground': '#b88c8d', 'background': '#291F24'}, 
      {'name': 'honey', 'foreground': '#E69F53', 'background': '#A65317'}, 
      {'name': 'prussian', 'foreground': '#a1b4ff', 'background': '#093252'},
      {'name': 'fortress', 'foreground': '#D63E48', 'background': '#154C9E'}, 
      {'name': 'packer', 'foreground': '#BEA6F7', 'background': '#6A3BD9'}, 
      {'name': 'sapphyre', 'foreground': '#59C0F0', 'background': '#1E4D63'}, 
      {'name': 'eastwood', 'foreground': '#8EA0CC', 'background': '#151D30'}, 
      {'name': 'kinetic', 'foreground': '#FEB5AE', 'background': '#A3261A'}, 
      {'name': 'darq', 'foreground': '#D6D6D6', 'background': '#1F1F1F'}, 
      {'name': 'gruvbox', 'foreground': '#d79921', 'background': '#282828'},
      {'name': 'airport', 'foreground': '#E2ECF4', 'background': '#070C0F'},
      {'name': 'dracula', 'foreground': '#a27fd4', 'background': '#282a36'},
      {'name': 'orchid', 'foreground': '#FFD6F5', 'background': '#DC2EB6'},
      {'name': 'cornflower', 'foreground': '#8390FA', 'background': '#1D2F6F'},
      {'name': 'ioggb', 'foreground': '#CD523C', 'background': '#231F20'},
      {'name': 'diode', 'foreground': '#87CA68', 'background': '#1E212B'},
      {'name': 'midnight', 'foreground': '#AEBCEA', 'background': '#18206F'},
      {'name': 'yotsuba', 'foreground': '#bb7771', 'background': '#ffffee'},
      {'name': 'tankobon', 'foreground': '#eef2ff', 'background': '#939ac2'},
      {'name': 'sienna', 'foreground': '#bd716d', 'background': '#3B0D11'},
      {'name': 'platinum', 'foreground': '#E9ECEC', 'background': '#171A21'},
      {'name': 'murdoch', 'foreground': '#4BB3FD', 'background': '#111318'},
      {'name': 'unbleached', 'foreground': '#FFD6C2', 'background': '#2D252A'},
      {'name': 'metric', 'foreground': '#A387FF', 'background': '#4F34A8'},
      {'name': 'victoria', 'foreground': '#FACFC7', 'background': '#D42A08'},
      {'name': 'mosaic', 'foreground': '#81c7fc', 'background': '#350ab9'},
      {'name': 'jet', 'foreground': '#F3F4F6', 'background': '#363537'},
      ],
      modalIsOpen: false,
    };
  }

  componentDidMount() {
    if(window.location.pathname.substr(0, 7) === '/pages/'){
      const pageName = window.location.pathname.substr(7, window.location.pathname.length - 1);

      fetch("http://127.0.0.1:8000/pages/" + pageName).then(response => response.json())
      .then(data => this.setState({ pageData: data }))
    }
  }

  async setModalIsOpen(input){
    this.setState({modalIsOpen: input});
  }

  changeTheme(theme){
    this.setState({'theme': theme});
    this.setModalIsOpen(false);

    document.body.style.backgroundColor = theme.background;

    const scrollThumb = this.adjust(theme.background, 30);
    const scrollTrack = this.adjust(theme.foreground, -30);

    try{

    }catch(err){
    document.getElementsByClassName("viewer")[0].style.setProperty(
      '--scroll-thumb', scrollThumb);
      document.getElementsByClassName("viewer")[0].style.setProperty(
        '--scroll-track', scrollTrack);

    document.getElementsByClassName("viewer")[1].style.setProperty(
      '--scroll-thumb', scrollThumb);
    document.getElementsByClassName("viewer")[1].style.setProperty(
      '--scroll-track', scrollTrack);
    }
  }

  render(){
    const writePanel = <WritePanel theme={this.state.theme}/>

    //Make button row for themes
    const themesButtons = [];
    for(var i = 0; i < Math.ceil(this.state.themes.length / 4); i++){
      var temp = [];
      for(const [index, value] of this.state.themes.slice(i * 4).entries()){
        temp.push(<div className="theme-column"><ThemeButton state={value} onClick={() => this.changeTheme(value)}/></div>)
      }
      themesButtons.push(<div className="theme-row">{temp[0]}{temp[1]}{temp[2]}{temp[3]}</div>);
    }


    if(window.location.pathname.substr(0, 7) === '/pages/'){
      /////////////////////////////////////////
      return (
        <div className="App">
          <Modal style={{
      overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "transparent",
      },
      content: {
        position: 'absolute',
        top: '15%',
        left: '29%',
        right: '29%',
        bottom: '30%',
        border: 'none',
        background: this.adjust(this.state.theme.background, -10),
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '4px',
        outline: 'none',
        padding: 'none',
        borderRadius: 10,
        WebkitBorderRadius: 20,
        MozBorderRadius: 10,
      }
    }}
    isOpen={this.state.modalIsOpen} onRequestClose={() => this.setModalIsOpen(false)}>
            
            <center><span 
            style = {{
              color: this.state.theme.foreground,
              textAlign: "center",
              width: 100,
            }}
            className="modalTitle">themes</span></center>
            {themesButtons}
          </Modal>

          <span 
          style={{
            color: this.state.theme.foreground,
          }}
          className="appTitle">{this.state.pageData.name}</span>
          <p 
          style={{
            color: this.state.theme.foreground,
          }}
        className="appSubtitle">theme: {this.state.theme.name}</p>
        

        <section 
              style={{
                background: this.state.theme.foreground,
              }}
            className="readerFrame viewer" dangerouslySetInnerHTML={{__html: this.state.pageData.content_HTML}}></section>

        
        <div className="footer">
          <span
            style={{
              color: this.state.theme.foreground,
            }}
          >
            <a onClick={() => this.setModalIsOpen(true)}>themes</a> | <a>login</a> | <a>register</a> | <a>markdown guide</a>
          </span>
        </div>
  
        </div>
      );
      ////////////////////

    }

    //return app render
    return (
      <div className="App">
        <Modal style={{
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "transparent",
    },
    content: {
      position: 'absolute',
      top: '15%',
      left: '29%',
      right: '29%',
      bottom: '30%',
      border: 'none',
      background: this.adjust(this.state.theme.background, -10),
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '4px',
      outline: 'none',
      padding: 'none',
      borderRadius: 10,
      WebkitBorderRadius: 20,
      MozBorderRadius: 10,
    }
  }}
  isOpen={this.state.modalIsOpen} onRequestClose={() => this.setModalIsOpen(false)}>
          <p></p>
          <center><span 
          style = {{
            color: this.state.theme.foreground,
            textAlign: "center",
            width: 100,
          }}
          className="modalTitle">themes</span></center>
          {themesButtons}
        </Modal>
        <span 
        style={{
          color: this.state.theme.foreground,
        }}
        className="appTitle">readlet</span>
        <p 
        style={{
          color: this.state.theme.foreground,
        }}
      className="appSubtitle">theme: {this.state.theme.name}</p>
      
      {writePanel}
      
      <div className="footer">
        <span
          style={{
            color: this.state.theme.foreground,
          }}
        >
          <a onClick={() => this.setModalIsOpen(true)}>themes</a> | <a>login</a> | <a>register</a> | <a>markdown guide</a>
        </span>
      </div>

      </div>
    );
  }
}

export default App;
