import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';

import { Container, 
    SearchContainer, 
    Input, 
    SearchButton, 
    Title, 
    BannerButton, 
    Banner,
    SliderMovie } from './styles';

import Header from '../../components/Header';
import { Feather } from '@expo/vector-icons'
import SliderItem from '../../components/SliderItem';
import api, { key } from '../../services/api'
import { getListMovies } from '../../utils/movies'
//import { useEffect, useState } from 'react';
//import { Title } from '../../components/Header/styles';

function Home(){

    const [nowMovies, setNowMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [topMovies, setTopMovies] = useState([]);


    useEffect(() => {
        let isActive = true;

        async function getMovies(){
     /*         const response = await api.get('/movie/now_playing',{
                params:{
                    api_key: key,
                    language: 'pt-BR',
                    page:1,
                }
            }) */

            const [nowData, popularData, topData] = await Promise.all([
                api.get('/movie/now_playing', {
                    params:{
                        api_key: key,
                        language: 'pt-BR',
                        page:1
                    }
                }),
                api.get('/movie/popular', {
                    params:{
                        api_key: key,
                        language: 'pt-BR',
                        page:1,
                    }
                }),
                api.get('/movie/top_rated', {
                    params:{
                        api_key: key,
                        language: 'pt-BR',
                        page:1,
                    }
                }),
            ])

            const nowList = getListMovies(10,nowData.data.results);
            const popularList = getListMovies(10,popularData.data.results);
            const topList = getListMovies(5,topData.data.results);

            setNowMovies(nowList);
            setPopularMovies(popularList);
            setTopMovies(topList);


        } 

       

        getMovies();

    }, []);





    return(
        <Container>
            <Header title ="React Flix"/>

            <SearchContainer>
                <Input
                placeholderTextColor="#ddd"
                  />
                <SearchButton>
                    <Feather name="search" size={30} color="#FFF"/>
                </SearchButton>

            </SearchContainer>

            <ScrollView showsVerticalScrollIndicator={false}>
                <Title>Em cartaz</Title>
                <BannerButton activeOpacity={0.9} onPress={() => alert
                ('teste')}>
                    <Banner
                    resizeMethod= 'resize'
                    source={{uri:'data:image/jpeg;base64,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'}}
                    />
                </BannerButton>

                <SliderMovie
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={nowMovies}
                    renderItem={({ item }) => <SliderItem data={item}/> }
                    keyExtractor={(item)=> String(item.id)}
                />

                <Title>Populares</Title>

                
                <SliderMovie
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={popularMovies}
                    renderItem={({ item }) => <SliderItem data={item}/> }
                    keyExtractor={(item)=> String(item.id)}
                />

                <Title>Mais Votados</Title>

                                
                <SliderMovie
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={topMovies}
                    renderItem={({ item }) => <SliderItem data={item}/> }
                    keyExtractor={(item)=> String(item.id)}

                />

            </ScrollView>

            




        </Container>
    )
}
export default Home;