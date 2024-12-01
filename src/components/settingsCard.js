import React, { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Plus, PencilFill } from 'react-bootstrap-icons';
import { SettingsPopup } from './settingsPopup';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import Plant from '../image/plant.png';

export const SettingsCard = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [editingSetting, setEditingSetting] = useState(null); 
    const [plantSettings, setPlantSettings] = useState([]);

    const openModal = (setting = null) => {
        setEditingSetting(setting); 
        setIsOpen(true);
    };
    const closeModal = () => {
        setIsOpen(false);
        setEditingSetting(null);
    };

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

    return (
      <>
        <div className='d-flex flex-wrap justify-content-center gap-3'>
          <div className='position-relative d-flex flex-wrap justify-content-center gap-3'>
          {plantSettings.length > 0 ? (
            plantSettings.map((setting, index) => (
              <Card key={index} style={{ width: '13rem', height: '15rem', margin: '10px', backgroundColor: '#80AF81' }}>
                <Card.Body>
                  <div className='d-flex flex-wrap '>
                   <div className='me-3'>
                      <img src={Plant} alt='plant' style={{ width: '50px'}} />
                    </div>
                    <Card.Title>{setting.title}</Card.Title>
                  </div>
                
                  <hr />
                  <Card.Subtitle className="mb-2 text-muted">Pot Size: <br/> {setting.potsize} liters</Card.Subtitle>
                  <Card.Text>
                    Water Level: <br/> {setting.waterLevel} ML
                  </Card.Text>
                  <div className='d-flex justify-content-end' style={{ position: 'absolute', bottom: '10px', width: '80%' }}>
                    <Button variant="primary" onClick={() => openModal(setting)} style={{ borderRadius: '50%', width: '50px', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'gray'}} className='border-0'>
                      <PencilFill />
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            ))
          ) : null}
          </div>
          <div className='position-relative'>
          <Button variant="secondary" style={{ width: '13rem', height: '15rem', opacity: 0.7, margin: '10px' }} onClick={() => openModal()}>
            <div className='d-flex justify-content-center align-items-center' style={{ height: '100%' }}>
              <Plus size={100} />
            </div>
          </Button>

          </div>
          
          <SettingsPopup 
            isOpen={isOpen} 
            onClose={closeModal} 
            editingSetting={editingSetting} 
          />
        </div>
      </>
    );
};
