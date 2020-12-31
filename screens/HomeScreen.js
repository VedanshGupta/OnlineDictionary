import React from 'react';
import { Component } from 'react';
import { StyleSheet, Text, View, TextInput, touchableOpacity } from 'react-native';

export default class HomeScreen extends Component{
	constructor(){
	    super();
	    this.state={
	      text: '',
	      displayText: '',
	      isSearchPressed: '',
	  	  word: '',
	  	  lexicalCategory: '',
	   	  examples:[],
	  	  definition: ''
	    };
  	}
  	getWord=(word)=>{
  		var searchKeyword = word.toLowerCase()
  		var url = "https://rupinwhitehatjr.github.io/dictionary/"+searchKeyword+".json"
  		console.log(url)
  		return fetch(url)
  		.then((data)=>{
  			if(data.status===200){
  				return data.json()
  			}else{
  				return null
  			}
  		})
  		.then((response)=>{
  			console.log(response)
  			var responseObject = response
  			if(responseObject){
  				var wordData = responseObject.definitions[0]
  				var definition = wordData.description
  				var lexicalCategory = wordData.wordType

  				this.setState({
  					"word": this.state.text,
  					"definition": definition,
  					"lexicalCategory": lexicalCategory
  				})
  			}else{
  				this.setState({
  					"word": this.state.text,
					"definition": "Not Found",
  				})
  			}
  		})
  	}

	render(){
		return(
			<View>
				 <View style={styles.detailsContainer}>
					<Text style={styles.buttonText}>Word:{" "}</Text>
					<Text style={{fontSize:18}}>{this.state.word}</Text>
				 </View>

				 <View style={styles.detailsContainer}>
					<Text style={styles.buttonText}>Type:{" "}</Text>
					<Text style={{fontSize:18}}>{this.state.lexicalCategory}</Text>
				 </View>

				 <View style={{flexDirection:'row', flexWarp: 'wrap'}}>
					<Text style={styles.buttonText}>Definition:{" "}</Text>
					<Text style={{fontSize:18}}>{this.state.definition}</Text>
				 </View>

				<TextInput
		          style={ styles.inputBox }
		          onChangeText={text => {
		          	this.setState({
		          		text:text,
		          		isSearchPressed: false,
		          		word: "loading...",
		          		lexicalCategory: '',
		          		examples:[],
		          		definition: ""
		          	});
		          }}
		          value={this.state.text}
        		/>

        		<touchableOpacity 
        		style={styles.searchButton} 
        		onPress={()=>{
        			this.setState({isSearchPressed:true});
        			this.getWord(this.state.text);
        		}}>
        			<Text style={styles.buttonText}>Search</Text>
        		</touchableOpacity>
    		</View>
		)
	}
}

const styles = StyleSheet.create({
  detailsContainer: {
    flex: 1,
    backgroundColor: '#b8b8b8',
  },
  inputBox: {
    marginTop: 200,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    outline: 'none',
  },
  searchButton: {
    width: '50%',
    height: 55,
    alignSelf: 'center',
    padding: 10,
    margin: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  displayText: {
    textAlign: 'center',
    fontSize: 30,
  },
});
