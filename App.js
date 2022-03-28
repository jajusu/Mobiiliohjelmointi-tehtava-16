import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import Haku from'./Haku'
import Kartta from'./Kartta'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Omat paikat"component={Haku} />
        <Stack.Screen name="Kartta"component={Kartta} />
        </Stack.Navigator>
    </NavigationContainer>  
  );
}