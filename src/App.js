import React, { Component, useState } from 'react';
import Modal from 'react-modal';
import './App.css';
import WritePanel from './components/WritePanel/WritePanel';
import ThemeButton from './components/ThemeButton/ThemeButton';

class App extends Component{

  adjust(color, amount) {
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
  }

  constructor(props){
    super(props)
    this.state = {
      theme: {'name': 'mint', 'foreground': '#B9D9EB', 'background': '#253746'},
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
      {'name': 'cadet', 'foreground': '#888dfc', 'background': '#3B3D66'},
      ],
      modalIsOpen: false,
    };
  }

  async setModalIsOpen(input){
    this.setState({modalIsOpen: input});
    if(input) document.getElementsByClassName("footer")[0].style.display = "none";
    await new Promise(r => setTimeout(r, 1250));
    if(input === false) document.getElementsByClassName("footer")[0].style.display = "block";
  }

  changeTheme(theme){
    this.setState({'theme': theme});
    this.setModalIsOpen(false);

    document.body.style.backgroundColor = theme.background;

    const scrollThumb = this.adjust(theme.background, 30);
    const scrollTrack = this.adjust(theme.foreground, -30);

    document.getElementsByClassName("viewer")[0].style.setProperty(
      '--scroll-thumb', scrollThumb);
      document.getElementsByClassName("viewer")[0].style.setProperty(
        '--scroll-track', scrollTrack);

    document.getElementsByClassName("viewer")[1].style.setProperty(
      '--scroll-thumb', scrollThumb);
    document.getElementsByClassName("viewer")[1].style.setProperty(
      '--scroll-track', scrollTrack);
  }

  render(){
    const writePanel = <WritePanel theme={this.state.theme}/>

    //Make button row for themes
    const themesButtons = [];
    for(var i = 0; i < Math.ceil(this.state.themes.length / 4); i++){
      var temp = [];
      for(const [index, value] of this.state.themes.slice(i * 4).entries()){
        if(value.name != this.state.theme.name){
          temp.push(<div className="theme-column"><ThemeButton state={value} onClick={() => this.changeTheme(value)}/></div>)
        }else{
          temp.push(<a></a>);
        }
      }
      themesButtons.push(<div className="theme-row">{temp[0]}{temp[1]}{temp[2]}{temp[3]}</div>);
    }

    //return app render
    return (
      <div className="App">
        <Modal   style={{
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
      background: this.state.theme.background,
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
