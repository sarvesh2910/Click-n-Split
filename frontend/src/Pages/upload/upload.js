// import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
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
        loaded:false
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
        let url = "https://e771-2601-1c0-5280-e430-91ba-e420-325e-316e.ngrok.io";
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
                localStorage.setItem('tableData',JSON.stringify(res))
                this.setState({loaded:true})
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
                {
                    this.state.loaded && <Link to={'review'}>
                        Done
                    </Link>
                }
            </div>
        );
    }
}

export default Upload;