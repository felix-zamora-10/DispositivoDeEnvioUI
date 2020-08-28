import React from "react";
import "./Styles/MainContainer.css";
import MessageArea from "./MessageArea";

class MainContainer extends React.Component {
  render() {
    return (
      <div className="grid-container">
        <div className="grid-message-area">
          <MessageArea />
        </div>
      </div>
    );
  }
}

export default MainContainer;
