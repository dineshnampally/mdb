import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const Movie = () => {
    const [currentMovieDetail, setMovie] = useState();
    const { id } = useParams();

    useEffect(() => {
        getData();
        window.scrollTo(0, 0);
    }, []);

    const getData = () => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
            .then(res => res.json())
            .then(data => setMovie(data));
    };

    return (
        <div className="movie flex flex-col items-center w-full relative bg-[#001d3d] text-[#ffd60a]">
            <div className="movie__intro w-full relative overflow-hidden">
                <img
                    className="movie__backdrop w-full h-auto object-cover object-center transition-transform duration-500 hover:scale-105"
                    src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.backdrop_path : ""}`}
                    alt={currentMovieDetail ? currentMovieDetail.original_title : "Backdrop"}
                />
            </div>
            <div className="movie__detail flex flex-col lg:flex-row items-center lg:items-start lg:justify-between w-full px-4 lg:px-8 lg:w-4/5 relative -top-24 lg:-top-32">
                <div className="movie__detailLeft mb-4 lg:mb-0 lg:mr-8 flex-shrink-0">
                    <div className="movie__posterBox">
                        <img
                            className="movie__poster w-[300px] xl:w-[400px] 2xl:w-[500px] rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
                            src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.poster_path : ""}`}
                            alt={currentMovieDetail ? currentMovieDetail.original_title : "Poster"}
                        />
                    </div>
                </div>
                <div className="movie__detailRight text-[#ffffff] flex flex-col flex-grow">
                    <div className="movie__detailRightTop mb-4">
                        <div className="movie__name text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-2">
                            {currentMovieDetail ? currentMovieDetail.original_title : ""}
                        </div>
                        <div className="movie__tagline text-xs sm:text-sm lg:text-base xl:text-lg 2xl:text-xl mb-2 italic">
                            {currentMovieDetail ? currentMovieDetail.tagline : ""}
                        </div>
                        <div className="movie__rating flex items-center mb-2 text-xs sm:text-sm lg:text-base xl:text-lg 2xl:text-xl">
                            {currentMovieDetail ? currentMovieDetail.vote_average : ""} <i className="fas fa-star text-yellow-400 ml-2" />
                            <span className="movie__voteCount ml-2 text-xs sm:text-sm lg:text-base xl:text-lg 2xl:text-xl">
                                {currentMovieDetail ? `(${currentMovieDetail.vote_count}) votes` : ""}
                            </span>
                        </div>
                        <div className="movie__runtime mb-2 text-xs sm:text-sm lg:text-base xl:text-lg 2xl:text-xl">
                            {currentMovieDetail ? `${currentMovieDetail.runtime} mins` : ""}
                        </div>
                        <div className="movie__releaseDate mb-2 text-xs sm:text-sm lg:text-base xl:text-lg 2xl:text-xl">
                            {currentMovieDetail ? `Release date: ${currentMovieDetail.release_date}` : ""}
                        </div>
                        <div className="movie__genres flex flex-wrap mt-4">
                            {
                                currentMovieDetail && currentMovieDetail.genres
                                    ? currentMovieDetail.genres.map(genre => (
                                        <span key={genre.id} className="movie__genre px-3 py-1 border-2 border-[#003566] rounded-full mr-2 mb-2 text-xs sm:text-sm lg:text-base xl:text-lg 2xl:text-xl">
                                            {genre.name}
                                        </span>
                                    ))
                                    : ""
                            }
                        </div>
                    </div>
                    <div className="movie__detailRightBottom">
                        <div className="synopsisText text-xl sm:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-semibold mb-4">Synopsis</div>
                        <div className="text-xs sm:text-sm lg:text-base xl:text-lg 2xl:text-xl">
                            {currentMovieDetail ? currentMovieDetail.overview : ""}
                        </div>
                    </div>
                </div>
            </div>
            <div className="movie__links w-full px-4 lg:px-8 flex flex-col lg:flex-row justify-between gap-6 lg:gap-12 mb-12 relative -top-12">
                <div className="movie__heading text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl mb-4">Useful Links</div>
                {
                    currentMovieDetail && currentMovieDetail.homepage &&
                    <a href={currentMovieDetail.homepage} target="_blank" rel="noopener noreferrer" className="movie__homeButton movie__Button bg-[#003566] text-[#ffd60a] px-4 py-2 rounded-lg flex items-center transition-transform duration-300 hover:scale-105">
                        Homepage <i className="newTab fas fa-external-link-alt ml-2"></i>
                    </a>
                }
                {
                    currentMovieDetail && currentMovieDetail.imdb_id &&
                    <a href={`https://www.imdb.com/title/${currentMovieDetail.imdb_id}`} target="_blank" rel="noopener noreferrer" className="movie__imdbButton movie__Button bg-[#ffc300] text-[#001d3d] px-4 py-2 rounded-lg flex items-center transition-transform duration-300 hover:scale-105">
                        IMDb <i className="newTab fas fa-external-link-alt ml-2"></i>
                    </a>
                }
            </div>
            <div className="movie__heading text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl mb-4">Production companies</div>
            <div className="movie__production flex flex-wrap justify-center items-end mb-16 w-full px-4 lg:px-8">
                {
                    currentMovieDetail && currentMovieDetail.production_companies && currentMovieDetail.production_companies.map(company => (
                        company.logo_path && (
                            <div key={company.id} className="productionCompanyImage flex flex-col items-center justify-center m-4">
                                <img
                                    className="movie__productionCompany w-[150px] md:w-[200px] xl:w-[300px] transition-transform duration-300 hover:scale-105 bg-white"
                                    src={`https://image.tmdb.org/t/p/original${company.logo_path}`}
                                    alt={company.name}
                                />
                                <span className="text-sm sm:text-base xl:text-lg 2xl:text-xl mt-2">{company.name}</span>
                            </div>
                        )
                    ))
                }
            </div>
        </div>
    );
};

export default Movie;
