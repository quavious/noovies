import React from 'react'
import styled from "styled-components/native";
import PropTypes, { string } from 'prop-types';
import { apiImage } from '../../Api';
import Poster from '../Poster';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Votes from '../Votes';

const BG = styled.Image`
    height: 100%;
    width: 100%;
    opacity: 0.7;
    position: absolute;
`
const Container = styled.View`
    height: 100%
`

const Content = styled.View`
    height: 100%;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`
const Data = styled.View`
    width: 50%;
    align-items: flex-start;
`
const Title = styled.Text`
    color: white;
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 5px;
`
const VotesContainer = styled.Text`
    margin-bottom: 12px;
`
const Overview = styled.Text`
    color: white;
    opacity: 0.7;
    font-weight: 500;
    font-size: 14px;
`
const Button = styled.View`
    background-color: #e74c3c;
    padding: 5px 10px;
    margin-top: 10px;
    border-radius: 3px;
`
const ButtonText = styled.Text`
    color: white
`

const Slide = ({id, title, backgroundImage, votes, overview, poster}) => {
    return (
        <Container>
            <BG source={{uri: apiImage(backgroundImage)}} />
            <Content>
                <Poster url={apiImage(poster)} />
                <Data>
                    <Title>{title.length > 30 ? `${title.slice(0,30)}...` : title}</Title>
                    <VotesContainer>
                        <Votes votes={votes} />
                    </VotesContainer>
                    <Overview>{overview.length > 110 ? `${overview.slice(0,110)}...` : overview}</Overview>
                    <TouchableOpacity>
                        <Button>
                            <ButtonText>View Details</ButtonText>
                        </Button>
                    </TouchableOpacity>
                </Data>
            </Content>
        </Container>
    )
}

Slide.propTypes = {
    id : PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    backgroundImage : PropTypes.string.isRequired, 
    votes : PropTypes.number.isRequired,
    overview : PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired
}

export default Slide;