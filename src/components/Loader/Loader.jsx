import React from 'react';
import s from './Loader.module.css';
import { Oval } from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const Loader = () => {
  return (
    <div className={s.loaderContainer}>
      <Oval
        ariaLabel="loading-indicator"
        height={100}
        width={100}
        strokeWidth={5}
        strokeWidthSecondary={1}
        color="#F9F0DA"
        secondaryColor="#A3D0C3"
      />
    </div>
  );
};

export default Loader;
