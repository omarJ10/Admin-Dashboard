import React from 'react'
import './MatiereManagement.css'
import MatiereList from "../../components/MatiereComponents/MatiereList/MatiereList";


function EventManagement() {
    return (
        <div className="course-management-container">
            
            <div className="course-management-content">
                <MatiereList/>
            </div>
        </div>
    )
}

export default EventManagement
