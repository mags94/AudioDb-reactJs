import React,{Component} from 'react';
import Au from '../../hoc/Au';
import ArtistList from '../ArtistList/ArtistList';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import classes from './Searchbox.css';


class SearchBar extends Component{

	state={
		textValue: "",
		artistData: [],
		artistIndct: true

	}
	postDataHandler=()=>{
			
		axios.get('https://www.theaudiodb.com/api/v1/json/1/search.php',{
			params:{
				s : this.state.textValue
			}
		})	
		.then(response =>{			
			console.log(response.data);	
			

			if(response.data.artists!=null && response.data.artists.length >0){

			const newArtistData = response.data.artists.map(c=>{
				return{
					logo:c.strArtistLogo,
					name:c.strArtist,
					followers : c.intMembers

				};
				

			});
			const newState= Object.assign({},this.state,{
				artistData: newArtistData,
				artistIndct : true

			});
			this.setState(newState);
			
	}
	else{
		const newState= Object.assign({},this.state,{

				artistIndct : false

			});
			this.setState(newState);
			
				
	}
})	
		.catch(error =>
			console.log(error));

		}
	

onChangeEventHandler(event){
		this.setState({
			textValue: event.target.value
		})
		
	}
render(){

	return(
		<Au>
		<div style={{margin:"15px"}}>
		<label >Search by artist  </label>
		<input type="searchbox" onChange={this.onChangeEventHandler.bind(this)} />  
		<button className={classes.Button} onClick={this.postDataHandler} >Search</button>
		<br/>		
		<ArtistList show={this.state.artistIndct} artistDetail={this.state.artistData} />
		</div>
		</Au>
		);





}





}

export default withRouter(SearchBar);