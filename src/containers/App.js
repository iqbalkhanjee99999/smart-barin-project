import React, { Component } from 'react';
import Clarifai from 'clarifai';
import Particles from 'react-particles-js';

import Navbar from './../components/Navbar/Navbar';
import Logo from './../components/Logo/Logo';
import Rank from './../components/Rank/Rank';
import SearchField from './../components/SearchField/SearchField';
import FaceRegonition from './../components/FaceRegonition/FaceRegonition';
import SignIn from './../components/SignIn/SignIn';
import Register from './../components/Register/Register';
import './App.css';

const app = new Clarifai.App({
 apiKey: '2a150ff9325f4fe6934be520ad8594a9'
});

 const initialState = {
      input: '',
      imageUrl: '',
      box:{},
      error:'',
      route: 'signIn',
      isSignedIn: false,
      user:{
        id: 0,
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }


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
    this.state =initialState;
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
      .then(response => {
        if(response){

          fetch('http://127.0.0.1:4000/image/'+this.state.user.id,{
            method:'put',
            headers:{'Content-type':'application/json'},
            body:JSON.stringify({
              id:this.state.user.id
            })
          }).then(response => response.json())
          .catch(console.log)
          .then(count => this.setState(Object.assign(this.state.user,{entries:count})))
          .catch(console.log)
        }
        this.detectFace(this.calculateFaceLocation(response))
      })
      .catch(err => this.setState({error: 'Face Not Detected! '}))
  }

  onInputChange = (event) =>{
    this.setState({input:event.target.value})
  }

  changeRoute = (route) => {
    if(route === 'home'){
      this.setState({isSignedIn: true})
    }else{
      this.setState(initialState)
    }
    this.setState({route: route});
  }

  loadUser = (data) => {
    this.setState({user:{
      id:data.id,
      name:data.name,
      email:data.email,
      entries:data.entries,
      joined:data.joined,
    }});
  }

  render(){


    const { imageUrl, box, error, route, isSignedIn} = this.state;
    return (
      <div>
       <Particles params={particalsOptions} className='particals'/>
        <Navbar changeRoute={ this.changeRoute } isSignedIn={ isSignedIn }/>
        { route === 'home' ? 
          <div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <SearchField inputChange={ this.onInputChange } buttonSubmit={ this.onButtonSubmit }/>
            <FaceRegonition image={ imageUrl } boxes={ box } error={ error }/>
          </div>
          : 
          (this.state.route === 'register' ? 
            <Register changeRoute={ this.changeRoute } loadUser={this.loadUser}/>
          :
            <SignIn changeRoute={ this.changeRoute } loadUser={this.loadUser}/>
          )
        } 
      </div>
    )
  } 
}

export default App;
