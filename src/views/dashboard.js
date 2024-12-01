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

    const arduinoIp = 'http://192.168.254.120'; // Replace with your Arduino's IP address

    useEffect(() => {
        const interval = setInterval(() => {
            const currentDay = new Date().toLocaleString('en-US', { weekday: 'long' });
            const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }).toUpperCase();

            plantSettings.forEach(setting => {
                if (Array.isArray(setting.schedules)) { // Ensure schedules is an array
                    setting.schedules.forEach(schedule => {
                        const days = schedule.days;
                        const time = schedule.time;
                        const timeToFill = setting.timeToFill; // Assuming timeToFill is in seconds

                        if (days.includes(currentDay) && currentTime === time) {
                            turnOnPump(timeToFill); // Call the function to turn on the pump with timeToFill
                        }
                    });
                }
            });
        }, 1000); // Check every second

        return () => clearInterval(interval);
    }, [plantSettings]);

    const turnOnPump = (timeToFill) => {
        fetch(`${arduinoIp}/ON`)
            .then(response => response.text())
            .then(data => {
                console.log(data);
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
            .then(data => console.log(data))
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
