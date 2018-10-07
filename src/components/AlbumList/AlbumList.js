import React from 'react';
import Au from '../../hoc/Au';
import classes from '../../containers/ArtistList/ArtistList.css';
import TrackList from '../../components/TrackList/TrackList';
import { withRouter, Link ,Route } from "react-router-dom";
import axios from 'axios';




class AlbumList extends React.Component{
	state= {
		artist : this.props.location.state.artistName,
		albumData :[],
		albumIndct : true		

	}



	componentDidMount=()=>{		
			
		axios.get('https://www.theaudiodb.com/api/v1/json/1/searchalbum.php',{
			params:{
				s : this.state.artist
			}
		})	
		.then(response =>{			
			console.log(response.data);
			if(response.data.album!=null && response.data.album.length >0){

			const newAlbumData = response.data.album.map(c=>{
				return{
					logo:c.strAlbumThumb,
					album:c.strAlbum,
					yearReleased:c.intYearReleased,
					albumId:c.idAlbum
					

				};
				
			});
			const newState= Object.assign({},this.state,{
				albumData: newAlbumData	,
				albumIndct : true	

			});
			this.setState(newState);
			
	}
	else{
		this.setState({
			albumIndct : false
		});
	}		
			
})	
		.catch(error =>
			console.log(error));

		}

render(){
	let album = '';
	if(this.state.albumIndct){

		 album = this.state.albumData
	
	.map(key=>{
		return(
			
			<Au key={key.album}>
			<div className={classes.Container}>
			<img className={classes.Image} src={key.logo} alt="Album" width="80px" height="70px"/>
			<span className={classes.ArtistList}>{key.album}</span>	
			</div>
			<Link className={classes.AnchorstyleTrack} to={{ 
			pathname: this.props.match.url + '/' + key.albumId, 
			state: {yearReleased : key.yearReleased, albumId:key.albumId , albumName:key.album ,show:true,
			logo : this.props.location.state.logo ,artistName: this.state.artist ,followers :this.props.location.state.followers} }}>
			View Tracks</Link>				
			</Au>	
			);


});
}
else{
	album = <Au><h4>No results Found</h4></Au>;
}


return(	

	<Au key={this.state.artist}>
	<div style={{margin:"15px"}}><Link to={"/"}>Back to search</Link></div>	
	<div className={classes.Container}>
	<img className={classes.Image} src={this.props.location.state.logo} alt="Album" width="120px" height="100px"/>
	<div  className={classes.ArtistList}>{this.props.location.state.artistName}
	<br/>
	<br className={classes.Follower}/>Followers: {this.props.location.state.followers}</div>

	</div>
	<h3 className={classes.Headline}>Albums</h3>	
	{album}
	<Route path={this.props.match.url +'/:albumId'}  component={TrackList} />
	</Au>

	);
}

}
export default withRouter(AlbumList);