import React from 'react';

class SignIn extends React.Component{

	constructor(props){
		super(props);
		this.state= {
			userEmail: '',
			userPassword: '',
			error: ''
		}
	}

	onPasswordChange = (event) => {
		this.setState({userPassword: event.target.value})
	}

	onEmailChange = (event) => {
		this.setState({userEmail: event.target.value})
	}

	onSubmitSignIn = () => {
		fetch('http://127.0.0.1:4000/signin',{
			method:'post',
			headers:{'Content-Type':'application/json'},
			body:JSON.stringify({
				email:this.state.userEmail,
				password:this.state.userPassword
			})
		})
			.then(response => response.json())
			.then(user => {
				if(user.id){
					console.log(user)
					this.props.loadUser(user)
					this.props.changeRoute('home')
				}else{
					this.setState({error:'Incorrect Username or Password '})
				}
			})

		
	}

	render(){
		return (
			<article className="shadow-5 center mw6 ba b--black-20 mv4 br2 code">
			   	<main className="pa4 black-80 white">
				  <div className="measure">
				    <fieldset id="sign_up" className="ba b--transparent tc">
				      <legend className="f2 fw6 ">Sign In</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        	type="email" 
				        	name="email-address"  
				        	id="email-address" 
				        	onChange={this.onEmailChange}
				        	/>
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        type="password" 
				        name="password"  
				        id="password" 
				        onChange={this.onPasswordChange}
				        />
				      </div>
				    </fieldset>
				    <div className="tc">
				      <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer dib green" 
				      type="submit" 
				      value="Sign in" 
				      onClick={this.onSubmitSignIn }
				      />
				    </div>
				    <div className="lh-copy mt3 tc">
				      <p className="f6 link dim black db white pointer" onClick={() => this.props.changeRoute('register')} >Register</p>
				       <p className="f6 link dim black db white pointer orange">{ this.state.error}</p>
				    </div>
				  </div>
				</main>
				</article>
			)
	}
	
}

export default SignIn;;