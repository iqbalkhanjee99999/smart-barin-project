import React from 'react';

const Rank = ({ name, entries }) =>{
	return (
		<div className='tc  h4'>
			<p className='code f3 h1 green'>{`${name} Your Current Entries Count Is`}</p>
			<p className='code f2 b h4 green'>{`${entries}`}</p>
		</div>
		)
}
export default Rank;