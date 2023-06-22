import React from 'react';
import { Link } from 'react-router-dom';

import PlayPause from './PlayPause';

const SongBar = ({ song, i, artistId, isPlaying, activeSong, handlePauseClick, handlePlayClick }) => (
  <div className={`w-full flex flex-row items-center hover:bg-[#849041] ${activeSong?.title === song?.title ? 'bg-gradient-to-tr from-white/10 to-[#436a3c]' : 'bg-transparent'} py-2 p-4 rounded-lg  mb-2`}
  >

    <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
    <div className="flex-1 flex flex-row justify-between items-center">
      <img
        className="w-20 h-20 rounded-lg"
        src={artistId ? song.artwork?.url?.replace('{w}', '125').replace('{h}', '125') : song?.images?.coverart}
        alt={song?.title}
      />
      <div className="flex-1 flex flex-col justify-center mx-3">



        {!artistId ? (
          <Link to={`/songs/${song.key}`}>
            <p className="text-xl font-bold text-white cursor-pointer  ">
              {song?.title}
            </p>
          </Link>
        ) : (
            <span className="text-xl font-bold text-white">
            {song?.name}
            </span>
         







        )}
        {/* <p className="text-base text-gray-300 mt-1">
          {artistId ? song?.attributes?.albumName : song?.subtitle}
        </p> */}

        {!artistId ?
          <p className="text-sm  text-gray-300 mt-1">
            <Link to={song.artists ? `/artists/${song?.artists[0]?.adamid}` : '/top-artists'}>
              {song.subtitle}
            </Link>
          </p> :

          <p className="text-white text-sm ">

            {song?.albumName}



          </p>


        }


      </div>
    </div>
    {!artistId
      ? (
        <PlayPause
          isPlaying={isPlaying}
          activeSong={activeSong}
          song={song}
          handlePause={handlePauseClick}
          handlePlay={() => handlePlayClick(song, i)}
        />
      )
      : 
    null
      
      }
  </div>
);

export default SongBar;


