import React from 'react';
import '../css/main_view.css';
import { Modal } from 'react-bootstrap';
import DashboardTut1 from '../image/dashboard_tut1.png';
import DashboardTut2 from '../image/dashboard_tut2.png';
import DashboardTut3 from '../image/dashboard_tut3.png';
import DashboardTut4 from '../image/dashboard_tut4.png';
import DashboardTut5 from '../image/dashboard_tut5.png';
import LoginTut1 from '../image/login_tut1.png';
import RegisterTut1 from '../image/register_tut1.png';

export const TutorialComponent = ({ pageLocation, isOpen, onClose }) => {
    return (
        <>
            {pageLocation === 'dashboard' ? (
                <Modal show={isOpen} onHide={onClose} centered scrollable style={{ height: '70%' }}>
                    <Modal.Header closeButton>
                        <Modal.Title>Dashboard Tutorial</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <img src={DashboardTut1} alt='dashboard tutorial 1' className='w-100' />
                        <ul>
                            <li>Logout button: redirect back to login page </li>
                            <li>Plant settings: displays the information of the schedule and pot size</li>
                            <li>Create new plant seting to be watered by the system</li>
                        </ul>
                        <hr/>
                        <img src={DashboardTut2} alt='dashboard tutorial 2' className='w-100' />
                        <ul>
                            <li>Edit: Handles the customization of the schedule, and pot size</li>
                            <li>Delete: Removes the  saved plant setting</li>
                            <li>Displays the Water level needed, pot size, and name of plant</li>
                        </ul>
                        <hr/>
                        <img src={DashboardTut3} alt='dashboard tutorial 3' className='w-100' />
                        <ul>
                            <li> Picture above is the window where you can customize watering schedule, pot size and name of the plant</li>
                        </ul>
                        <hr/>
                        <img src={DashboardTut4} alt='dashboard tutorial 4' className='w-100' />
                        <ul>
                            <li>Select the day and time to water your plants.</li>
                        </ul>
                        <hr/>
                        <img src={DashboardTut5} alt='dashboard tutorial 5' className='w-100' />
                        <ul>
                            <li> Schedule 2 allows you to plan ahead of time when to water your plants</li>
                        </ul>
                        <hr/>
                    </Modal.Body>
                </Modal>
            ) : pageLocation === 'register' ? (
                <Modal show={isOpen} onHide={onClose} centered scrollable style={{ height: '70%' }}>
                    <Modal.Header closeButton>
                        <Modal.Title>Register Tutorial</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <img src={RegisterTut1} alt='register tutorial 1' className='w-100' />
                        <ul>
                            <li>Create an account to access the system</li>
                            <li>Provide a Username</li>
                            <li>Use a GMAIL account</li>
                        </ul>
                    </Modal.Body>
                </Modal>
            ) : (
                <Modal show={isOpen} onHide={onClose} centered scrollable style={{ height: '70%' }}>
                    <Modal.Header closeButton>
                        <Modal.Title>Login Tutorial</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <img src={LoginTut1} alt='login tutorial 1' className='w-100' />
                        <ul>
                            <li>Login or create an account by signing up</li>
                        </ul>
                    </Modal.Body>
                </Modal>
            )}
        </>
    );
};
