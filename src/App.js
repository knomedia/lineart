import React, { Component } from 'react';
import './App.css';
import FileSelect from './FileSelect';
import { convertToDOM, addVectorEffect } from './svgWalker';
import Svg from './Svg';

class App extends Component {

  constructor (props) {
    super(props);
    this.state = {
      original: undefined,
      updated: undefined,
      size: undefined,
    }
  }

  handleSVG (svg) {
    this.setState({
      original: convertToDOM(svg),
      updated: addVectorEffect(svg)
    });
  }

  handleChange (e) {
    this.setState({size: e.target.value});;
  }

  renderSvg () {
    if (!this.state.original) {
      return undefined;
    } else {
      return (
        <div>
          <div>
            <input type='range' min='20' max='600' onChange={this.handleChange.bind(this)}/>
          </div>
          <Svg svg={this.state.updated.documentElement} size={this.state.size} label='updated'/>
          <Svg svg={this.state.original.documentElement} size={this.state.size} label='original' />
          <div className="clear"></div>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>lineart</h2>
        </div>
        <div className="App-intro">
          <FileSelect onSvgLoaded={ this.handleSVG.bind(this) }/>
        </div>
        <div>
          { this.renderSvg() }
        </div>
      </div>
    );
  }
}

export default App;
