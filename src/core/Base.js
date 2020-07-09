import React from "react";
import "../styles.css";
import Menu from "./Menu";

const Base = ({
  title = "My Title",
  description = "my Description",
  className = "bg-dark text-white text-center",
  children
}) => (
  <div>
    <Menu />
    <div className="container-fluid bg-dark">
      <div className="jumbotron bg-dark text-white text-center">
        <h2 className="display-4">{title}</h2>
        <p className="lead">{description}</p>
      </div>
      <div className={className}>{children}</div>
      <footer className="footer bg-dark mt-auto py-3">
        <div className="container-fluid bg-success text-white text-center py-3">
          <h4>If you got any question,feel free to ask</h4>
          <button className="btn btn-warning btn-lg">Contact Us</button>
        </div>
        <div className="container">
          <span className="text-muted">
            An amazing <span className="text-white">MERN</span> learnning
          </span>
        </div>
      </footer>
    </div>
  </div>
);

export default Base;
