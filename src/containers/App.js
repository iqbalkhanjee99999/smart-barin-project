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
      value:80,
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
      box:{}
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('image');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      topRow: clarifaiFace.top_row * height,
      leftCol : clarifaiFace.left_col * width,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }

  }

  detectFace = (data) => {
    this.setState({box:data});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl:this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => this.detectFace(this.calculateFaceLocation(response)))
      .catch(err => console.log('counld not find face :( '))
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
        <FaceRegonition image={this.state.imageUrl} box={ this.state.box }/>
      </div>
    )
  } 
}

export default App;
