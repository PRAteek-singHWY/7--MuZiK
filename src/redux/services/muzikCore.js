// main file to make API calls

//1-> importing two utility fun's comin' from redux-tool-kit

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

// Importing the dotenv package to load environment variables
// require('dotenv').config();

export const muzikCoreApi = createApi({

  //1->/reducer path for an API
  reducerPath: "muzikCoreApi",

  //2->/baseQuery for Api (a function call with an object)
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam.p.rapidapi.com/"
    ,
    prepareHeaders: (headers) => {
      headers.set("X-RapidAPI-Key", process.env.RAPID_KEY);

      headers.set("X-RapidAPI-Host", "shazam.p.rapidapi.com");

      return headers;
    }
  }),
  //3->/endpoints for Api
  endpoints: (builder) => ({


    getTopTracks: builder.query({
      query: () => "/charts/track",
    }),

    getSongDetails: builder.query(
      {
        query: ({ songid }) => `/songs/get-details?key=${songid}&locale=en-US`
      }),

    getSongRelated: builder.query({
      query: ({ songid }) => `/songs/list-recommendations?key=${songid}&locale=en-US`
    }),

    getArtistDetails: builder.query({
      query: ({ artistid }) => `/artists/get-details?id=${artistid}&l=en-US`
    })
    ,
    getArtistTopSongs: builder.query({
      query: ({ artistid }) => `artists/get-top-songs?id=${artistid}&l=en-US`
    })
    ,
    getArtistSummary: builder.query({
      query: ({ artistid }) => `artists/get-summary?id=${artistid}&l=en-US`
    })
    ,

    getChartsByCountry: builder.query({
      query: () => `/charts/list`
    })


,
  getSearchBar:builder.query({
  query:({searchTerm})=> `/search?term=${searchTerm}` 
  })

  }),
})
  


export const {
  useGetSearchBarQuery,
  useGetChartsByCountryQuery,
  useGetArtistSummaryQuery,
  useGetArtistTopSongsQuery,
  useGetSongRelatedQuery,
  useGetArtistDetailsQuery,
  useGetSongDetailsQuery,
  useGetTopTracksQuery
} = muzikCoreApi
























