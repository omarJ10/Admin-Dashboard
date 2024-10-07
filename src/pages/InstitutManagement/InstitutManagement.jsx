import React from 'react'
import InstitutList from '../../components/InstitutComponents/InstitutList/InstitutList'

function UniversityManagement() {
  return (
    <div className="course-management-container">
      <h2>Instituts Management</h2>
      <div className="course-management-content">
        <InstitutList/>
      </div>
    </div>
  )
}

export default UniversityManagement
