// components/Loader.js
import { useLoader } from 'context/LoaderContext';
import React from 'react';
import { Spinner } from 'reactstrap';

const Loader = () => {
  const { loading } = useLoader();
  

  const loaderStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1000,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '10px',
    padding: '20px',
  };
  

  if (!loading) return null;

  return (
    <div className="loader" style={loaderStyle}>
      <Spinner style={{ width: '3rem', height: '3rem' }} />
    </div>
  );
};

export default Loader;
