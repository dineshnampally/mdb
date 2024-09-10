// src/components/movieList/movieList.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cards from "../card/card";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './movieList.css'; // Import your custom CSS
import { gallery } from '../../assets/gallery';

const MovieList = () => {
  const [movieList, setMovieList] = useState([]);
  const { type } = useParams();

  useEffect(() => {
    getData();
  }, [type]);

  const getData = () => {
    fetch(`https://api.themoviedb.org/3/movie/${type ? type : "popular"}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
      .then(res => res.json())
      .then(data => setMovieList(data.results));
  };

  const imageUrls = Object.values(gallery);
  const showCarousel = ["popular", "top_rated", "upcoming"].includes(type);

  return (
    <div className={`container ${showCarousel ? 'align-to-header' : ''}`}>
      {showCarousel && (
        <Carousel
          autoPlay
          infiniteLoop
          showArrows={false}
          showThumbs={false}
          showStatus={false}
          showIndicators={false}
          swipeable
          emulateTouch
          interval={3000}
          className={`custom-carousel ${showCarousel ? 'align-to-header' : ''}`}
        >
          {imageUrls.map((image, index) => (
            <div key={index} className="carousel-slide">
              <img src={image} alt={`Slide ${index}`} />
            </div>
          ))}
        </Carousel>
      )}
      <h2 className="text-2xl font-bold mb-10 text-center capitalize">{(type ? type : "POPULAR").toUpperCase()}</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {movieList.map(movie => (
          <Cards key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
