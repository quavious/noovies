import React, { useLayoutEffect } from 'react';
import {Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Movies from "../screens/Movies";
import TV from "../screens/TV";
import Search from "../screens/Search";
import Favs from "../screens/Favs";
import { Ionicons } from '@expo/vector-icons';

const Tabs = createBottomTabNavigator();

export default ({navigation, route }) => {
    const {state} = route
    useLayoutEffect(() => { // useEffect + async
        navigation.setOptions({ 
            title : state?.routeNames[state?.index] || "Movies"
        })
    }, [route])
    return (
        <Tabs.Navigator tabBarOptions={{
            showLabel : false,
            style : {
                backgroundColor: 'black',
                borderTopColor : 'black',
            }
        }} screenOptions = {({route}) => ({
            tabBarIcon : ({focused}) => {
                let iconName = Platform.OS === "ios" ? "ios-" : "md-" // platform acquire
                const {name} = route;
                console.log(name)
                if(name === "Movies") {
                    iconName += "film"
                } else if(name === "TV") {
                    iconName += "tv"
                } else if(name === "Search") {
                    iconName += "search"
                } else if(name === "Discovery") {
                    iconName += "heart"
                }
                return <Ionicons name={iconName} color={focused ? 'white' : 'gray'} size={30} />;
            }
        })}>
            <Tabs.Screen name="TV" component={TV}/>
            <Tabs.Screen name="Movies" component={Movies}/>
            <Tabs.Screen name="Search" component={Search}/>
            <Tabs.Screen name="Discovery" component={Favs}/>
        </Tabs.Navigator>
    )
};