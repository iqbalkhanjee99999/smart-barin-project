import React from 'react';
import Tilt from 'react-tilt'
import image from './brain.png'
import './Logo.css';

const Logo = () =>{
	return (
		<div style={{margin:'0'}} className='h1'>
			<Tilt className="Tilt shadow-2 br2 ma4" options={{ max : 50 }} style={{ height: 150, width: 150 }} >
			 	<div className="Tilt-inner pa2"><img src={image} alt='logo'/> </div>
			</Tilt>
		</div>
	)
}

export default Logo;