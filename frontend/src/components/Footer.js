import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer__copyright">
        © {new Date().getFullYear()} Mesto Russia by Kirill Ilichev
      </p>
    </footer>
  );
};

export default Footer;
