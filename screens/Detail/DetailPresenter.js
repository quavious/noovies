import React from 'react';
import {View, Text, Dimensions, ActivityIndicator} from 'react-native';
import styled from 'styled-components/native';
import ScrollContainer from '../../components/ScrollContainer';
import {apiImage} from '../../Api';
import Poster from '../../components/Poster';
import Votes from '../../components/Votes';
import {formatDate} from '../../utils';
import Link from '../../components/Detail/Link'


const BG = styled.Image`
    width: 100%;
    height: 100%;
    opacity: 0.4;
    position: absolute;
`
const Container = styled.View`
    flex-direction: row;
    align-items: center;
    top: 30px;
`

const Header = styled.View`
    height: ${Dimensions.get("window").height / 3}px;
    align-items: center;
    justify-content: flex-end;
`

const Info = styled.View`
    width: 50%;
    margin-left: 40px;
`

const Title = styled.Text`
    color: white;
    font-weight: 600;
    font-size: 24px;
    margin-bottom: 10px;
`

const Data = styled.View`
    padding: 0px 30px;
    margin-top: 30px;
`

const DataName = styled.Text`
    margin-top: 30px;
    color: white;
    opacity: 0.8;
    font-weight: 600;
    margin-bottom: 15px;
`

const DataValue = styled.Text`
    color: white;
    opacity: 0.8;
    font-weight: 500;
`;


export default ({openBrowser, results, loading}) => {
    return (
        <ScrollContainer loading={false} contentContainerStyle={{paddingBottom: 50}}>
            <>
                <Header>
                    <BG source={{uri : apiImage(results.backgroundImage, "")}}/>
                    <Container>
                        <Poster url={results.poster} />
                        <Info>
                            <Title>{results.title}</Title>
                            {results.votes ? <Votes votes={results.votes} /> : null}
                        </Info>
                    </Container>
                </Header>
                
                <Data>
                    {results.overview ?
                        <>
                            <DataName>Overview</DataName>
                            <DataValue>{results.overview}</DataValue>
                        </>
                    : null}
                    {loading && <ActivityIndicator styles={{marginTop: 80}} color={"white"}/>}
                    {results.spoken_languages ? <>
                        <DataName>Languages</DataName>
                        <DataValue>
                            {results.spoken_languages.map(l => `${l.name} `)}
                        </DataValue>
                    </> : null}
                    {results.genres ? <>
                        <DataName>Genres</DataName>
                        <DataValue>
                            {results.genres.map((g, index) => index === results.genres.length - 1 ? `${g.name}` : `${g.name}, `)}
                        </DataValue>
                    </>: null}
                    {results.release_date ? <>
                        <DataName>Release Date</DataName>
                        <DataValue>
                            {formatDate(results.release_date)}
                        </DataValue>
                    </>: null}
                    {results.status ? <>
                        <DataName>Status</DataName>
                        <DataValue>
                            {results.status}
                        </DataValue>
                    </>: null}
                    {results.runtime ? <>
                        <DataName>Release Date</DataName>
                        <DataValue>
                            {formatDate(results.runtime)} Minutes
                        </DataValue>
                    </>: null}
                    {results.first_air_date ? <>
                        <DataName>First Air Date</DataName>
                        <DataValue>
                            {formatDate(results.first_air_date)}
                        </DataValue>
                    </>: null}
                    {results.number_of_episodes ? <>
                        <DataName>Episodes / Seasons</DataName>
                        <DataValue>
                            {results.number_of_episodes} / {results.number_of_seasons}
                        </DataValue>
                    </>: null}
                    {results.imdb_id ? <>
                        <Link text={"IMDB Page"} icon={"imdb"} onPress={() => openBrowser(`https://www.imdb.com/title/${results.imdb_id}`)} />
                    </>: null}
                    {results.videos.results?.length > 0 ? <>
                        <DataName>Videos</DataName>
                        {results.videos.results.map(video => (
                            <Link text={video.name} key={video.id} icon="youtube-play" onPress={() => openBrowser(`https://www.youtube.com/watch?v=${video.key}`)} />
                        ))}
                    </>: null}
                </Data>
                
            </>
        </ScrollContainer>
    )
}