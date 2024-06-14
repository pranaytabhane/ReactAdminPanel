import React from "react";
import './comingSoon.scss';

const ComingSoon = ({ comingSoon }) => {
  return (
    <>
      <div className="coming-soon d-flex align-items-center justify-content-center p-3">
        <label className="text-center">
          <img src={comingSoon.image} alt="Coming Soon" />
        </label>
      </div>
    </>
  );
};
ComingSoon.defaultProps = {
  comingSoon: {
    image: require('../../assets/img/comingsoon.png')
  }
};
export default ComingSoon;