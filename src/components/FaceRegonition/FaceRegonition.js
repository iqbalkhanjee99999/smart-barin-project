import React from 'react';
import './FaceRecognition.css'

const FaceRegonition = ({ image,box }) =>{
	return (
		<div className='center ma'>
		<div className='absolute ma2'>
			{image !== '' ? 
			<img id='image' src={ image } alt='inputFaces' width='500' height='auto' /> : ''}
			<div className='bounding-box' style={{top: box.topRow, bottom: box.bottomRow,'left': box.leftCol,right: box.rightCol}}></div>
		</div>
		
		</div>
		)
}
export default FaceRegonition;
