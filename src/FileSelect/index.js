import React, { Component } from 'react';

class FileSelect extends Component {

  handleFileSelected (e) {
    let file = e.target.files[0];
    if (!file) {
      return;
    }
    let reader = new FileReader();
    reader.onload = (event) => {
      this.props.onSvgLoaded(event.target.result)
    }
    reader.readAsText(file);
  }

  render() {
    return (
      <div className="FileSelect">
        <input type='file' onChange={ this.handleFileSelected.bind(this) } />
      </div>
    );
  }
}

export default FileSelect;
