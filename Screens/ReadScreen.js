import React from 'react';
import {Text,View,TouchableOpacity,StyleSheet,ScrollView,FlatList} from 'react-native';
import { SearchBar } from 'react-native-elements';
import db from '../config'


export default class ReadScreen extends React.Component{
    constructor(){
    super();
    this.state = {
        search: '',
        dataSource:'',
      };
    }
    
      

        retrieveStories = async()=>{
            const query = await db.collection("Stories").get()
            query.docs.map((doc)=>{
                this.setState({
                    dataSource:[doc.data()]
                })
                console.log(doc.data)
            })
        }
    
    


    render(){
        if(this.state.search !== ''){
            this.retrieveStories();
        }
        return(
            
                      
            <FlatList            
            data={this.state.dataSource}
            renderItem={({item})=>(
            <View style={{borderBottomWidth:2}}>
            <SearchBar
               placeholder="Search Here..."
               onChangeText={(text)=>{
                   this.setState({search:text})
               }}
               value={this.state.search}
               style={{marginTop:15}}
            />  
                <Text>{"Title:" + item.Title}</Text>
                <Text>{"Author:" + item.Author}</Text>
            </View>
        )}
        keyExtractor={(item,index)=>index.toString()}
        onEndReached={this.retrieveStories}
        onEndReachedThreshold={0.7}      
            />
        )
    }
}
