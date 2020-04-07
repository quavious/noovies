import React, { useEffect, useState } from 'react';
import {View, Text, Button} from 'react-native';
import { tvApi } from '../../Api';
import TVPresenter from './TVPresenter';

export default () => {
    const [shows, setShows] = useState({
        loading: true,
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
        const [topRated, topRatedError] = await tvApi.topRated();
        const [popular, popularError] = await tvApi.popular();
        const [thisWeek, thisWeekError] = await tvApi.thisWeek();
        setShows({
            loading: false, today, topRated, thisWeek, popular, todayError, thisWeekError, topRatedError, popularError
        })
    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <TVPresenter refreshFn={getData} {...shows} />
    )
}