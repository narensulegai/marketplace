import React from 'react';
import PropTypes from 'prop-types';
import { apiUrl } from '../../util/fetch';

const ProgressBar = ({ completed }) => {

    const containerStyles = {
        height: 20,
        width: '100%',
        backgroundColor: "#e0e0de",
        borderRadius: 4,
        margin: 50
    }
    
    const fillerStyles = {
        height: '100%',
        width: `${completed}%`,
        backgroundColor: 'green',
        borderRadius: 'inherit',
        textAlign: 'right'
    }
    
    const labelStyles = {
        padding: 5,
        color: 'white',
        fontWeight: 'bold'
    }
    
    return (
        <div style={containerStyles}>
          <div style={fillerStyles}>
            <span style={labelStyles}>{`${completed}%`}</span>
          </div>
        </div>
      );
}

ProgressBar.propTypes = {
    bgcolor: PropTypes.string,
    completed: PropTypes.number
  };

export default ProgressBar;