import React from 'react';
import styled from 'styled-components/native';
import Swiper from 'react-native-web-swiper';
import { Dimensions, ActivityIndicator,View } from 'react-native';
import Slide from '../../components/Movies/Slide';
import { ScrollView } from 'react-native-gesture-handler';
import Title from '../../components/Title';
import Vertical from '../../components/Vertical';
import MoviesContainer from '.';

const {width: WIDTH, height: HEIGHT} = Dimensions.get("window")

const SliderContainer = styled.View`
    width: ${WIDTH}px;
    height : ${HEIGHT/3}px;
    margin-bottom: 40px;
`;

const Container = styled.View`
`

export default ({ loading, nowPlaying, popular }) => {
    return (
        <ScrollView style={{backgroundColor: "black"}} contentContainerStyle={{flex: 1, justifyContent: loading ? "center" : "flex-start"}}>
            {loading ? <ActivityIndicator color="white" size="small"/> : (
            <>
                <SliderContainer>
                    <Swiper controlsEnabled={false} loop timeout={5}>
                        {nowPlaying.map(movie => (
                            <Slide 
                                key={movie.id} 
                                id={movie.id} 
                                title={movie.original_title}
                                overview={movie.overview}
                                votes={movie.vote_average}
                                backgroundImage={movie.backdrop_path}
                                poster = {movie.poster_path} />
                        ))}
                    </Swiper>
                </SliderContainer>
                <Container>
                    <Title title={"Popular Movies"} />
                    <ScrollView horizontal style={{marginTop: 20}} contentContainerStyle={{paddingLeft: 30}} showsHorizontalScrollIndicator={false}>
                        {popular.map(movie => <Vertical 
                            key={movie.id} 
                            poster={movie.poster_path} 
                            title={movie.title}
                            votes={movie.vote_average}
                        />)}
                    </ScrollView>
                </Container>
            </>
            )}
        </ScrollView>    
    )
}