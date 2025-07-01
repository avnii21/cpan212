import React from "react";
import Slider from "react-slick";

const mhacImages = [
  "/mhac1.png",
  "/mhac2.png",
  "/mhac3.png",
  "/mhac4.png",
  "/mhac5.png",
  "/mhac6.png"
];

const movieImages = [
  "/movie1.png",
  "/movie2.png"
];

const Projects = () => {
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <section>
      <h2>Current Projects</h2>

      <div className="project-card">
        <div className="project-info">
          <h3>Medical History App (MHAC)</h3>
          <p>
            A responsive React app fetching and displaying medical provider data using the BetterDoctor API. Features dynamic search, filtering, and robust error handling.
          </p>
        </div>
        <div className="project-image">
          <Slider {...settings}>
            {mhacImages.map((src, idx) => (
              <img key={idx} src={src} alt={`MHAC screenshot ${idx + 1}`} />
            ))}
          </Slider>
        </div>
      </div>

      <div className="project-card">
        <div className="project-info">
          <h3>Movie & Recipe Pairing</h3>
          <p>
            An engaging app connecting popular movie themes with recipes, offering users a fun and interactive experience combining food and film.
          </p>
        </div>
        <div className="project-image">
          <Slider {...settings}>
            {movieImages.map((src, idx) => (
              <img key={idx} src={src} alt={`Movie app screenshot ${idx + 1}`} />
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Projects;
