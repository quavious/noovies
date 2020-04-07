import React from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import {apiImage} from '../Api';

const Image = styled.Image`
    width: 100px;
    height: 150px;
    border-radius: 4px;
`;

const Poster = ({url})  => (<Image source={{uri: apiImage(url)}}/>);

Poster.propTypes = {
    url: PropTypes.string
}

export default Poster;