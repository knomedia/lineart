import React, { Component } from 'react';
import './style.css';

class Svg extends Component {

  addSvg (svg, size) {
    if (this.svg) {
      this.node.removeChild(this.svg);
    }
    this.svg = this.node.appendChild(svg);
    if (size) {
      this.svg.style.width = size;
      this.svg.style.height = size;
    }
  }
  componentDidMount () {
    if (this.props.svg && !this.svg) {
      this.addSvg(this.props.svg, this.props.size);
      //this.svg = this.node.appendChild(this.props.svg);
      //if (this.props.size) {
      //  this.svg.style.width = this.props.size;
      //  this.svg.style.height = this.props.size;
      //}
    }
  }

  componentWillUnmount () {
    this.node.removeChild(this.svg);
  }

  shouldComponentUpdate (nextProps) {
    if (this.svg) {
      if (this.props.svg !== nextProps.svg) {
        if (!!nextProps.svg) {
          this.addSvg(nextProps.svg, this.props.size);
          //this.node.removeChild(this.svg);
          //this.svg = this.node.appendChild(nextProps.svg);
        }
      }
      if (this.props.size !== nextProps.size) {
        this.svg.style.width = nextProps.size;
        this.svg.style.height = nextProps.size;
      }
    }
    return false
  }

  mountSvg () {
  
  }

  render () {
    return (
      <div className="Svg" >
        <div ref={(n) => this.node = n}>
          <div className="Svg__Label">
            {this.props.label}
          </div>
        </div>
      </div>
    )
  }

}

export default Svg;
