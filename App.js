import React, {useState} from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// images === "array"
const cacheImages = (images) => images.map(image => {
  if(typeof image === "string"){
    return Image.prefetch(image) // form url
  } else {
    return Asset.fromModule(image).downloadAsync(); // form module
  }
})

const cacheFonts = fonts => fonts.map(font => Font.loadAsync(font))

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const loadAssets = async() => {
    const images = cacheImages([require("./assets/splash.png")]); //require module
    const fonts = cacheFonts([Ionicons.font]);
    return await Promise.all([...images, ...fonts]);
  }
  const onFinish = () => setIsReady(true);
  return isReady ? <Text>Hello World!</Text> : <AppLoading startAsync={loadAssets} onFinish={onFinish} onError={console.error}/>
}
