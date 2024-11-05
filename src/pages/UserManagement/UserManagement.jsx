import React from 'react'
import UserList from '../../components/UserComponents/UserList/UserList'

function UserManagement() {
  return (
    <div className="course-management-container">
      <h2 style={{  marginLeft: "50px", marginTop: "20px" }}>User Management</h2>
      <div className="course-management-content">
        <UserList />
      </div>
    </div>
  )
}

export default UserManagement
