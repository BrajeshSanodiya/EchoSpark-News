import React from "react";
import { Link } from "react-router-dom";

const NavBar=()=>{
    return (
      <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">EchoSpark</a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><Link className="nav-link" aria-current="page" to="/">Top News</Link></li>
              <li className="nav-item"><Link className="nav-link" aria-current="page" to="/business">Business</Link></li>
              <li className="nav-item"><Link className="nav-link" aria-current="page" to="/entertainment">Entertainment</Link></li>
              <li className="nav-item"><Link className="nav-link" aria-current="page" to="/health">Health</Link></li>
              <li className="nav-item"><Link className="nav-link" aria-current="page" to="/science">Science</Link></li>
              <li className="nav-item"><Link className="nav-link" aria-current="page" to="/sports">Sports</Link></li>
              <li className="nav-item"><Link className="nav-link" aria-current="page" to="/technology">Technology</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    );
}

export default NavBar;
