import React from "react";

const Tour = ({ tour, tourClick }) => {
  return (
    <button className="tourlist" onClick={tourClick}>
      {tour}
    </button>
  );
};

export default Tour;
