import "./App.css";
import React, { Component } from "react";

class App extends Component {
  state = {
    selectedFile: null,
  };

  onFileChange = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  onFileUpload = () => {
    const formData = new FormData();

    formData.append(
      "myFile",
      this.state.selectedFile,
      this.state.selectedFile.name
    );

    console.log(this.state.selectedFile);
    let url = "api/uploadfile";
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        console.log("Request successful", response);
      })
      .catch((error) => {
        console.log("error message", error);
      });
  };

  fileData = () => {
    if (this.state.selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>

          <p>File Name: {this.state.selectedFile.name}</p>

          <p>File Type: {this.state.selectedFile.type}</p>

          <p>
            Last Modified:{" "}
            {this.state.selectedFile.lastModifiedDate.toDateString()}
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };

  render() {
    return (
      <div className="main_div">
        <header className="App-header">
          <h1 className="App">Click-n-Split</h1>
        </header>
        <main className="App">
          <h3>Upload the picture of the bill</h3>
          <div>
            <input type="file" onChange={this.onFileChange} />
            <button onClick={this.onFileUpload}>Upload!</button>
          </div>
          {this.fileData()}
        </main>
      </div>
    );
  }
}

export default App;
