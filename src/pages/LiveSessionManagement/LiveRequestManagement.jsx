import React from 'react'
import LiveList from '../../components/LiveComponents/LiveList/LiveList'

function LiveSessionManagement() {
  return (
    <div className="course-management-container">
      <h2>Live Request Management</h2>
      <div className="course-management-content">
        <LiveList/>
      </div>
    </div>
  )
}

export default LiveSessionManagement
