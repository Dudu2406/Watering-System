import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { getFirestore, deleteDoc, doc } from 'firebase/firestore';
import { useToast } from './useToast';

export const DeleteModal = ({ isOpen, onClose, setting, fetchUserPlantSettings }) => {
    const { success, errormsg } = useToast();

    const handleDelete = async () => {
        if (!setting) {
            errormsg('Error deleting setting');
            return;
        }

        const db = getFirestore();
        try {
            await deleteDoc(doc(db, 'users', localStorage.getItem('user'), 'plantSettings', setting.id));
            fetchUserPlantSettings(localStorage.getItem('user'));
            success('Setting deleted successfully');
            onClose(); // Close the modal after deletion
        } catch (error) {
            console.error('Error deleting document:', error);
        }
    };

    return (
        <Modal show={isOpen} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
