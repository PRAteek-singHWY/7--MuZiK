import React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios"
//redux imports
import { useSelector } from 'react-redux';
import { Error, Loader, SongCard } from '../components';
import { useGetChartsByCountryQuery } from '../redux/services/MuzikCore';

const CountryTracks = () => {
    const [country, setCountry] = useState("")
    const [loading, setLoading] = useState(true)
    const { activeSong, isPlaying } =
        //e.g  useSelector((CAKE) => CAKE.VANILLA.)
        useSelector((state) => state.player)
    //to know where we are
    //use effect hook will be ran when we visit the around you  page tab and fetch where we are and hence fetch out the songs around you

    useEffect(() => {
        //inside here making an api call to geoapify API
        // f5a1b0393f3f4158b12f3f82b511dd7d 
        axios.get("https://api.geoapify.com/v1/ipinfo?apiKey=f5a1b0393f3f4158b12f3f82b511dd7d")
            .then((res) => setCountry(res?.data?.country?.iso_code))
            .catch((err) => console.log(err))
            .finally(() => setLoading(false))
    }, [country])
    // console.log(country)

    //useEffect(()=>{ -- structure nad calling pattern
    // {inside here lies my main function}
    //}, //{inside her lies the part where the function gets recalled })


    //getting country songs(around-you)  ⬇️
    const { data: countryData, isFetching: isFetchingCountryDetails, error } =
        useGetChartsByCountryQuery()


    if (isFetchingCountryDetails) return <Loader title="Loading Sounds around you" />
    if (error && country) return <Error />

    {/* //countryData?.countries.?id === country */ }


    const COUNTRIES = countryData?.countries
    // console.log(COUNTRIES[0])


    console.log('country:', country);

    return (

        <div className="flex flex-col">
            {/* this div's wrapper of songs around us */}

            <h2 className="font-bold mt-4 mb-10 text-3xl  text-white text-left">Top Genres Around You  </h2>
            <div className="flex flex-wrap sm:justify-start justify-center gap-8">


            <div className="text-gray-400  flex flex-col font-bold text-3xl justify-left gap-4">
  {COUNTRIES.map((COUNTRY, i) => {
    return COUNTRY.id ===country  ? (
      COUNTRY?.genres?.map((genre, index) => (
        <h1>{genre.name}</h1>
      ))
    ) : (
      null
    );
  })}
</div>



            </div>

        </div>
    )
}
export default CountryTracks;
