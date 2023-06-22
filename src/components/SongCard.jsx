import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

// DISPATCH (ADD CHOHCO)
// DISPATCH (ADD BUTTTER SCHCOCH)
// CAKE -> SELECTORS(PIECES)
const SongCard = ({ song, i, activeSong, isPlaying, data ,isSearch}) => {
  const dispatch = useDispatch()

  const handlePauseClick = () => {
    dispatch(playPause(false))
  }
  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    // playPause is all about whether the song is currently playing or not
    dispatch(playPause(true))
    //playPause coming from PlayersSlice
  }
  return (
    //implementing our song card
    <div className="flex flex-col w-[250px] flex-wrap p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer " >

      <div className="relative w-full h-56 group">

        <div className={`absolute inset-0 justify-center items-center bg-customGreen bg-opacity-50 group-hover:flex 
      ${activeSong?.title === song.title ? "flex bg-black bg-opacity-70" : "hidden"}`} >

          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />

        </div>
        {/* song Image */}

          <img
            src={song.images?.coverart}
            alt="song_img"
          />



      </div>
      <div className="mt-4 flex flex-col">

        {/* here redirecting to link where u see the song details page using key */}

        {/* <p className="font-semibold text-lg text-white truncate">
          <Link to={`/songs/${song?.key}`}>
            {song.title}
          </Link>
        </p> */}
        <p className="font-semibold text-lg text-white overflow-hidden">
          <Link to={`/songs/${song?.key}`}>
            <span className="block overflow-hidden text-ellipsis">
              {song.title}
            </span>
          </Link>
        </p>

        {/* here rdirecting to link where you see artist  and song details using artist adamid something like that*/}

        {/* <p className="truncate text-sm text-gray-300 mt-1">
        <Link to={song.artists ? `/artists/${song?.artists[0]?.adamid}` : '/top-artists'}>
            {song.subtitle}
          </Link>
        </p> */}
        <p className="text-sm text-gray-300 mt-1">
          <Link to={song.artists ? `/artists/${song?.artists[0]?.adamid}` : '/top-artists'}>
            {song.subtitle}
          </Link>
        </p>
      </div>
    </div>




  )

};

export default SongCard;
