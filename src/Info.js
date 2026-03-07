import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import Headshot from "./Images/Headshot_Square.png";
import resume from "./Images/Jared_Giangrasso_Resume.pdf";
import "./Info.css";

class Info extends Component {
  render() {
    return (
      <div id="personal-info-container">
        <div id="personal-info">
          <div id="name-headshot">
            <h1 id="first">Jared</h1>
            <h2 id="second">Giangrasso</h2>
            <img id="headshot" src={Headshot} />
          </div>

          <div id="statement">
            <p id="statement1">
              I'm a full-stack software engineer based in New York. I build
              scalable web platforms and developer tooling, with experience
              leading product development from architecture to production.
            </p>
            <p id="statement2">
              Take a look at some of my projects to see what I've worked on, and
              feel free to follow me over to Github if you're interested in how
              anything works.
            </p>
          </div>

          <div id="resume-cta">
            <a
              id="resume-label"
              href={resume}
              download="Jared_Giangrasso_Resume"
            >
              <FontAwesomeIcon id="file-icon" icon={faFile} size="lg" />
              <span>Download Resume</span>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Info;
