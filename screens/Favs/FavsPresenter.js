import React, {useState} from 'react';
import styled from 'styled-components/native';
import { PanResponder, Dimensions } from 'react-native';
import {apiImage} from '../../Api';
import {Animated} from 'react-native';

const {width:WIDTH, height:HEIGHT} = Dimensions.get("window");

const Container = styled.View`
    padding-top: 50px;
    flex: 1;
    background-color: black;
    align-items: center;
`

const Card = styled.View`
    height: ${HEIGHT / 1.5}px;
    width: 90%;
    position: absolute;
    top: 80px;
`
const styles = {
    height: HEIGHT / 1.5,
    width: "90%",
    position: "absolute",
    top: 50
}
const Poster = styled.Image`
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 20px;
`;

export default ({results}) => {
    const [topIndex, setTopIndex] = useState(0)
    const position = new Animated.ValueXY();

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (evt, {dx,dy}) => {
            position.setValue({x:dx,y:dy})
        },
        onPanResponderRelease: () => {
            Animated.spring(position, {
                toValue: {
                    x: 0,
                    y: 0
                }
            }).start()
        }
    });
    const rotationValues = position.x.interpolate({
        inputRange: [-100, 0, 100],
        outputRange: ['-10deg', '0deg', '10deg'], // propotion
        extrapolate: "clamp" // set deadline(limit) in range
    })
    return (
        <Container>
            {results.map((result, index) => {
                if(index === topIndex) {
                    return (
                        <Animated.View style={{...styles, zIndex: 1, transform: [{rotate: rotationValues}, ...position.getTranslateTransform()]}} key={result.id} {...panResponder.panHandlers}>
                            <Poster source={{uri: apiImage(result.poster_path)}} />
                        </Animated.View>
                    );
                }
                else {
                    return (
                        <Animated.View style={{...styles, zIndex: -index}} key={result.id} {...panResponder.panHandlers}>
                            <Poster source={{uri: apiImage(result.poster_path)}} />
                        </Animated.View>
                    );
                }
            })}
        </Container>
    )
}

// position.getTranslateTransform : affect transform of css area