import React,{Component} from 'react';
import Au from '../../hoc/Au';
import Modal from '../../containers/Modal/Modal';
import { withRouter } from "react-router-dom";
import axios from 'axios';
import classes from './TrackList.css';


class TrackList extends Component{

	state ={
		yearReleased: this.props.location.state.yearReleased,	
		album: this.props.location.state.albumName,
		albumIndct:false,
		modalIndct : this.props.location.state.show,
		albumId : '',
		tracksData : []
	};
	
closedHandler=()=>{
	this.setState({
		modalIndct : false
	});

}


componentDidMount=()=>{
	this.paramMethod();
}
	componentDidUpdate=()=>{
		this.paramMethod();	
	}
	
paramMethod(){
	
	const query = new URLSearchParams(this.props.match.params.albumId);
		for(let param of query.entries()){
			if(this.state.albumId !== param[0]){
				this.setState({
				albumId: param[0],
				yearReleased : this.props.location.state.yearReleased,
				album : this.props.location.state.albumName,
				modalIndct : this.props.location.state.show

			});
	
		axios.get('https://www.theaudiodb.com/api/v1/json/1/track.php',{

			params:{
				m : param[0]
			}
		})	
		.then(response =>{			
			console.log(response.data);
		if(response.data.track!=null && response.data.track.length >0){			
			const newAlbumData = response.data.track.map(c=>{
			 	return{
			 		trackId :c.idTrack,
					duration:c.intDuration,
					tracks:c.strTrack			

				};
			});
			 const newState= Object.assign({},this.state,{
				tracksData: newAlbumData,
				albumIndct : true

			});
			this.setState(newState);
		
			
	}		
			
})	
		.catch(error =>
			console.log(error));
	}
}
}




render(){			 
			const  tracksList = this.state.tracksData.map(key=>{
		return(
			
			<Au key={key.trackId}>					
			<ul>
			<li className={classes.List}>{key.tracks}<div className={classes.ReleaseDate}>{key.duration}</div>
			</li>
			</ul>						
			</Au>				

			);
		});

return(	
	<Au key={this.state.albumId}>	
	<Modal show={this.state.modalIndct} closeHandler={this.closedHandler}>
	<div style={{backgroundColor:"black",color:"white",height:"33px",margin:"-18px",padding:"10px"}}> Track Listing</div>
	<div style={{fontSize:"20px", marginTop:"35px"}}>{this.state.album}</div>
	<div className={classes.ReleaseDate}>Released: {this.state.yearReleased}</div>
	<div className={classes.TrackList}>{tracksList}</div>
	</Modal>
	</Au>

	);	
}
}

export default withRouter(TrackList);