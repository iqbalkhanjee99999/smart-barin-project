import React from 'react';
import './Navbar.css';

const Navbar = ({ changeRoute,isSignedIn }) =>{

		if(isSignedIn){
			return (
				<div className='navbar'>
					<p className=" f4 underline pointer blur link dim white code" onClick={() => changeRoute('signIn') }>{'Signout'}</p>
				</div>
			)
		}else{
			return (
				<div className='navbar' style={{display:'flex',justifyContent:'flex-end'}}>
					<p className=" f4 underline pointer blur link dim white code mr3" onClick={() => changeRoute('signIn')}>{'SignIn'}</p> 
					<p className=" f4 underline pointer blur link dim white code" onClick={() => changeRoute('register')}>{'Register'}</p>
				</div>
			)
		}
}
export default Navbar;