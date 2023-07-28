import React from "react";

const Footer = () => {
  return (
    <footer className="flex justify-center items-center">
      <div className="copyright">
        &copy; Copyright {new Date().getFullYear()}
        <strong>
          <span> BT </span>
        </strong>
        | Minden jog fenntartva | {import.meta.env.VITE_VERSION}v
      </div>
    </footer>
  );
};

export default Footer;
