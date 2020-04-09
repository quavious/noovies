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
    const nextCard = () => setTopIndex(topIndex + 1) // setTopIndex(currentValue => currentValue + 1) can also be used
    const position = new Animated.ValueXY();

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (evt, {dx,dy}) => {
            position.setValue({x:dx,y:dy})
        },
        onPanResponderRelease: (evt, {dx, dy}) => {
            if(dx >= 200){
                Animated.spring(position, {
                    toValue: {
                        x:WIDTH+100,
                        y: dy
                    }
                }).start(nextCard)
            }
            else if(dx <= -200) {
                Animated.spring(position, {
                    toValue: {
                        x:-WIDTH-100,
                        y: dy
                    }
                }).start(nextCard);
            } else {
                Animated.spring(position, {
                    toValue: {
                        x: 0,
                        y: 0
                    }
                }).start()
            }
        }
    });
    const rotationValues = position.x.interpolate({
        inputRange: [-100, 0, 100],
        outputRange: ['-10deg', '0deg', '10deg'], // propotion
        extrapolate: "clamp" // set deadline(limit) in range
        // x에 대해 -10deg에서 10deg까지 rotate한다
    })
    const secondCardOpacity = position.x.interpolate({
        inputRange: [-255, 0 ,255],
        outputRange: [1, 0.3, 1],
        extrapolate: "clamp"
    })
    const secondCardScale = position.x.interpolate({
        inputRange: [-255, 0, 255],
        outputRange: [1, 0.9, 1],
        extrapolate: "clamp"
    })
    return (
        <Container>
            {results.map((result, index) => {
                if(index < topIndex) {
                    return null;
                }
                if(index === topIndex) {
                    return (
                        <Animated.View style={{...styles, zIndex: 1, transform: [{rotate: rotationValues}, ...position.getTranslateTransform()]}} key={result.id} {...panResponder.panHandlers}>
                            <Poster source={{uri: apiImage(result.poster_path)}} />
                        </Animated.View>
                    );
                }
                else if(index === topIndex + 1) {
                    return (
                        <Animated.View style={{...styles, zIndex: -index, opacity: secondCardOpacity, transform:[{scale: secondCardScale}]}} key={result.id} {...panResponder.panHandlers}>
                            <Poster source={{uri: apiImage(result.poster_path)}} />
                        </Animated.View>
                    );
                }
                else {
                    return (
                        <Animated.View style={{...styles, zIndex: -index,  opacity: 0}} key={result.id} {...panResponder.panHandlers}>
                            <Poster source={{uri: apiImage(result.poster_path)}} />
                        </Animated.View>
                    );
                }
            })}
        </Container>
    )
}

// position.getTranslateTransform : affect transform of css area