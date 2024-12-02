import React, { useState, useEffect } from 'react';
import '../css/main_view.css';
import SideNav from '../components/sideNav';
import BackgroundImage from '../image/dashboard_bg.png';
import { SettingsCard } from '../components/settingsCard';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

export const Dashboard = () => {
    const [plantSettings, setPlantSettings] = useState([]);

    const fetchUserPlantSettings = async (userId) => {
        const db = getFirestore();
        const plantSettingsCollection = collection(db, 'users', userId, 'plantSettings');
        const plantSettingsSnapshot = await getDocs(plantSettingsCollection);
        const plantSettingsList = plantSettingsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPlantSettings(plantSettingsList);
    };

    useEffect(() => {
        const userId = localStorage.getItem('user');
        if (userId) {
            fetchUserPlantSettings(userId);
        }
    }, []);
    const arduinoIp = 'http://192.168.254.126'; // Replace with your Arduino's IP address
const [isPumpOn, setIsPumpOn] = useState(false); // Add a state to track the pump status
const [timeToFillActive, setTimeToFillActive] = useState(false); // Add a state to track the timeToFill status

useEffect(() => {
    const interval = setInterval(() => {
        const currentDay = new Date().toLocaleString('en-US', { weekday: 'long' });
        const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }).padStart(5, '0'); // 24-hour format with leading zero

        let conditionMet = false;
        
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

                    if (days.includes(currentDay) && currentTime === time && !isPumpOn && !timeToFillActive) {
                        console.log('Condition Met: Turning on pump for', timeToFill, 'seconds');
                        turnOnPump(timeToFill); // Call the function to turn on the pump with timeToFill
                        conditionMet = true;
                    }
                });
            }
        });

        if (!conditionMet) {
            setTimeToFillActive(false); // Reset the flag if the condition is not met
        }

    }, 1000); // Check every second

    return () => clearInterval(interval);
}, [plantSettings, isPumpOn, timeToFillActive]);

const turnOnPump = (timeToFill) => {
    fetch(`${arduinoIp}/ON`)
        .then(response => response.text())
        .then(data => {
            console.log(data);
            setIsPumpOn(true); // Set the flag to indicate the pump is on
            setTimeToFillActive(true); // Set the flag to indicate the timeToFill is active
            // Turn off the pump after the specified timeToFill duration
            setTimeout(() => {
                turnOffPump();
            }, timeToFill * 1000);
        })
        .catch(error => console.error('Error:', error));
};

const turnOffPump = () => {
    fetch(`${arduinoIp}/OFF`)
        .then(response => response.text())
        .then(data => {
            console.log(data);
            setIsPumpOn(false); // Set the flag to indicate the pump is off
        })
        .catch(error => console.error('Error:', error));
};
    

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
        </div>
    );
};
