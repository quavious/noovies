import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import Poster from './Poster';
import Title from './Title';
import Votes from './Votes';
import { apiImage } from '../Api';

const Container = styled.View`
    flex-direction: row;
    align-items: flex-start;
    padding: 0px 30px;
    margin-bottom: 30px;
`

const Data = styled.View`
    
`

const Title = styled.Text`
    color: white;
    font-weight: 500;
`

const Horizontal = ({id, title, votes, overview, poster}) => (
    <Container>
        <Poster url={apiImage(poster)} />
        <Data>
            <Title>{title}</Title>
            <Votes votes={votes} />

        </Data>
    </Container>
);

export default Horizontal;

Horizontal.propTypes = {
    id = PropTypes.number.isRequired,
    title = PropTypes.string.isRequired,
    votes = PropTypes.number.isRequired,
    overview = PropTypes.string.isRequired,
    poster = PropTypes.string.isRequired,
}