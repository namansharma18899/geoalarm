// import {React, useState } from 'react';
// import { View, StyleSheet,Image } from 'react-native';
// import {MapView,  Marker } from 'expo';
// const App = () => {
// const imageURL = ''
//   const [mapRegion, setmapRegion] = useState({
//     latitude: 37.78825,
//     longitude: -122.4324,
//     latitudeDelta: 0.0922,
//     longitudeDelta: 0.0421,
//   });
//   return (
//     <View style={styles.container}>
//       <MapView
//         style={{ alignSelf: 'stretch', height: '100%' }}
//         region={mapRegion}
//       >
//         <Marker coordinate={mapRegion}> 
// <Image source={{uri:imageURL}} />
//  </Marker>
//       </MapView>
//     </View>
//   );
// };
// export default App;
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });



//GPT searchbar for locaiton 
// import React, { useState } from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import { SearchBar } from 'react-native-elements';
// import * as Location from 'expo-location';
// import MapView, { Marker } from 'react-native-maps';

// export default function App() {
//   const [search, setSearch] = useState('');
//   const [location, setLocation] = useState(null);
//   const [errorMsg, setErrorMsg] = useState(null);

//   const handleSearch = async () => {
//     try {
//       let address = await Location.geocodeAsync(search);
//       if (address.length > 0) {
//         setLocation({
//           latitude: address[0].latitude,
//           longitude: address[0].longitude,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         });
//       } else {
//         setErrorMsg('No results found');
//       }
//     } catch (error) {
//       console.log(error);
//       setErrorMsg('Error fetching location');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <SearchBar
//         placeholder="Search location"
//         value={search}
//         onChangeText={setSearch}
//         onSubmitEditing={handleSearch}
//         containerStyle={styles.searchBarContainer}
//         inputContainerStyle={styles.searchBarInput}
//         inputStyle={styles.searchBarText}
//       />
//       {location && (
//         <MapView style={styles.map} region={location}>
//           <Marker coordinate={location} />
//         </MapView>
//       )}
//       {errorMsg && <Text style={styles.errorMsg}>{errorMsg}</Text>}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#ecf0f1',
//     padding: 8,
//   },
//   searchBarContainer: {
//     backgroundColor: 'transparent',
//     borderTopWidth: 0,
//     borderBottomWidth: 0,
//     paddingHorizontal: 0,
//     width: '100%',
//   },
//   searchBarInput: {
//     backgroundColor: '#fff',
//     borderRadius: 20,
//   },
//   searchBarText: {
//     fontSize: 16,
//   },
//   map: {
//     flex: 1,
//     width: '100%',
//   },
//   errorMsg: {
//     marginTop: 16,
//     fontSize: 18,
//     color: 'red',
//   },
// });



// import React, { useState, useEffect } from 'react';
// import { Platform, Text, View, StyleSheet } from 'react-native';
// // import Device from 'expo-device';
// import * as Location from 'expo-location';

// export default function App() {
//   const [location, setLocation] = useState(null);
//   const [errorMsg, setErrorMsg] = useState(null);

//   useEffect(() => {
//     (async () => {
//       if (Platform.OS === 'android') {
//         setErrorMsg(
//           'Oops, this will not work on Snack in an Android Emulator. Try it on your device!'
//         );
//         return;
//       }
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         setErrorMsg('Permission to access location was denied');
//         return;
//       }

//       let location = await Location.getCurrentPositionAsync({});
//       setLocation(location);
//     })();
//   }, []);

//   let text = 'Waiting..';
//   if (errorMsg) {
//     text = errorMsg;
//   } else if (location) {
//     text = JSON.stringify(location);
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.paragraph}>{text}</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   paragraph: {
//     fontSize: 18,
//     textAlign: 'center',
//   },
// });





import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';

const origin = { latitude: 28.5355, longitude: 77.3910 }; // Default origin (Delhi)
const destination = { latitude: 19.0760, longitude: 72.8777 }; // Default destination (Mumbai)

export default function App() {
  const [source, setSource] = useState(origin);
  const [destination, setDestination] = useState(destination);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setSource({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  const handleSetDestination = async () => {
    try {
      let result = await Location.geocodeAsync(destination);
      if (result.length > 0) {
        setDestination({
          latitude: result[0].latitude,
          longitude: result[0].longitude,
        });
      } else {
        setErrorMsg('No results found');
      }
    } catch (error) {
      console.log(error);
      setErrorMsg('Error fetching location');
    }
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={{
        latitude: source.latitude,
        longitude: source.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}>
        <Marker coordinate={source} title="Current Location" />
        <Marker coordinate={destination} title="Destination" />
        <MapViewDirections
          origin={source}
          destination={destination}
          apikey="AIzaSyAdfMRyYMbZb3ZqcTXtPj9QZEbo-C__cw8"
          strokeWidth={3}
          strokeColor="hotpink"
        />
      </MapView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter destination"
          value={destination}
          onChangeText={setDestination}
        />
        <Button title="Set" onPress={handleSetDestination} />
      </View>
      {errorMsg && <Text style={styles.errorMsg}>{errorMsg}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  map: {
    flex: 1,
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    position: 'absolute',
    top: 16,
    left: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  errorMsg: {
    marginTop: 16,
    fontSize: 18,
    color: 'red',
  },
});
