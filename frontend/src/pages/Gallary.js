import React from "react";
import img1 from '../assets/gallary/IMG-20250228-WA0001.jpg';
import img2 from '../assets/gallary/IMG-20250228-WA0002.jpg';
import img3 from '../assets/gallary/IMG-20250228-WA0003.jpg';
import img4 from '../assets/gallary/IMG-20250228-WA0004.jpg';
import img5 from '../assets/gallary/IMG-20250228-WA0005.jpg';
import img6 from '../assets/gallary/IMG-20250228-WA0016.jpg';
import img7 from '../assets/gallary/IMG-20250228-WA0007.jpg';
import img8 from '../assets/gallary/IMG-20250228-WA0008.jpg';
import img9 from '../assets/gallary/IMG-20250228-WA0009.jpg';
import img10 from '../assets/gallary/IMG-20250228-WA0010.jpg';
import img11 from '../assets/gallary/IMG-20250228-WA0011.jpg';
import img12 from '../assets/gallary/IMG-20250228-WA0012.jpg';
import img13 from '../assets/gallary/IMG-20250228-WA0013.jpg';
import img14 from '../assets/gallary/IMG-20250228-WA0014.jpg';
import img15 from '../assets/gallary/IMG-20250228-WA0015.jpg';
import '../styles/Gallary.css';

const Gallary=()=>{
    return(
        <div>
            <div className="main-div">
                <div className="gallary-heading">
                    <h1 className='gallary-section-h2'>Explore Our Beautiful Gallery</h1>
                </div>
            
            
            <div className="sub-div">
            <div className="image-gallary">
                <img src={img10} alt="one" />
            </div>
            <div className="image-gallary">
                <img src={img11} alt="one" />
            </div>
            <div className="image-gallary">
                <img src={img12} alt="one" />
            </div>
            </div>
            <div className="sub-div">
            <div className="image-gallary">
                <img src={img13} alt="one" />
            </div>
            <div className="image-gallary">
                <img src={img14} alt="one" />
            </div>
            <div className="image-gallary">
                <img src={img15} alt="one" />
            </div>
            </div>
            <div className="sub-div">
            <div className="image-gallary">
                <img src={img4} alt="one" />
            </div>
            <div className="image-gallary">
                <img src={img5} alt="one" />
            </div>
            <div className="image-gallary">
                <img src={img6} alt="one" />
            </div>
            </div>
            <div className="sub-div">
            <div className="image-gallary">
                <img src={img7} alt="one" />
            </div>
            <div className="image-gallary">
                <img src={img8} alt="one" />
            </div>
            <div className="image-gallary">
                <img src={img9} alt="one" />
            </div>
            </div>
            <div className="sub-div">
            <div className="image-gallary">
                <img src={img1} alt="one" />
            </div>
            <div className="image-gallary">
                <img src={img2} alt="one" />
            </div>
            <div className="image-gallary">
                <img src={img3} alt="one" />
            </div>
            </div>
            </div>
        </div>
    )
}
export default Gallary;