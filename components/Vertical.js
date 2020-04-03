import React from 'react';
import styled from 'styled-components/native'
import PropTypes from 'prop-types';
import { apiImage } from '../Api';
import Votes from './Votes';
import Poster from './Poster';
import { TouchableOpacity } from 'react-native';

const Container = styled.View`
    align-items: center;
    margin-right: 20px;
`

const Title = styled.Text`
    color: white;
    font-weight: 500;
    margin: 10px 0px 5px 0px;
`

const Vertical = ({id, poster, title, votes}) => (
    <TouchableOpacity>
        <Container>
            <Poster url={apiImage(poster)}/>
            <Title>{title.length > 15 ? `${title.slice(0,15)}...` : title}</Title>
            <Votes votes={votes} />
        </Container>
    </TouchableOpacity>
)

Vertical.propTypes = {
    poster : PropTypes.string.isRequired,
    title : PropTypes.string.isRequired,
    votes : PropTypes.number.isRequired,
    id : PropTypes.number.isRequired
}

export default Vertical