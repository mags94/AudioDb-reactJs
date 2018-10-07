import React from 'react';
import Au from '../../hoc/Au';
import classes from './ArtistList.css';
import { withRouter,nav,Link  } from "react-router-dom";



class ArtistList extends React.Component{
	

render(){
	const artist = this.props.artistDetail
	.map(key=>{
		return(
			
			<Au key={key.name}>
			<div className={classes.ArtistContainer}>
			<img className={classes.Image} src={key.logo} alt="ArtistImage" width="120px" height="100px"/>
			<span className={classes.ArtistList}>{key.name} </span>
			</div>		
			<nav>
			<li className={classes.AnchorstyleAlbum}>
			<Link to={{ pathname: '/albumList', state: {logo : key.logo ,artistName: key.name,followers :key.followers } }}>View Albums</Link>
			</li>
			</nav>
			</Au>		

			);


});

return(
	this.props.show ? <Au>{artist}</Au>	: <Au><h4> No Results Found</h4></Au>

	);
}

};



export default withRouter(ArtistList);