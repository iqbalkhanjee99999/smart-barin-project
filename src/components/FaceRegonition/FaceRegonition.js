import React from 'react';
import './FaceRecognition.css'

const FaceRegonition = ({ image,boxes,error }) =>{

	let faceBoxes = '';

	if(boxes && boxes.length > 0){
		 faceBoxes = boxes.map(box => {
			return(
				 <div className='bounding-box' style={{top: box.topRow , bottom: box.bottomRow ,left: box.leftCol - 10,right: box.rightCol - 10,}}>
				</div>
			)
		})
	}

	return (
		<div className='center ma'>
		<div className='absolute ma2'>
			{image !== '' ? 
			<img id='image' src={ image } alt='inputFaces' width='500' height='auto' /> : <p className="white">PLEASE UPLOAD IMAGE</p>}	
			{error !== '' ?  <p className="white tc f5">{ error }</p> : faceBoxes}		
		</div>
		
		</div>
		)
}
export default FaceRegonition;
