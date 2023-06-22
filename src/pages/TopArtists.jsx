import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"


import { useGetTopTracksQuery } from "../redux/services/MuzikCore";
import "swiper/css"
import "swiper/css/free-mode"









const TopChartCard = ({ song, i }) => {
    return (
        <div className="w-full flex flex-row items-center hover:bg-customGreen2 
        bg-customGreen
        rounded-lg cursor-pointer py-2 p-4 mb-2
        ">
            <h3 className="text-white font-bold text-base mr-3">{i + 1}. </h3>
            <div className="relative flex-1 flex flex-row justify-between items-center">
                <div className="flex flex-1 flex-col ml-6 justify-center">
                    <Link to={`/artists/${song?.artists[0]?.adamid}`}>
                        <img
                            src={song?.images.background}
                            alt="name"
                            className="rounded-full object-cover w-[125px] h-[125px]"
                        />
                    </Link>
                </div>

                <div className="flex flex-1 flex-col ml-1 justify-center  ">


                    {/* here rdirecting to link where you see artist  and song details using artist adamid something like that*/}

                    <p className="font-bold text-lg text-white overflow-hidden mt-1 ">
                        <Link to={song.artists ? `/artists/${song?.artists[0]?.adamid}` : '/top-artists'}>
                            {song.subtitle}
                        </Link>
                    </p>

                </div>




            </div>
        </div>
    );
};

const TopArtists = () => {
    // using the api
    const { data } = useGetTopTracksQuery();

    // making divRef work to scroll to top
    const divRef = useRef(null);

    useEffect(() => {
        divRef.current.scrollIntoView({ behavior: "smooth" });
    });

    const topPlays = data?.tracks.slice(0, 20).filter((song) => song.hub?.actions);

    return (
        <div ref={divRef} className="xl:ml-6 ml-0 xl:mb-0 mb-6  max-w-full flex flex-col">
            <div className="flex flex-row justify-between items-center">
                <h2 className="font-bold text-white text-2xl">Hit Artists</h2>
            </div>
            <div className="mt-4 flex flex-col gap-1">
                {topPlays?.map((topSong, i) => (
                    <TopChartCard
                        key={topSong.key} song={topSong} i={i}

                    />
                ))}
            </div>
        </div>
    );
};

export default TopArtists;
