// import React, {useEffect, useState} from 'react';
import { Link, useParams } from "react-router-dom";
import backGroundImg from "/Users/supreeth_mudduchetty/workspace/SE_Project/Click-n-Split/frontend/src/Pages/homepage/bill.jpg";
//correct path needs to be put above
// import {useHistory, useLocation} from "react-router";

// function Upload(props) {
//     const [selectedFile, setSelectedFile] = useState(null)
//
//     const onFileChange = (event) => {
//         setSelectedFile(event.target.files[0])
//     };
//
//
//     const onFileUpload = () => {
//         const formData = new FormData();
//
//         formData.append(
//             "image",
//             selectedFile,
//             selectedFile.name
//         );
//
//         console.log(selectedFile);
//
//         fetch("https://e771-2601-1c0-5280-e430-91ba-e420-325e-316e.ngrok.io/clicknsplit/api/upload-receipt", {
//             method: "POST",
//             body: formData,
//         })
//             .then((response) => {
//                 console.log("Request successful", response);
//             })
//             .catch((error) => {
//                 console.log("error message", error);
//             });
//     };
//     const fileData = () => {
//         if (selectedFile) {
//             return (
//                 <div>
//                     <h2>File Details:</h2>
//
//                     <p>File Name: {selectedFile.name}</p>
//
//                     <p>File Type: {selectedFile.type}</p>
//
//                     <p>
//                         Last Modified:{" "}
//                         {selectedFile.lastModifiedDate.toDateString()}
//                     </p>
//                 </div>
//             );
//         } else {
//             return (
//                 <div>
//                     <br/>
//                     <h4>Choose before Pressing the Upload button</h4>
//                 </div>
//             );
//         }
//     };
//
//     return (
//         <div>
//             <h3>Upload the picture of the bill</h3>
//             <div>
//                 <input type="file" onChange={onFileChange}/>
//
//
//             </div>
//             {fileData()}
//         </div>
//     );
// }

// export default Upload;
import React, { Component } from "react";

class Upload extends Component {
  state = {
    selectedFile: null,
    loaded: false,
  };

  onFileChange = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  onFileUpload = () => {
    const formData = new FormData();

    formData.append(
      "image",
      this.state.selectedFile,
      this.state.selectedFile.name
    );

    console.log(this.state.selectedFile);
    let apiEndpoint = "/clicknsplit/api/upload-receipt";
    let url = "http://localhost:3001";
    fetch(url + apiEndpoint, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        // console.log("Request successful", response.json());
        return response.json();
      })
      .then((res) => {
        console.log(res);
        localStorage.setItem("tableData", JSON.stringify(res));
        this.setState({ loaded: true });
      })
      .catch((error) => {
        console.log("error message", error);
      });
  };

  fileData = () => {
    if (this.state.selectedFile) {
      return (
        <div className="container">
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
      <section className="text-center">
        <div
          className="p-5 bg-image img-fluid"
          style={{
            backgroundImage: `url(${backGroundImg})`,
            height: "500px",
          }}></div>
        <div
          className="card mx-4 mx-md-5 shadow-5-strong"
          style={{
            marginTop: "-400px",
            background: "hsla(0, 0%, 100%, 0.8)",
            backdropFilter: "blur(30px)",
          }}>
          <div className="card-body py-5 px-md-5">
            <div class="row d-flex justify-content-center">
              <header className="row">
                <h1 className="App">Upload the picture of the bill</h1>
              </header>

              <main className="row">
                <div className="col mb-3">
                  <input
                    type="file"
                    className="btn btn-info btn-sml"
                    onChange={this.onFileChange}
                  />
                </div>
                <div className="col">
                  <button
                    className="btn btn-info btn-sml"
                    onClick={this.onFileUpload}>
                    Upload!
                  </button>
                </div>
                {this.fileData()}
              </main>
              {this.state.loaded && (
                <Link to={"review"}>
                  <button className="btn btn-info btn-sml">Done</button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Upload;
