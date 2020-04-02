import React, {useState} from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { Image, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {NavigationContainer} from '@react-navigation/native';
import Stack from './navigation/Stack';


// images === "array"
const cacheImages = images => images.map(image => {
  if(typeof image === "string"){
    return Image.prefetch(image) // form url
  } else {
    return Asset.fromModule(image).downloadAsync(); // form module
  }
});

const cacheFonts = fonts => fonts.map(font => Font.loadAsync(font));

const App =() => {
  const [isReady, setIsReady] = useState(false);
  const loadAssets = async () => {
    const images = cacheImages(["https://images.unsplash.com/photo-1562887189-e5d078343de4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",require("./assets/splash.png")]); //require module
    const fonts = cacheFonts([Ionicons.font]);
    return await Promise.all([...images, ...fonts]); // startAsync returns promise object
  };

  return isReady ? (
    <>
      <NavigationContainer>
        <Stack />
      </NavigationContainer>
      <StatusBar barStyle="light-content" />
    </>  
    ) : ( 
    <AppLoading startAsync={loadAssets} onFinish={() => setIsReady(true)} onError={console.error}/>
  );
}

export default App;