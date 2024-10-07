import React from 'react'
import UserList from '../../components/UserComponents/UserList/UserList'

function UserManagement() {
  return (
    <div className="course-management-container">
      <h2>User Management</h2>
      <div className="course-management-content">
        <UserList />
      </div>
    </div>
  )
}

export default UserManagement
