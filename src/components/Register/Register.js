import React from 'react';

class Register extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			name: 		'',
			email: 		'',
			password: 	'',
			error: 		''
		}
	}


	onChangeName = (event) => {
		this.setState({name:event.target.value})
	}

	onChangeEmail = (event) => {
		this.setState({email:event.target.value})
	}

	onChangePassword = (event) => {
		this.setState({password:event.target.value})
	}

	onRegister = () => {
		fetch('https://gentle-hollows-68427.herokuapp.com/register ',{
			method:'post',
			headers: {'Content-Type': 'application/json'},
			body:JSON.stringify({
				name: this.state.name,
				email:this.state.email,
				password:this.state.password
			})
		})
		.then(response => response.json())
		.then(user => {
			if(!user.id){
				this.setState({error: user})
			}else{
				this.props.loadUser(user)
				this.props.changeRoute('home')
			}
		})
		.catch('unaable to register user')
	}

	render(){

		return (
		<article className="shadow-5 center mw6 ba b--black-20 mv4 br2 code">
		   	<main className="pa4 black-80 white">
			  <div className="measure">
			    <fieldset id="sign_up" className="ba b--transparent tc">
			      <legend className="f2 fw6 ">Register</legend>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
			        <input 
			        	className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        	type="name" 
			        	name="name"  
			        	id="name"
			        	onChange={this.onChangeName} 
			        	/>
			      </div>
			       <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
			        <input 
			        	className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        	type="email" 
			        	name="email-address"  
			        	id="email-address"
			        	onChange={this.onChangeEmail}
			         />
			      </div>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
			        <input 
			        	className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        	type="password" 
			        	name="password"  
			        	id="password" 
			        	onChange={this.onChangePassword}
			        />
			      </div>
			      <p className="f6 link dim black db white pointer orange">{ this.state.error}</p>
			    </fieldset>
			    <div className="tc">
			      <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer dib green" type="submit" value="Register" 
			      onClick={this.onRegister }
			      />
			    </div>
			  </div>
			</main>
			</article>
		)
	}
	
}

export default Register;;