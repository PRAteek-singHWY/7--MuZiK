import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react"
import { FreeMode } from "swiper"
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useGetTopTracksQuery } from "../redux/services/MuzikCore";
import "swiper/css"
import "swiper/css/free-mode"
import PlayPause from "../components/PlayPause";
const TopChartCard = ({ song, i, activeSong, isPlaying, handlePauseClick, handlePlayClick }) => {

    return (
      <div className=" w-full flex flex-row items-center hover:bg-customGreen rounded-lg cursor-pointer py-2 p-4 mb-2 " >
        <h3 className="text-white font-bold text-base mr-3">{i + 1}. </h3>
        <div className="relative flex-1 flex flex-row justify-between items-center" >
          <img
            className="w-20 h-20 rounded-lg"
            src={song?.images.coverart}
            alt={song.title}
          />
          <div className="flex flex-1 flex-col ml-6 justify-center  ">
  
            {/* //title of song bounded inside a link */}
            <p className="font-semibold text-lg text-white overflow-hidden">
              <Link to={`/songs/${song?.key}`}>
                <span className="block overflow-hidden text-ellipsis">
                  {song.title}
                </span>
              </Link>
            </p>
  
            {/* here rdirecting to link where you see artist  and song details using artist adamid something like that*/}
  
            <p className="text-sm text-gray-300 mt-1">
              <Link to={song.artists ? `/artists/${song?.artists[0]?.adamid}` : '/top-artists'}>
                {song.subtitle}
              </Link>
            </p>
  
          </div>
  
        </div>
        <PlayPause
          isPlaying={isPlaying}
          activeSong={activeSong}
          song={song}
          handlePause={handlePauseClick}
          handlePlay={handlePlayClick}
        />
      </div>
    )
  }


const TopCharts = () => {

    const dispatch = useDispatch()

    //TO SELeCT A SPECIFIC SLICE(state) we use use SElector selct and use it(state) 
    const { activeSong, isPlaying } =
      //e.g  useSelector((CAKE) => CAKE.VANILLA.)
      useSelector((state) => state.player)
  
    //using the api
    const { data } = useGetTopTracksQuery()
  
    // making divRef work to scroll to top
    const divRef = useRef(null)
  
    useEffect(() => {
      divRef.current.scrollIntoView({ behavior: "smooth" })
    })
  
  
    const topPlays = data?.tracks
    .slice(0, 20)
    .filter((song)=>song.hub?.actions)
  
  
    const handlePauseClick = () => {
      dispatch(playPause(false))
    }
  
    const handlePlayClick = (song, i) => {
      dispatch(setActiveSong({ song, i, data }));
      // playPause is all about whether the song is currently playing or not
      dispatch(playPause(true))
      //playPause coming from PlayersSlice
    }
  
    return (
      <div ref={divRef} className="xl:ml-6 ml-0 xl:mb-0 mb-6 max-w-full flex flex-col">
  
  
        {/* Top CHarts and see more */}
        <div className="w-full flex flex-col">
  
          <div className="flex flex-row justify-between items-center" >
            <h2 className="font-bold text-white text-2xl">Top Hits</h2>
            <Link to="/top-charts" >
              <p className="text-gray-300 text-base cursor-pointer hover:text-yellow-400">see more</p>
            </Link>
          </div>
          <div className="mt-4 flex flex-col gap-1  ">
            {topPlays?.map((topSong, i) => (
              <TopChartCard
                key={topSong.key}
                song={topSong}
                i={i}
                activeSong={activeSong}
                isPlaying={isPlaying}
                handlePauseClick={() => handlePauseClick(topSong, i)}
                handlePlayClick={() => handlePlayClick(topSong, i)}
              />
            ))}
          </div>
  
        </div>
  
  
        
  
      </div>
  
    )
}




export default TopCharts;
