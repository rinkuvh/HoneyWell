import React, { useRef } from "react";
import Index from "../../../containers/Index";

const ImportButton = ({
  name,
  onFileSelect,
  acceptType,
  loading,
  inputName,
}) => {
  // console.log("loading", loading);
  const fileInputRef = useRef();

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (onFileSelect) {
        onFileSelect(file);
      }
    }
  };

  return (
    <Index.Box className="admin-userlist-inner-btn-flex">
      <Index.Box className="primary-btn-main">
        <input
          type="file"
          name={inputName}
          accept={acceptType}
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <Index.Button
          className="primary-btn"
          onClick={handleButtonClick}
          loading={loading}
        >
          {name}
        </Index.Button>
      </Index.Box>
    </Index.Box>
  );
};

export default ImportButton;
