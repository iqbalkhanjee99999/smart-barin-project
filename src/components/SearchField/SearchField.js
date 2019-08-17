import React from 'react';
import './SearchField.css';

const SearchField = ({ inputChange, buttonSubmit }) =>{
	return(
		<div className='tc'>
			<p className='white f3 code'>{'Enter Image URL to find face in image. Enjoy the experience'}</p>
			<div className='center '>
				<div className='w-50 center pa4 br3 shadow-5 search'>
				<input 
				type='text' 
				className="w-70 f4 pa2 center" 
				onChange={ inputChange}
				/>

				<button 
				className="w-30 grow ph3 f4 pv2 dib code"
				onClick={ buttonSubmit }>
					{'Find Face'}
				</button>

				</div>
			</div>
		</div>
		)
}
export default SearchField;