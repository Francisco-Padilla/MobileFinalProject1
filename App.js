//import * as React from 'react';
import React,{useState, useEffect} from "react";
import { StyleSheet,Text, View, TextInput, Pressable ,Image, SafeAreaView, Button  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import DateTimePicker from '@react-native-community/datetimepicker';	
import D_Image from './assets/pots.jpg';

import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

function HomeScreen({ navigation }) {
  const [number, changenumber] = React.useState()
  const D_IMAGE = Image.resolveAssetSource(D_Image).uri;
  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#7BA872' }}>  
      <Text style={styles.pageTitle}>Getting Ready For Spring</Text>
      <Image style = {styles.image} source={{uri: D_IMAGE}} />
      <Text style={styles.titleBody}>This application will help you calculate when to start planting your seeds for the upcoming spring!</Text>
     
      <Pressable
        style ={styles.button}
        onPress={() => {
          navigation.navigate('Entry', {
            itemId: number
          });
        }}
      >
        <Text style={styles.buttonText} >Enter Data</Text>
      </Pressable>
     
    </View>
  );
}

function DataEntry({ navigation }) {
  const [number, changenumber] = React.useState();
  const [seed, changeseed] = useState('Corn');
  const [datePicker, setDatePicker] = useState(false); // For Date
  const [date, setDate] = useState(new Date());//For Date

  function showDatePicker() {
    setDatePicker(true);
  };

  function onDateSelected(event, value) {
    setDate(value);
    setDatePicker(false);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#7BA872' }}>  
      <Text style={styles.pageTitle}>Getting Ready For Spring</Text>
      <Text style={styles.textinput}>Last FrostDate:  {date.toDateString()}</Text>

        {datePicker && (
              <DateTimePicker
                value={date}
                mode={'date'}
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                is24Hour={true}
                onChange={onDateSelected}
                style={styles.datePicker}
              />
            )}

        {!datePicker && (
                  <View style={{ margin: 10 }}>
                    <Button title="Set Last Frost Date" color="black" onPress={showDatePicker} />
                  </View>
                )}

      <TextInput  style={styles.textinput} placeholder ="Enter Plant Name" 
        onChangeText={changeseed}
        value={seed}
      />
      <TextInput  style={styles.textinput} placeholder ="Enter time Frame in Days" 
        onChangeText={changenumber}
        value={number}
      />
      <Text style={styles.titleBody}>This timeframe must me in number of days. If asked to plant before frostdate, enter it as a negative number.</Text>
      <Pressable
        style ={styles.buttonThree}
        onPress={() => {
          navigation.navigate('Data', {
            itemId: number,
            dates: date,
            seed: seed
          });
        }}
      >
        <Text style={styles.buttonTextThree} >Save Plant Information</Text>
      </Pressable>
    </View>
  );
}

function ResultsScreen({ route, navigation }) {
  
  const { itemId } = route.params;
  const { dates} = route.params;
  const {seed} = route.params;

  const [date2, setDate2] = useState(new Date());

  useEffect(() => {
         const newDate = new Date(dates);
          newDate.setDate(newDate.getDate(dates) + parseInt(itemId));
          setDate2(newDate);
          //addingDate2(newDate);
          
  }, []);
  
  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#7BA872' }}>
      <Text style={styles.pageTitle}>Getting Ready For Spring</Text>
      <Text> Last Frost Date {dates.toDateString()}</Text>
      <Text> Time Frame in Days {itemId}</Text>
      <Text> Seed Name {seed} Planting Date {date2.toDateString()}</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  SplashScreen.preventAutoHideAsync();
  setTimeout(SplashScreen.hideAsync, 2000);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} 
        options={{
            title: 'Home',
            headerStyle: {
              backgroundColor: 'green',
            },
            headerTintColor: '#fff',
          }} />
          <Stack.Screen name="Entry" component={DataEntry} 
        options={{
            title: 'Enter Data',
            headerStyle: {
              backgroundColor: 'green',
            },
            headerTintColor: '#fff',
          }} />
        <Stack.Screen name="Data" component={ResultsScreen}
        options={{
          title: 'Results',
          headerStyle: {
            backgroundColor: 'green',
          },
          headerTintColor: '#fff',
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
 
}
const styles = StyleSheet.create({
  pageTitle: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom:10
  },
  titleBody: {

    fontSize: 20,
    textAlign: 'center',
  
  },

  subTitles: {

    fontSize: 35,
    textAlign: 'left',
    paddingLeft: 30
  },
  recipeText: {
    fontSize: 30,
    textAlign: 'left',
    paddingLeft: 40
  },
  textinput: {
    height: 45,
    width: 375,
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: 'white',
    marginTop: 20
      
  },
  button: {
    height: 50,
    width: 240,
    borderColor:'gray',
    backgroundColor: 'gray',
    borderWidth: 1 ,
    marginTop: 15
    
  },
  buttonTwo: {
    height: 50,
    width: 240,
    borderColor:'gray',
    backgroundColor: 'gray',
    borderWidth: 3 ,
    marginTop: 20
    //paddingTop: 30  
  },
  buttonThree: {
    height: 60,
    width: 300,
    borderColor:'#735F48',
    backgroundColor: '#735F48',
    borderWidth: 3 ,
    marginTop: 20
    //paddingTop: 30  
  },
  buttonText: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 34,
    color: 'white',
    textAlign: 'center',
    //paddingBottom: 30
  },
  buttonTextThree: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    paddingTop: 10
    //paddingBottom: 30
  },
  image: {
    width: 400,
    height: 275,
    backgroundColor: 'white',
    margin: 20,
    borderColor: 'white',
    borderWidth:30,
  },
  datePicker: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 320,
    height: 260,
    display: 'flex',
  },
});

