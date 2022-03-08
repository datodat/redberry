import React from 'react';
// CSS
import '../styles/submit.css';

const Submit = ({ changePage, handleSubmit, removeObject }) => {

  const goBack = () => {
    removeObject();
    changePage(4);
  }

  return (
    <div className="submit-container">
      <div>
        <button className="submit" onClick={handleSubmit} >Submit</button>
        <button className="go-back" onClick={goBack} >go back</button>
      </div>
    </div>
  );
}

export default Submit;