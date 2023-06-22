import SongBar from "./SongBar";

const RelatedSongs = ({ data, isPlaying, activeSong, artistId,handlePauseClick ,handlePlayClick}) => {

// console.log(data)
 
  return (
    <div className="flex flex-col ">
      <h1 className="font-bold text-white text-2xl">{ artistId ? "Top Hits :": "Related Songs :"}</h1>

      <div className="mt-6 w-full flex flex-col">
        {
          !artistId ? (
           

            data?.tracks?.map((song, i) => (
            
              <SongBar
              key={`${song.key}-${artistId}`}
              song={song}
              i={i}
              artistId={artistId}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={handlePlayClick}

            />   
                ))




          ):
          
         
          (



            data?.map((song, i) => (
              <SongBar
              key={i}
              song={song.attributes}
              i={i}
              artistId={artistId}
              handlePauseClick={handlePauseClick}
              handlePlayClick={handlePlayClick}

            />
          ))



          )

          
        
        }
      </div>
    </div>

  )
}

export default RelatedSongs;
