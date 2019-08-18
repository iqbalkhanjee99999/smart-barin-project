import React from 'react';

const SignIn = ({ changeRoute }) => {
	return (
		<article className="shadow-5 center mw6 ba b--black-20 mv4 br2 code">
		   	<main className="pa4 black-80 white">
			  <div className="measure">
			    <fieldset id="sign_up" className="ba b--transparent tc">
			      <legend className="f2 fw6 ">Sign In</legend>
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
			      <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer dib green" type="submit" value="Sign in" 
			      onClick={() => changeRoute('home')}
			      />
			    </div>
			    <div className="lh-copy mt3 tc">
			      <p className="f6 link dim black db white pointer" onClick={() => changeRoute('register')} >Register</p>
			    </div>
			  </div>
			</main>
			</article>
	)
}

export default SignIn;;