import React from "react";
import {Link} from "react-router-dom";

const Header = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home page</Link>
        </li>
        <li>
          <Link to="/about">About page</Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
