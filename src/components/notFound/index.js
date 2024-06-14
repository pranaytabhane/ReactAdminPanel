import React from 'react';
import { Link } from 'react-router-dom';
import './notfound.scss'

const NotFound = () => (
  <div  className="not-found d-flex flex-column align-items-center justify-content-center">
     <div className="not-found-content">  
    <h1>404</h1>
    <p>Page Not Found!</p>
    <p>Oops! The page you were looking for doesn't exist.</p>
    <Link to="/admin/dashboard" className="btn btn-primary">
      Back to home
    </Link>
    </div> 
  </div>
);

export default NotFound;