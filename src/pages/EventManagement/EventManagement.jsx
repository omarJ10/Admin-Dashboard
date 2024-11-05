import React from 'react'
import './EventManagement.css'
import EventList from '../../components/EventComponents/EventList/EventList'


function EventManagement() {
  return (
    <div className="course-management-container">
      
      <div className="course-management-content">
        <EventList/>
      </div>
    </div>
  )
}

export default EventManagement
