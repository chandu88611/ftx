import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ImageSlider = ({ images }) => {
  return (
    <div className="flex flex-col">
      <Carousel>
        {images.map((image, index) => (
          <div key={index} className="zoomable-image-container">
            <img src={image?.img} alt={`Product Image ${index + 1}`} className="zoomable-image" />
          </div>
        ))}
      </Carousel>
  
    </div>
  );
};

export default ImageSlider;
