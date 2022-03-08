import React from 'react';
// Image
import stars from '../images/stars.png';
import rocketman from '../images/rocketman.png';
// Css
import '../styles/langing.css';

const Langing  = ({ handleStart, handleSubmitted }) => {

  return (
    <div className="langing-container">
      <img className="stars-img" src={stars} alt="stars background" />
      {/* Heading text */}
      <div className="langing-heading-text-div">
        <h1>Welcome Rocketeer !</h1>
      </div>
      {/* Buttons */}
      <div className="langing-buttons-div">
        <button className="langing-start-btn" onClick={() => handleStart(1)}>Start Questionnaire</button>
        <button className="langing-apps-btn" onClick={handleSubmitted}>Submitted Applications</button>
      </div>
      {/* Rocketman */}
      <div className="rocketman-div">
        <img src={rocketman} alt="rocketman" />
      </div>
    </div>
  );
}

export default Langing;