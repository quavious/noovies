import React, {useState, useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import { movieApi } from '../../Api';
import MoviesPresenter from "./MoviesPresenter";

export default () => {
    const [movies, setMovies] = useState({
        loading: true,
        nowPlaying: [],
        popular: [],
        upcoming: [],
        nowPlayingError: null,
        popularError: null,
        upcomingError: null   
    })
    const getData = async() => {
        const [nowPlaying, nowPlayingError] = await movieApi.nowPlaying();
        const [popular, popularError] = await movieApi.popular();
        const [upcoming, upcomingError] = await movieApi.upComing();
        setMovies({
            loading: false,
            nowPlaying, popular, upcoming, nowPlayingError, popularError, upcomingError})
    }
    useEffect(() => {
        getData();
    }, []);
    return <MoviesPresenter {...movies} />
}