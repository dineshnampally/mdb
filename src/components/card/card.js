import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Link } from "react-router-dom";

const Cards = ({ movie }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    }, []);

    return (
        <>
            {isLoading ? (
                <div className="relative inline-block border border-gray-600 rounded-lg overflow-hidden w-full sm:w-[300px] h-[450px] bg-gray-900">
                    <SkeletonTheme color="#202020" highlightColor="#444">
                        <Skeleton height={450} duration={2} />
                    </SkeletonTheme>
                </div>
            ) : (
                <Link to={`/movie/${movie.id}`} className="no-underline text-white">
                    <div className="relative border border-gray-700 rounded-lg overflow-hidden w-full sm:w-[300px] bg-gray-800 group">
                        <img
                            className="w-full h-[100%] object-cover transition-transform duration-300 group-hover:scale-105"
                            src={`https://image.tmdb.org/t/p/original${movie ? movie.poster_path : ""}`}
                            alt={movie ? movie.original_title : "Movie Poster"}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-0 group-hover:opacity-90 transition-opacity duration-300 p-4 flex flex-col justify-end hidden sm:flex">
                            <div className="font-bold text-lg mb-2 bg-gray-700 p-2 rounded-lg">
                                {movie ? movie.original_title : "Movie Title"}
                            </div>
                            <div className="text-sm mb-2 bg-gray-600 p-2 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center">
                                <span>{movie ? movie.release_date : "Release Date"}</span>
                                <span className="mt-1 sm:mt-0">{movie ? movie.vote_average : "N/A"} <i className="fas fa-star text-yellow-400"></i></span>
                            </div>
                            <div className="italic text-sm bg-gray-500 p-2 rounded-lg">
                                {movie ? movie.overview.slice(0, 120) + "..." : "Movie description goes here."}
                            </div>
                        </div>
                        <div className="p-4 flex flex-col sm:hidden bg-gray-800">
                            <div className="font-bold text-lg mb-2 bg-gray-700 p-2 rounded-lg">
                                {movie ? movie.original_title : "Movie Title"}
                            </div>
                            <div className="text-sm mb-2 bg-gray-600 p-2 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center">
                                <span>{movie ? movie.release_date : "Release Date"}</span>
                                <span className="mt-1 sm:mt-0">{movie ? movie.vote_average : "N/A"} <i className="fas fa-star text-yellow-400"></i></span>
                            </div>
                            <div className="italic text-sm bg-gray-500 p-2 rounded-lg">
                                {movie ? movie.overview.slice(0, 120) + "..." : "Movie description goes here."}
                            </div>
                        </div>
                    </div>
                </Link>
            )}
        </>
    );
};

export default Cards;