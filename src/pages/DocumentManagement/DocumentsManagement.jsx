import React from "react";
import "./DocumentsManagement.css";
import DocumentList from "../../components/DocumentComponents/DocumentList/DocumentList";

function DocumentsManagement() {
  return (
    <div className="course-management-container">
      
      <div className="course-management-content">
        <DocumentList/>
      </div>
    </div>
  );
}

export default DocumentsManagement;
