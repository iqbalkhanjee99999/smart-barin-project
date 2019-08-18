import React from 'react';

const Register = ({ changeRoute }) => {
	return (
		<article className="shadow-5 center mw6 ba b--black-20 mv4 br2 code">
		   	<main className="pa4 black-80 white">
			  <div className="measure">
			    <fieldset id="sign_up" className="ba b--transparent tc">
			      <legend className="f2 fw6 ">Register</legend>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
			        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="name" name="name"  id="name" />
			      </div>
			       <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
			        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
			      </div>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
			        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
			      </div>
			    </fieldset>
			    <div className="tc">
			      <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer dib green" type="submit" value="Register" 
			      onClick={() => changeRoute('home')}
			      />
			    </div>
			  </div>
			</main>
			</article>
	)
}

export default Register;;