import React from 'react';
import Au from '../../hoc/Au';
import classes from './Modal.css';
import Backdrop from '../../containers/Backdrop/Backdrop';


const modal = (props) => (
	<Au>	
	<Backdrop show = {props.show} modalClosed={props.closeHandler}/>
	<div className={classes.Modal}
	style={{transform : props.show ? 'translateY(0)' : 'translateY(-100vh)',
	opacity :props.show ?  '1' :'0' 
	 }}>
	{props.children}
	</div>
	</Au>

);

export default modal;