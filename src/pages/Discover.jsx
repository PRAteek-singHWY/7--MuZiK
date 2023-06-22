import { Error, Loader, SongCard } from "../components";
import { genres } from "../assets/constants"
//importing the GetTopTracks 
import { useGetTopTracksQuery } from "../redux/services/MuzikCore";
import { useDispatch, useSelector } from "react-redux";
import { selectGenreListId } from "../redux/features/playerSlice";

// dispatch -> modified query to get a specific gener and the selector will be bale to fetch taht modified  state is gonna get us that midfied query

const Discover = () => {


    const dispatch = useDispatch()
    //TO SELCT A SPECIFIC SLICE(state) we use use SElector selct and use it(state) 
    const { activeSong, isPlaying,genreListId } =
        //e.g  useSelector((CAKE) => CAKE.VANILLA.)
        useSelector((state) => state.player)

    // console.log(activeSong)
    //1-/whole data that is being fetched
    //2-/is Fetching if we r currently fetching to show the loading state
    //3-/error to know if error has happened
    const { data, isFetching, error } = useGetTopTracksQuery()
    const genreTitle = "Pop"
    // console.log(data)
    // console.log(genres)

    if (isFetching) return <Loader
        title="Loading songs..."
    />
    if (error) return <Error />

    //array of tracks filtered out to filter out Songs whic are not available
    const filteredTracks = data?.tracks.filter((song) => song.hub?.actions);

        // Filter out tracks without actions in the hub
        
    return (
        <div className="flex flex-col ">
            <div className="w-full flex justify-between items-center flex-col sm:flex-row mt-4 mb-10">
                <h2 className="font-bold text-3xl text-white text-left" >Discover {genreTitle}</h2>
                <select
                    onChange={(event) => dispatch(selectGenreListId(event.target.value))}
                    value={genreListId || "pop"}
                    className="
                bg-black text-gray-300 rounded-lg outline-none sm:mt-0 mt-5">
                    {/* {} -> curly braces inside html means we r using J.S inside html and this is called dynamic block of code ⬇️ */}
                    {genres.map((genre) =>

                        <option key={genre.value}
                            value={genre.value}>
                            {genre.title}
                        </option>
                    )}
                </select>
            </div>
            {/* song wrapper->basically songs of that selected genre right!! */}
            <div className="flex flex-wrap sm:justify-start justify-center gap-8">

            



  {
  filteredTracks.map((song, i) => (
    <SongCard
                
                key={song.key}
                song={song}
                data={data}
                i={i}
                activeSong={activeSong}
                isPlaying={isPlaying}
            />
  ))}
            </div>


        </div>


    )
}
export default Discover;
