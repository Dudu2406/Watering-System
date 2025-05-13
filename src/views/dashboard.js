import React, { useState, useEffect } from 'react';
import '../css/main_view.css';
import SideNav from '../components/sideNav';
import BackgroundImage from '../image/dashboard_bg.png';
import { SettingsCard } from '../components/settingsCard';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { Question } from "react-bootstrap-icons";
import { Button } from 'react-bootstrap';
import { TutorialComponent } from '../components/tutorial';
import { useNavigate } from 'react-router-dom';



export const Dashboard = () => {
    const [plantSettings, setPlantSettings] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [relayStatus, setRelayStatus] = useState({ 0: false, 1: false, 2: false });
    const [timeToFillActive, setTimeToFillActive] = useState({ 0: false, 1: false, 2: false });
    const navigate = useNavigate();

    const openTutorial = () => {
        setIsOpen(true);
    }

    const closeTutorial = () => {
        setIsOpen(false);
    }

    //fetch plant settings from firestore
    const fetchUserPlantSettings = async (userId) => {
        const db = getFirestore();
        const plantSettingsCollection = collection(db, 'users', userId, 'plantSettings');
        const plantSettingsSnapshot = await getDocs(plantSettingsCollection);
        const plantSettingsList = plantSettingsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPlantSettings(plantSettingsList);
    };
    
    //fetch plant settings from firestore based on user id
    useEffect(() => {
        const userId = localStorage.getItem('user');
        if (userId) {
            fetchUserPlantSettings(userId);
        }
    }, []);

    //ARDUINO CODES
    // 192.168.254.126
    //192.168.163.151 
    //192.168.66.151
    const arduinoIp = 'http://192.168.163.151'; // Replace with your Arduino's IP address
    const [isPumpOn, setIsPumpOn] = useState(false); // Add a state to track the pump status
    const pumpTimeouts = {};
    // const [timeToFillActive, setTimeToFillActive] = useState(false); // Add a state to track the timeToFill status

    useEffect(() => {
        const interval = setInterval(() => {
            const currentDay = new Date().toLocaleString('en-US', { weekday: 'long' });
            const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }).padStart(5, '0'); // 24-hour format with leading zero
    
        // let conditionMet = false;
        
        plantSettings.forEach(setting => {
            if (Array.isArray(setting.schedules)) { // Ensure schedules is an array
                setting.schedules.forEach(schedule => {
                    const days = schedule.days;
                    let time = schedule.time;
                    const timeToFill = setting.timeToFill; // Assuming timeToFill is in seconds

                    // Ensure time has leading zeros in hours if needed (e.g., 06:00)
                    if (time.length === 4) {
                        time = '0' + time;
                    }
                    // console.log(time, currentTime);

                    if (schedule.days.includes(currentDay) && currentTime === schedule.time && !isPumpOn &&
                    !relayStatus[setting.pin] && !timeToFillActive[setting.pin]) {
                        console.log('Condition Met: Turning on pump for', timeToFill, 'seconds', setting.pin);
                        turnOnPump(setting.pin, setting.timeToFill);
                        
                        // turnOnPump(timeToFill); // Call the function to turn on the pump with timeToFill
                       
                    }else if (!days.includes(currentDay) && currentTime !== time) { 
                        //this is to catch the case where the current day and time does not match the schedule
                        //To avoid the pump being turned on for the wrong schedule
                        //And to avoid the pump being turned on multiple times for the same schedule (if the timeToFill is only 1 second)
                        // console.log('Condition Not Met: Pump is off');
                        setTimeToFillActive(prev => ({ ...prev, [setting.pin]: false }));
                    }
                });
            }
        });
    }, 1000); // Check every second

    return () => clearInterval(interval);
}, [plantSettings, isPumpOn, timeToFillActive]);

const turnOnPump = (pinIndex, timeToFill) => {
    console.log(`Turning on pump ${pinIndex} for ${timeToFill} seconds`);

    fetch(`${arduinoIp}/ON${pinIndex}`)
        .then(response => response.text())
        .then(() => {
            setIsPumpOn(true);
            setRelayStatus(prev => ({ ...prev, [pinIndex]: true }));
            setTimeToFillActive(prev => ({ ...prev, [pinIndex]: true }));

            console.log(`Scheduling pump ${pinIndex} to turn off after ${timeToFill * 1000} milliseconds`);
            
            // Clear any existing timeout for this pin
            if (pumpTimeouts[pinIndex]) {
                clearTimeout(pumpTimeouts[pinIndex]);
            }

            pumpTimeouts[pinIndex] = setTimeout(() => {
                turnOffPump(pinIndex);
            }, timeToFill * 1000);
        })
        .catch(error => console.error('Error:', error));
};

const turnOffPump = (pinIndex) => {
    console.log(`Attempting to turn off pump ${pinIndex}`);

    fetch(`${arduinoIp}/OFF${pinIndex}`)
        .then(response => response.text())
        .then(() => {
            setIsPumpOn(false);
            console.log(`Pump ${pinIndex} turned off`);
            setRelayStatus(prev => ({ ...prev, [pinIndex]: false }));
        })
        .catch(error => console.error('Error:', error));
};
// const turnOnPump = (timeToFill) => {
//     fetch(`${arduinoIp}/ON`)
//         .then(response => response.text())
//         .then(data => {
//             console.log(data); // to see the response from the Arduino
//             setIsPumpOn(true); // Set the flag to indicate the pump is on
//             setTimeToFillActive(true); // Set the flag to indicate the timeToFill is active
//             // Turn off the pump after the specified timeToFill duration
//             setTimeout(() => {
//                 turnOffPump();
//             }, timeToFill * 1000);
//         })
//         .catch(error => console.error('Error:', error));
// };

// const turnOffPump = () => {
//     fetch(`${arduinoIp}/OFF`)
//         .then(response => response.text())
//         .then(data => {
//             console.log(data);
//             setIsPumpOn(false); // Set the flag to indicate the pump is off
//         })
//         .catch(error => console.error('Error:', error));
// };
    

    return (
        <div className="d-flex" style={{ height: "100vh" }}>
            <div className='w-100 h-auto'>
                <img src={BackgroundImage} alt='dashboard_bg' className='w-100 h-100'/>
            </div>

            <div className="position-absolute" style={{ left: 0, top: 0, bottom: 0 }}>
                <SideNav />
            </div>
            
            <div className='z-1 position-absolute' style={{ left: 150, top: 50}}>
                <SettingsCard />
            </div>

            <div>
            <Button 
                variant="light" 
                className="position-fixed rounded-circle" 
                onClick={openTutorial}
                style={{ bottom: "20px", right: "20px", width: "50px", height: "50px", zIndex: 1000 }}
            >
                <Question size={24} />
            </Button>
       </div>
         <TutorialComponent pageLocation="dashboard" isOpen={isOpen} onClose={closeTutorial} />
        </div>
    );
};
