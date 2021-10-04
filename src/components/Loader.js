import React from "react";

export default function Loader() {
  return (
    <div className="text-center mt-3">
      <div className="spinner-border text-primary">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
