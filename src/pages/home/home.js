import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import MovieList from "../../components/movieList/movieList";
import './home.css'; // Import your custom CSS

const Home = () => {
    const [popularMovies, setPopularMovies] = useState([]);

    useEffect(() => {
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US")
            .then(res => res.json())
            .then(data => setPopularMovies(data.results));
    }, []);

    return (
        <div className="relative bg-black text-white mt-16">
            <Carousel
                showThumbs={false}
                autoPlay={true}
                infiniteLoop={true}
                showStatus={false}
                showIndicators={false} // Disable footer circles
                transitionTime={500}
                className="w-full h-[50vh] sm:h-[60vh] md:h-[70vh]"
            >
                {
                    popularMovies.map(movie => (
                        <Link
                            key={movie.id}
                            to={`/movie/${movie.id}`}
                            className="relative block w-full h-full"
                            style={{ textDecoration: "none", color: "white" }}
                        >
                            <div className="relative w-full h-full">
                                <img
                                    className="w-full h-[50%] sm:h-[60%] md:h-[70%] object-cover"
                                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                                    alt={movie.original_title}
                                />
                                <div className="flex flex-col justify-start sm:justify-end p-4 bg-gradient-to-t from-black/50 to-transparent w-full h-[50%] sm:h-[40%] md:h-[30%]">
                                    <div className="font-bold text-xs sm:text-sm md:text-lg mb-2 bg-gray-900/70 p-2 sm:p-4 rounded-lg">
                                        {movie.original_title}
                                    </div>
                                    <div className="text-xs sm:text-sm md:text-base mb-2 bg-gray-800/70 p-2 sm:p-4 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center">
                                        <span>{movie.release_date}</span>
                                        <span className="mt-1 sm:mt-0 flex items-center">
                                            {movie.vote_average}
                                            <i className="fas fa-star text-yellow-400 ml-2" />
                                        </span>
                                    </div>
                                    <div className="italic text-xs sm:text-sm md:text-base bg-gray-700/70 p-2 sm:p-4 rounded-lg">
                                        {movie.overview.slice(0, 100) + "..."}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </Carousel>
            <MovieList className="mt-12" /> {/* Add margin to push MovieList down */}
        </div>
    );
};

export default Home;