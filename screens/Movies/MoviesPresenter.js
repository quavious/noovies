import React from 'react';
import styled from 'styled-components/native';
import Swiper from 'react-native-web-swiper';
import { Dimensions, ActivityIndicator } from 'react-native';

const {width, height} = Dimensions.get("screen")

const Header = styled.View`
    width: 100%;
    height: ${height/3}px;
`

const Text = styled.Text``

const Section = styled.View`
    background-color: red;
    height: 100%;
`

const Container = styled.View`
    flex: 1;
    background-color: black;
    justify-content: center;
`


export default ({ loading, nowPlaying }) => {
    return (
        <Container>
            {loading ? <ActivityIndicator color="white" size="small"/> : (
            <Header>
                <Swiper controlsEnabled={false} loop timeout={5}>
                    {nowPlaying.map(movie => (
                        <Section key={movie.id}>
                            <Text>{movie.original_title}</Text>
                        </Section>
                    ))}
                </Swiper>
            </Header>
            )}
        </Container>    
    )
}