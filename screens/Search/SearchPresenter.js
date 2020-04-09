import React from 'react';
import styled from 'styled-components/native';
import Input from '../../components/Input';
import Vertical from '../../components/Vertical';
import HorizontalSlider from '../../components/HorizontalSlider';
import ScrollContainer from '../../components/ScrollContainer';

const Container = styled.ScrollView`
    background-color: black;
`;

export default ({movies, shows, onChange, onSubmit, keyword}) => ( 
    <ScrollContainer refreshFn={onSubmit} loading={false} refreshFn={onSubmit} contentContainerStyle={{paddingTop: 10}}>
        <Input placeholder={"Search a Keyword"} value={keyword} onChange={onChange} onSubmit={onSubmit}/>
        {movies.length !== 0 && (
        <HorizontalSlider title="Movie Results">
            {movies.map(movie => <Vertical
                    id={movie.id}
                    key={movie.id} 
                    poster={movie.poster_path} 
                    title={movie.title}
                    votes={movie.vote_average}
                />
            )}
        </HorizontalSlider>
        )}
        {shows.length !== 0 && (
        <HorizontalSlider title="TV Results">
            {shows.map(show => <Vertical
                    isTV = {true}
                    id={show.id}
                    key={show.id} 
                    poster={show.poster_path} 
                    title={show.name}
                    votes={show.vote_average}
                />
            )}
        </HorizontalSlider>
        )}
    </ScrollContainer>
)

//React elements is true;