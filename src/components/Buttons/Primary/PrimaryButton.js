import React from "react";
import "./styles.scss";
function PrimaryButton({
  text,
  onClick,
  height,
  disabled,
  type,
  imageType,
  setSelectedImageFile,
  setSelectedBackgroundFile,
  handleFileSelect,
  styles
}) {
  const setImageFile = async (event) => {
    const file = await handleFileSelect(event);
    if (setSelectedBackgroundFile) {

      setSelectedBackgroundFile(file);
    } else {

      setSelectedImageFile(file);
    }
  };

  if (type && type === "file") {
    return (
      <div>
        <label
          htmlFor={`fileInput${setSelectedImageFile ? "image" : "background"}`}
          className={"primary-button-input"}
        >
          <input
            type="file"
            id={`fileInput${setSelectedImageFile ? "image" : "background"}`}
            style={{ display: "none" }}
            onChange={setImageFile}
            accept=".png"
          />
          {text}
        </label>
      </div>
    );
  } else {
    return (
      <button
        className={"primary-button"}
        onClick={onClick}
        style={{...styles, height: height }}
        disabled={disabled}
        type={type}
      >
        {text}
      </button>
    );
  }
}

export default PrimaryButton;
