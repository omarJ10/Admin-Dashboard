import React from "react";
import "./DocumentsManagement.css";
import DocumentList from "../../components/DocumentComponents/DocumentList/DocumentList";

function DocumentsManagement() {
  return (
    <div className="course-management-container">
      <h2>Documents Management</h2>
      <div className="course-management-content">
        <DocumentList/>
      </div>
    </div>
  );
}

export default DocumentsManagement;
