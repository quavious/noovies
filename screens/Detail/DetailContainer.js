import React, {useLayoutEffect, useState, useEffect} from 'react';
import DetailPresenter from './DetailPresenter';
import { movieApi, tvApi } from '../../Api';
import * as WebBrowser from 'expo-web-browser';

export default ({navigation, route: {params: {isTV, id, title, backgroundImage, poster, overview, votes}}}) => {
    const [detail, setDetail] = useState({
        loading: true,
        results : {title, backgroundImage, poster, overview, votes, videos: {
            results: []
        }}
    })
    const getData = async() => {
        const [getDetail, getDetailError] = isTV ? await tvApi.show(id) : await movieApi.movie(id)
        setDetail({
            loading: false, 
            results : {
                ...getDetail,
                title : getDetail.title || getDetail.name,
                backgroundImage : getDetail.backdrop_path,
                poster : getDetail.poster_path,
                overview : getDetail.overview,
                votes : getDetail.vote_average
            }
        })
        
    }
    useEffect(() => {
        getData();
    }, [id])
    useLayoutEffect(() => {
        navigation.setOptions({title});
    });

    const openBrowser = async(url) => {
        await WebBrowser.openBrowserAsync(url);
    }
    return <DetailPresenter openBrowser={openBrowser} {...detail}/>
}