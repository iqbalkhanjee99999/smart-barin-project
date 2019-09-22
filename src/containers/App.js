import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navbar from './../components/Navbar/Navbar';
import Logo from './../components/Logo/Logo';
import Rank from './../components/Rank/Rank';
import SearchField from './../components/SearchField/SearchField';
import FaceRegonition from './../components/FaceRegonition/FaceRegonition';
import SignIn from './../components/SignIn/SignIn';
import Register from './../components/Register/Register';
import './App.css';

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
    console.log(data.outputs[0].data.regions)
    const clarifaiFace = data.outputs[0].data.regions.map(face => {
      return face.region_info.bounding_box;
    })

    const image = document.getElementById('image');
    const width = Number(image.width);
    const height = Number(image.height);

    const faces = clarifaiFace.map((face,i) => {
         return {
            topRow: face.top_row * height,
            leftCol : face.left_col * width,
            rightCol: width - (face.right_col * width),
            bottomRow: height - (face.bottom_row * height),
            key: i
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
      fetch('https://gentle-hollows-68427.herokuapp.com/handleAPICall',{
            method:'post',
            headers:{'Content-type':'application/json'},
            body:JSON.stringify({
              input: this.state.input
            })
          })
      .then(response => response.json())
      .then(response => {
        if(response){
          fetch('https://gentle-hollows-68427.herokuapp.com/image/'+this.state.user.id,{
            method:'put',
            headers:{'Content-type':'application/json'},
            body:JSON.stringify({
              id:this.state.user.id
            })
          })
          .then(response => response.json())
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
