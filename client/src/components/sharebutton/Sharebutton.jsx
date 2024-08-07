import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareNodes } from '@fortawesome/free-solid-svg-icons';

const ShareButton = () => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check this out!',
          text: 'Hey, I found this great article!',
          url: window.location.href,
        });
        console.log('Share successful');
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that do not support the Web Share API
      alert('Your browser does not support the Web Share API');
    }
  };

  return (
      <FontAwesomeIcon  style= {{color:'#001861'}} onClick={handleShare} icon={faShareNodes} /> 
  );
};

export default ShareButton;
