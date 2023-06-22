import { useParams } from "react-router-dom";
import { useGetSearchBarQuery } from "../redux/services/MuzikCore";
import { Loader ,Error, Searchbar, SongCard} from "../components";
import { useSelector } from "react-redux";



const Search = () => {

  const {searchTerm} = useParams()
  
  // to use a specific state we use useSelector
  const { activeSong, isPlaying } =
    useSelector((state) => state.player)
  const{data:searchData,isFetching:isSearching,error} = useGetSearchBarQuery({searchTerm})
  if(isSearching) return <Loader title="Searching Songs..."  />
  if(error) return <Error />
const searchedSongs = searchData?.tracks?.hits
console.log(searchData)

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Showing results for <span className="font-black">{searchTerm}</span></h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {searchedSongs?.map((song, i) => (
         <SongCard

key={song.key}
song={song?.track}
isPlaying={isPlaying}
activeSong={activeSong }
data={searchData}
i={i}
isSearch = "searching"
/>
         
        ))}
      </div>
    </div>
  );
}

export default Search;
