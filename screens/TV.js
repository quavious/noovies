import React, { useEffect, useState } from 'react';
import {View, Text, Button} from 'react-native';
import { tvApi } from '../Api';

export default () => {
    const [shows, setShows] = useState({
        today: [],
        thisWeek: [],
        topRated: [],
        popular: [],
        todayError: null,
        thisWeekError: null,
        topRatedError: null,
        popularError: null
    })
    const getData = async() => {
        const [today, todayError] = await tvApi.today();
        const [thisWeek, thisWeekError] = await tvApi.today();
        const [topRated, topRatedError] = await tvApi.today();
        const [popular, popularError] = await tvApi.today();
        setShows({
            today, thisWeek, topRated, popular, todayError, thisWeekError, topRatedError, popularError
        })
    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <View>
            <Text>{shows.popular?.length}</Text>
        </View>
    )
}