import React from "react";
import "../css/main_view.css";
import { Button, Card } from "react-bootstrap";
import LoginImage from "../image/login_image.png";
import LogoTitle from "../image/logo_title.png";
import { Link } from "react-router-dom";
import { useToast } from "../components/useToast";

export const LoginPage = () =>{
    const { success, errormsg } = useToast();

    const handleLogin = () => {
        //default email and password
        const email = "test@example.com";
        const password = "password123";
        const inputEmail = document.querySelector('input[type="text"]').value;
        const inputPassword = document.querySelector('input[type="password"]').value;

        if (inputEmail === email && inputPassword === password) {
            success("Login successful");
        } else {
            errormsg("Invalid email or password.");
        }
    };

    return <>
    <div className="d-flex" style={{ height: "100vh" }}>
       <div className="w-50 h-auto z-3">
              <img src={LoginImage} alt="login" className="w-100 h-100"/>
       </div>
       <div className="global-primary-bg-color global-text-primary-color  w-50 h-100 d-flex justify-content-center">
            <Card className="w-50 my-auto p-4">
                <Card.Header className="text-center border-0 bg-white mx-0 px-0">
                    <img src={LogoTitle} alt="logo" className="w-50"/>
                </Card.Header>
                <Card.Body>
                    <Card.Title className="text-uppercase fs-3 global-primary-color fw-semibold mb-0">Login</Card.Title>
                    <Card.Text className="global-text-opacity-75 mt-0">Don't have an account? <Link to="/signup" className="global-text-primary-color">Sign Up</Link></Card.Text>
                    <Card.Text className="d-flex flex-column gap-2">
                        <input type="text" className="form-control mb-2" placeholder="Email"/>
                        <input type="password" className="form-control mb-2" placeholder="Password"/>
                        <Button variant="primary" className="w-100 global-primary-bg-color border-0 button-hover button-click:active text-uppercase fw-bold" onClick={handleLogin}>Login</Button>
                    </Card.Text>

                    <Card.Text className="d-flex justify-content-end"><Link to="#" className="global-text-primary-color text-decoration-none">Forgot Password?</Link></Card.Text>

                    
                </Card.Body>
            </Card>
       </div>
    </div>
    </>
}
