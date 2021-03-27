import React, { Component } from 'react';
import './ThemeButton.css'
import PropTypes from "prop-types";

class ThemeButton extends Component{

    static propTypes = {
        onClick: PropTypes.func,
        children: PropTypes.node,
        variant: PropTypes.string,
        className: PropTypes.string,
        label: PropTypes.string,
        size: PropTypes.string,
        disabledClassName: PropTypes.string,
        disabled: PropTypes.bool
      };
    
      static defaultProps = {
        className: "",
        label: "",
        size: "",
        variant: "basic",
        disabled: false,
        disabledClassName: ""
      };

    handleButtonClick = event => {
    const { onClick, disabled } = this.props;

    if (disabled) return;

    onClick &&
        onClick({
        event
        });
    };

    constructor(props) {
        super(props);
        this.state = props.state;
      }
    
      render() {
        return (
        <div>
           <button
           onClick={(e) => this.handleButtonClick()}
           style= {{
               backgroundColor: this.state.background,
           }} 
           className="button"><a
           style={{
               color: this.state.foreground,
           }}
           >{this.state.name}</a></button> 
        </div>
        );
      }
}

export default ThemeButton;