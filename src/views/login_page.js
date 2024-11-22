import React from "react";
import "../css/main_view.css";
import { Button, Card } from "react-bootstrap";
import LoginImage from "../image/login_image.png";
import LogoTitle from "../image/logo_title.png";
export const LoginPage = () =>{
    return <>
    <div className="d-flex" style={{ height: "100vh" }}>
       <div className="w-50 h-auto z-3">
              <img src={LoginImage} alt="login" className="w-100 h-100"/>
       </div>
       <div className="global-primary-bg-color global-text-primary-color  w-50 h-100 d-flex justify-content-center">
            <Card className="w-50 my-auto">
                <Card.Header className="text-center border-0 bg-white ">
                    <img src={LogoTitle} alt="logo" className="w-50"/>
                </Card.Header>
                <Card.Body>
                    <Card.Title className="">Login</Card.Title>
                    <Card.Text>
                        <input type="text" className="form-control mb-2" placeholder="Username"/>
                        <input type="password" className="form-control mb-2" placeholder="Password"/>
                        <Button variant="primary" className="w-100">Login</Button>
                    </Card.Text>
                </Card.Body>
            </Card>
       </div>
    </div>
    </>
}
