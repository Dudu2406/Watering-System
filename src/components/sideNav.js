import React, { useState } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {  Grid1x2Fill, Calendar2Range, BoxArrowLeft } from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

const SideNav = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  }

  return (
    <div className="d-flex">
      <Navbar className="flex-column justify-content-between vh-100 p-3 global-primary-bg-color" expanded={open}>
        <div className='d-flex flex-column gap-3 mt-4'>
            <Button className='text-center global-highlight-background-color buttonNav-hover border-0' style={{width: '60px', height: '60px'}}>
                <Grid1x2Fill size={30} className='global-primary-color'/>
            </Button>
            <Button className='text-center global-highlight-background-color buttonNav-hover border-0' style={{width: '60px', height: '60px'}}>
                <Calendar2Range size={30} className='global-primary-color'/>
            </Button>

        </div>

        <div className='d-flex flex-column gap-3 mb-4'>
          <Button className='text-center global-highlight-background-color buttonNav-hover border-0' style={{width: '60px', height: '60px'}} onClick={handleLogout}>
              <BoxArrowLeft size={30} className='global-primary-color'/>
           </Button>
          
        </div>

      </Navbar>
    </div>
  );
}

export default SideNav;
