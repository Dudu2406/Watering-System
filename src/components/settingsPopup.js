import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { TrashFill } from 'react-bootstrap-icons';
import { getFirestore, doc, setDoc } from "firebase/firestore"; 
import { useToast } from "./useToast";
import { v4 as uuidv4 } from 'uuid';

export const SettingsPopup = ({ isOpen, onClose, editingSetting }) => {
    const [title, setTitle] = useState('');
    const [potsize, setPotSize] = useState('');
    const [waterLevel, setWaterLevel] = useState('');
    const [schedules, setSchedules] = useState([{ days: [], time: '' }]);
    const db = getFirestore();
    const { success, errormsg } = useToast();

    
    const clearAllFields = () => {
        setTitle('');
        setPotSize('');
        setWaterLevel('');
        setSchedules([{ days: [], time: '' }]);
    };

    useEffect(() => {
        if (editingSetting) {
            setTitle(editingSetting.title);
            setPotSize(editingSetting.potsize);
            setWaterLevel(editingSetting.waterLevel);
            setSchedules(editingSetting.schedules);
        } else {
            clearAllFields();
        }
    }, [editingSetting]);

    if (!isOpen) return null;

    const handleDayChange = (index, e) => {
        const day = e.target.value;
        setSchedules(schedules.map((schedule, i) =>
            i === index
                ? {
                    ...schedule,
                    days: schedule.days.includes(day)
                        ? schedule.days.filter(d => d !== day)
                        : [...schedule.days, day]
                }
                : schedule
        ));
    };

    const handleTimeChange = (index, e) => {
        const time = e.target.value;
        setSchedules(schedules.map((schedule, i) =>
            i === index
                ? { ...schedule, time }
                : schedule
        ));
    };

    const addSchedule = () => {
        setSchedules([...schedules, { days: [], time: '' }]);
    };

    const removeSchedule = (index) => {
        if (schedules.length > 1) {
            setSchedules(schedules.filter((_, i) => i !== index));
        }
    };

    const calculateMaxWaterLevel = (potsize) => {
        return potsize * 1000 * 0.8; // 80% of the pot size in milliliters
    };

    const handleWaterLevelChange = (e) => {
        const value = Number(e.target.value);
        const maxWaterLevel = calculateMaxWaterLevel(potsize);
        setWaterLevel(value > maxWaterLevel ? maxWaterLevel : value);
    };

    const calculateTimeToFill = (waterLevel) => {
        const flowRate = 10; 
        return waterLevel / flowRate; 
    };
    const saveSettingsToFirestore = async () => {
        const userId = localStorage.getItem('user');
    
        if (!userId) {
            console.error('User ID not found in local storage');
            return;
        }
    
        const uniqueId = editingSetting ? editingSetting.id : uuidv4(); 
    
        try {
            const docRef = doc(db, 'users', userId, 'plantSettings', uniqueId);
            await setDoc(docRef, {
                id: uniqueId,
                title,
                potsize,
                waterLevel,
                schedules,
                timeToFill: calculateTimeToFill(waterLevel)
            });
            success('Settings saved successfully');
            clearAllFields();
            window.location.reload();
            onClose();
        } catch (error) {
            errormsg('Error saving settings');
            console.error('Error saving settings', error);
        }
    };
    

   const handleSubmit = async (e) => {
        e.preventDefault();
        await saveSettingsToFirestore();
        
    };
    return (
        <Modal show={isOpen} onHide={onClose} backdrop="static" keyboard={false} centered scrollable style={{height:"70%"}}>
            <Modal.Header closeButton>
                <Modal.Title>Add New Settings</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPotSize">
                        <Form.Label>Pot Size (liters)</Form.Label>
                        <Form.Control type="number" placeholder="Enter pot size" value={potsize} onChange={(e) => setPotSize(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formWaterLevel">
                        <Form.Label>Water Level (ML)</Form.Label>
                        <Form.Control 
                            type="number" 
                            placeholder="Enter water level" 
                            value={waterLevel} 
                            onChange={handleWaterLevelChange}
                            max={calculateMaxWaterLevel(potsize)}
                        />
                        <Form.Text className="text-muted">
                            Max water level based on pot size: {calculateMaxWaterLevel(potsize)} ML
                        </Form.Text>
                    </Form.Group>

                    {schedules.map((schedule, index) => (
                        <Form.Group key={index} className="mb-3" controlId={`formSchedule${index}`}>
                            <Form.Label>
                                Schedule {index + 1}
                                {schedules.length > 1 && (
                                    <TrashFill 
                                        style={{ color: 'red', marginLeft: '10px', cursor: 'pointer' }} 
                                        onClick={() => removeSchedule(index)} 
                                    />
                                )}
                            </Form.Label>
                            <div>
                                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                                    <Form.Check
                                        key={day}
                                        type="checkbox"
                                        label={day}
                                        value={day}
                                        checked={schedule.days.includes(day)}
                                        onChange={(e) => handleDayChange(index, e)}
                                    />
                                ))}
                            </div>
                            <Form.Label className="mt-3">Time</Form.Label>
                            <Form.Control
                                type="time"
                                value={schedule.time}
                                onChange={(e) => handleTimeChange(index, e)}
                            />
                        </Form.Group>
                    ))}

                    <Button variant="primary" onClick={addSchedule}>Add Another Schedule</Button>
                   
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" type="submit" onClick={handleSubmit}>Save Changes</Button>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
