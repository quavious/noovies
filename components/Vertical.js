import React from 'react';
import styled from 'styled-components/native'
import PropTypes from 'prop-types';
import {trimText} from '../utils';
import Votes from './Votes';
import Poster from './Poster';
import { TouchableOpacity } from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Container = styled.View`
    align-items: center;
    margin-right: 20px;
`

const Title = styled.Text`
    color: white;
    font-weight: 500;
    margin: 10px 0px 5px 0px;
`

const Vertical = ({isTV=false, id, poster, title, votes}) => {
    const navigation = useNavigation();
    const goToDetail = () => {
        navigation.navigate("Detail", {
            isTV,
            id,
            title,
            votes,
            poster
        })
    }

    return (
        <TouchableOpacity onPress={goToDetail}>
            <Container>
                <Poster url={poster}/>
                <Title>{trimText(title, 10)}</Title>
                <Votes votes={votes} />
            </Container>
        </TouchableOpacity>
    )
}

Vertical.propTypes = {
    poster : PropTypes.string.isRequired,
    title : PropTypes.string.isRequired,
    votes : PropTypes.number.isRequired,
    id : PropTypes.number.isRequired
}

export default Vertical