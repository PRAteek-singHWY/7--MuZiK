
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { useGetArtistDetailsQuery, useGetArtistTopSongsQuery, useGetArtistSummaryQuery } from "../redux/services/MuzikCore";


const ArtistDetails = () => {
  const dispatch = useDispatch()

  const { artistid } = useParams()

  // console.log(id)

  // to use a specific state we use useSelector
  const { activeSong, isPlaying } =
    useSelector((state) => state.player)

  

  //getting ArtistDetails⬇️
  const { data: artistData, isFetching: isFetchingArtistDetails, error } =
    useGetArtistDetailsQuery({ artistid })
  // console.log(artistData)

  //getting Artists Summary ⬇️
  const { data: sumData, isFetching: isFetchingSum } =
    useGetArtistSummaryQuery({ artistid })
  // console.log(sumData.resources.songs)

  //getting top songs Related to this Song' Artist ⬇️
  const { data: topData, isFetching: isFetchingTop } =
    useGetArtistTopSongsQuery({ artistid })
  // console.log(topData)


  if (isFetchingArtistDetails || isFetchingTop || isFetchingSum) return <Loader />
  if (error) return <Error />

  const handlePauseClick = () => {
    dispatch(playPause(false))
  }

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, i, topData  }));
    // playPause is all about whether the song is currently playing or not
    dispatch(playPause(true))
    //playPause coming from PlayersSlice
  }

  return (
    <div className="flex flex-col" >

      <DetailsHeader
        artistId={artistid}
        artistData={artistData}
      />
      
      <RelatedSongs
       data={Object.values(topData?.data)}
       
     
        artistId={artistid}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
              handlePlayClick={handlePlayClick}
    

      />
    </div>
  )

}

export default ArtistDetails;
