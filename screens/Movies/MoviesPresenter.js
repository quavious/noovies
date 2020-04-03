import React from 'react';
import styled from 'styled-components/native';
import Swiper from 'react-native-web-swiper';
import { Dimensions, ActivityIndicator } from 'react-native';
import Slide from '../../components/Movies/Slide';
import { ScrollView } from 'react-native-gesture-handler';
import Title from '../../components/Title';
import Vertical from '../../components/Vertical';
import Horizontal from '../../components/Horizontal';

const {width: WIDTH, height: HEIGHT} = Dimensions.get("window")

const SliderContainer = styled.View`
    width: 100%;
    height : ${HEIGHT/3}px;
    margin-bottom: 40px;
`;

const Container = styled.View`
`

export default ({ loading, nowPlaying, popular, upcoming }) => {
    return (
        <ScrollView style={{backgroundColor: "black"}} contentContainerStyle={{justifyContent: loading ? "center" : "flex-start"}}>
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
                    <ScrollView horizontal style={{marginTop: 20, marginBottom: 40}} contentContainerStyle={{paddingLeft: 30}} showsHorizontalScrollIndicator={false}>
                        {popular.map(movie => <Vertical 
                            id={movie.id}
                            key={movie.id} 
                            poster={movie.poster_path} 
                            title={movie.title}
                            votes={movie.vote_average}
                        />)}
                    </ScrollView>
                    <Title title={"Coming Soon"} />
                    {upcoming.map(movie=> (
                        <Horizontal 
                            key={movie.id} 
                            id={movie.id} 
                            title={movie.title} 
                            votes={movie.vote_average}
                            overview={movie.overview}
                            poster={movie.poster_path}/>
                    ))}
                </Container>
            </>
            )}
        </ScrollView>    
    )
}