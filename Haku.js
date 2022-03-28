import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from'react';
import { StyleSheet, View, FlatList} from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Keyboard } from 'react-native'
import { Button, Text, Icon, Input, Header, ListItem } from'react-native-elements';

const db = SQLite.openDatabase('itemdb.db');

export default function Haku({ navigation }) {
    const [osoite, setOsoite] = useState('');
    const [items, setItems] = useState([]);
  
    useEffect(() => {
      db.transaction(tx => {
        tx.executeSql('create table if not exists item (id integer primary key not null, osoite text);');
      }, null, updateList); 
    }, []);
  
    // Save item
    const saveItem = () => {
      db.transaction(tx => {
          tx.executeSql('insert into item (osoite) values (?);', [osoite]);    
        }, null, updateList
      )
      setOsoite("");
      Keyboard.dismiss();
    }
  
    // Update itemlist
    const updateList = () => {
      db.transaction(tx => {
        tx.executeSql('select * from item;', [], (_, { rows }) =>
          setItems(rows._array)
        ); 
      });
    }
  
    // Delete item
    const deleteItem = (id) => {
      db.transaction(
        tx => {
          tx.executeSql(`delete from item where id = ?;`, [id]);
        }, null, updateList
      )    
    }
  
    const listSeparator = () => {
      return (
        <View
          style={{
            height: 5,
            width: "80%",
            backgroundColor: "#fff",
            marginLeft: "10%"
          }}
        />
      );
    };

  return (
    <View style={styles.container}>
      <Input 
        style={styles.input}
        label="PLACEFINDER"
        onChangeText={text => setOsoite(text)} 
        value={osoite}>
      </Input>
      <Button 
        style={styles.button}
        onPress={saveItem} 
        title="  TALLENNA"
        buttonStyle={{
          width:340,
          backgroundColor:'grey'
        }}
        icon={
          <Icon
            name="save"
            color="white"
          />
        }
      /> 
      {/* <Button 
          onPress={() => navigation.navigate('Kartta')} 
          title="Kartta" // Navigate to History screen      
        /> */}
        <View style={styles.container}>      
        <FlatList 
          style={styles.listcontainer}
          keyExtractor={item => item.id.toString()} 
          renderItem={({item}) => 
            <ListItem bottomDivider>
              <ListItem.Content>
                <View style={styles.listatut}>
                    <ListItem.Title style={{width:200}}  onLongPress={() => {deleteItem(item.id)}}
                        onPress={() => navigation.navigate('Kartta', {osoite:item.osoite})} title="Kartta">{item.osoite} </ListItem.Title>
                    <ListItem.Subtitle style={{paddingTop:2,paddingLeft:20, color:'grey'}} 
                        // button onPress={() => {deleteItem(item.id)}}>
                        onLongPress={() => {deleteItem(item.id)}}
                        onPress={() => navigation.navigate('Kartta', {osoite:item.osoite})} title="Kartta">
                      <Text>Näytä kartalla {'>'}</Text>
                    </ListItem.Subtitle>
                </View>
              </ListItem.Content>
            </ListItem>
        } 
        data={items} 
        ItemSeparatorComponent={listSeparator} 
      /> 
    </View>  
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  header:{
    backgroundColor:'white'
  },
  listcontainer: {
    paddingTop:10,
    backgroundColor: '#fff',
    width:350,
   },
   listatut:{
     flexDirection:'row'
   }
});