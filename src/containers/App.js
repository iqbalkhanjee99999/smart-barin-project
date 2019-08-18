import React, { Component } from 'react';
import Clarifai from 'clarifai';
import Particles from 'react-particles-js';

import Navbar from './../components/Navbar/Navbar';
import Logo from './../components/Logo/Logo';
import Rank from './../components/Rank/Rank';
import SearchField from './../components/SearchField/SearchField';
import FaceRegonition from './../components/FaceRegonition/FaceRegonition';
import './App.css';

const app = new Clarifai.App({
 apiKey: '2a150ff9325f4fe6934be520ad8594a9'
});

const particalsOptions = {
  particles: {
    number:{
      value:100,
      density:{
        enable:true,
        value_area:800,
      }
    }
  }
}

class App extends Component {

  constructor() {
    super();
    this.state ={
      input: '',
      imageUrl: '',
      box:{},
      error:''
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions.map(face => {
      return face.region_info.bounding_box;
    })

    const image = document.getElementById('image');
    const width = Number(image.width);
    const height = Number(image.height);

    const faces = clarifaiFace.map(face => {
         return {
            topRow: face.top_row * height,
            leftCol : face.left_col * width,
            rightCol: width - (face.right_col * width),
            bottomRow: height - (face.bottom_row * height),
          }
      })

    return faces;

  }

  detectFace = (data) => {
    this.setState({box:data});
  }

  onButtonSubmit = () => {
    this.setState({error: ''})
    this.setState({imageUrl:this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => this.detectFace(this.calculateFaceLocation(response)))
      .catch(err => this.setState({error: 'Face Not Detected! '}))
  }

  onInputChange = (event) =>{
    this.setState({input:event.target.value})
  }

  render(){
    return (
      <div>
       <Particles params={particalsOptions} className='particals'/>
        <Navbar />
        <Logo />
        <Rank />
        <SearchField inputChange={ this.onInputChange } buttonSubmit={ this.onButtonSubmit }/>
        <FaceRegonition image={this.state.imageUrl} boxes={ this.state.box } error={this.state.error}/>
      </div>
    )
  } 
}

export default App;
