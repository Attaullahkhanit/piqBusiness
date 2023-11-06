import React from "react";
import "./styles.scss";
import ImmersiveView from "../../../components/videoComponent/ImmersiveView/ImmersiveView";
export default function BusinessVideoImmersiveView() {
  return (
    <div className="business-video-immersive-view-page">
      <div className="content-area">
        <ImmersiveView />
      </div>
    </div>
  );
}
