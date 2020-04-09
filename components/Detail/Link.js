import React from 'react';
import { TouchableOpacity } from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import styled from 'styled-components/native';

const Container = styled.View`
    flex-direction: row;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 5px;
`

const Text = styled.Text`
    font-weight: 600;
    margin-right: 10px;
`

const Link = ({onPress, text, icon}) => (
    <TouchableOpacity onPress={onPress}>
        <Container>
            <Text style={{color: 'white'}}>{text}</Text>
            <FontAwesome name={icon} color="white" size={40}></FontAwesome>
        </Container>
    </TouchableOpacity>
)
export default Link