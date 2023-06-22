
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { useGetSongDetailsQuery, useGetSongRelatedQuery } from "../redux/services/MuzikCore";


const SongDetails = () => {

    const dispatch = useDispatch()
    const { songid } = useParams()

    // console.log(songid)
    // console.log(id)
    // to use a specific state we use useSelector
    const { activeSong, isPlaying } =
        useSelector((state) => state.player)

    //getting SongDetails⬇️
    const { data: songData, isFetching: isFetchingSongDetails, error} = 
    useGetSongDetailsQuery({ songid })
    // console.log(songData)

    //getting other songs Related to this Song' Artist ⬇️
    const{data:relatedData,isFetching:isFetchingRelated}=
    useGetSongRelatedQuery({songid})
console.log(relatedData)
    

    if (isFetchingRelated || isFetchingSongDetails) return <Loader />
    if (error) return <Error />

    const handlePauseClick = () => {
        dispatch(playPause(false))
      }
    
      const handlePlayClick = (song, i) => {
        dispatch(setActiveSong({ song, i, relatedData  }));
        // playPause is all about whether the song is currently playing or not
        dispatch(playPause(true))
        //playPause coming from PlayersSlice
      }
    return (
        <div className="flex flex-col" >

            <DetailsHeader
                artistId=""
                songData={songData}
            />
            <div className="mb-10" >
                <h2 className="text-white text-3xl font-bold " >
                    Lyrics :
                </h2>
                <div className="mt-5">
                    {songData?.sections[1]?.type === "LYRICS" ?
                        (songData?.sections[1]?.text.map((line, index) =>
                        (
                            <p className="text-gray-400 text-base my-1" >{line}</p>
                        )))
                        :
                        <p className="text-gray-400 text-base my-1">Sorry, no lyrics found</p>}
                </div>
            </div>
            <RelatedSongs
                data={relatedData}
                isPlaying={isPlaying}
                activeSong={activeSong}
                handlePauseClick= {handlePauseClick}
                handlePlayClick={handlePlayClick}

            />
        </div>
    )

}

export default SongDetails;
