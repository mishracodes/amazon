import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
const Banner = () => {
    return (
        <div className='relative'>
            <div className='absolute w-full h-56 bg-gradient-to-t from-gray-300 to-transparent bottom-0 z-10'/>
            <Carousel showStatus={false} showIndicators={false} showThumbs={false} infiniteLoop={true} autoPlay={true} interval={2000}>
                <div>
                    <img loading='lazy' src="https://m.media-amazon.com/images/I/71cQMXCLSvL._SX3000_.jpg" />
                </div>
                <div>
                    <img loading='lazy' src="https://m.media-amazon.com/images/I/51DWgNo1fdL._SX3000_.jpg" />
                </div>
                <div>
                    <img loading='lazy' src="https://m.media-amazon.com/images/I/61uCGEEpkIL._SX3000_.jpg" />
                </div>
                <div>
                    <img loading='lazy' src="https://m.media-amazon.com/images/I/61Mg0xsfbbL._SX3000_.jpg" />
                </div>
                <div>
                    <img loading='lazy' src="https://m.media-amazon.com/images/I/71vdTR50hFL._SX3000_.jpg" />
                </div>
            </Carousel>
        </div>

    )
}

export default Banner