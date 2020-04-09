import React, { useEffect, useState } from 'react';
import FavsPresenter from './FavsPresenter';
import {View, Text, Button} from 'react-native';
import {movieApi} from '../../Api';

export default () => {
    const [movies, setMovies] = useState({
        results: [],
        error: null
    })
    const getData = async() => {
        const [results, error] = await movieApi.discover();
        setMovies({results, error})
    }
    useEffect(() => {
        getData()
    },[])
    return <FavsPresenter refreshFn={getData} {...movies} />
}
