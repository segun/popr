import React from "react";

const UploadButton = () => {
  return (
    <div className="m-3">
      <label className="mx-3">Choose file: </label>
      <input className="d-none" type="file" />
      <button className="btn btn-outline-primary">Upload</button>
    </div>
  );
};

export default UploadButton;
