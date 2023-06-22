import { Link } from "react-router-dom";
const DetailsHeader = ({ artistId, artistData, songData }) => {


  return (
    <div className="relative w-full flex flex-col"
    >



      <div className="w-full bg-gradient-to-l  from-transparent to-[#09350f] sm:h-48 h-28" />

      <div className="absolute inset-0 flex items-center ">
        {/* here using if to check if we have the artist id and accordingly using artist_Data or songaData and coverArt othervwise */}
        <img
          alt="art"
          src={artistId ?
            (artistData?.data[0]?.attributes?.artwork.url
              .replace('{w}', '500')
              .replace('{h}', '500'))
            : (songData?.images?.coverart)}
          className="rounded-full sm:w-48 w-28 sm:h-48 h-28 object-cover border-2 sgadow-xl shadow-[#f2f258]"
        />
        <div className="ml-5 ">
          {/* here using if to check if we have the artist id and accordingly using artist_Data or name othervwise */}
          <p
            className="font-bold  text-white sm:text-3xl text-xl  "
          >{artistId ? (artistData.data[0].attributes.name) : (songData?.title)}
          </p>

          {!artistId && <Link
            to={`/artists/${songData?.artists[0].adamid}`}
          >
            <p className="text-base text-gray-400 mt-2" >{songData?.subtitle}</p>
          </Link>}

          <p className="text-base text-gray-400 mt-2" >
            {artistId
              ? 
            (artistData.data[0].attributes.genreNames) 
            
                
                
                : (songData?.genres?.primary)}

          </p>
        </div>

      </div>
      <div className="w-full sm:h-44 h-24" >
      </div>

    </div>
  )
}

export default DetailsHeader;
