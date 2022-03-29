import React, { useState, useEffect  } from 'react';
import { StyleSheet, StatusBar, View, Button, TextInput, Alert, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function App({route,navigation}) {
  const{ osoite } = route.params;
  // Location example
  const [hakuSana, setHakuSana] = useState('Kamppi, helsinki');
  const [koordinaatit, setKoordinaatit] = useState({
    latitude: 60.168535,
    longitude: 24.930494,
    latitudeDelta: 0.006,
    longitudeDelta: 0.004
  });
  useEffect(() => {
    haeOsoite();
}, [])

  const haeOsoite = () => {
    fetch(`location=${osoite}`) //tähän api-koodi mapquestapista
    .then(response => response.json())
    .then(responseJson  =>  setKoordinaatit({
      latitude: responseJson.results[0].locations[0].latLng.lat,
      longitude: responseJson.results[0].locations[0].latLng.lng,
      latitudeDelta: 0.006,
      longitudeDelta: 0.004
    }))
    .catch(error => { 
        Alert.alert('Error', error.message); 
    });
    console.log("koordinaatit: ", koordinaatit);
  }  

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={koordinaatit}
      >
        <Marker
          coordinate={koordinaatit}
          title='Haaga-Helia'
        />
      </MapView>
      {/* <TextInput  
        onChangeText={text => setHakuSana(text)}
        placeholder='Search address' >
      </TextInput> */}
      {/* <Button style={styles.nappi}  onPress={haeOsoite}
        title="Näytä sijainti"></Button> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  map: {
    flex: 1,
    width: "100%",
    height: "100%"
  },
  nappi: {
    borderRadius: 25,
    padding:10
  }
});