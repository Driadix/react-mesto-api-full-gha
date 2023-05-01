import React from 'react';
import errorImage from '../images/tooltip-error.svg';
import okImage from '../images/tooltip-ok.svg';
import Popup from './Popup';

const InfoTooltip = ({ isOpen, tooltipData, onClose }) => {
  return (
    <Popup isOpen={isOpen} onClose={onClose} name="info-tooltip">
      <img
        className="popup__status-image"
        src={tooltipData.isOk ? okImage : errorImage}
        alt="Статус регистрации"></img>
      <h2 className="popup__status-text">{tooltipData.statusText}</h2>
    </Popup>
  );
};

export default InfoTooltip;
