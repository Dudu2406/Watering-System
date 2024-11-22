import "../css/main_view.css";
import { Button, Card } from "react-bootstrap";
import LoginImage from "../image/login_image.png";
import LogoTitle from "../image/logo_title.png";
import { Link } from "react-router-dom";

export const RegisterPage = () =>{
    return <>
    <div className="d-flex flex-row-reverse" style={{ height: "100vh" }}>
       <div className="w-50 h-auto z-3">
              <img src={LoginImage} alt="register" className="w-100 h-100"/>
       </div>
       <div className="global-primary-bg-color global-text-primary-color  w-50 h-100 d-flex justify-content-center">
            <Card className="w-50 my-auto p-4">
                <Card.Header className="text-center border-0 bg-white ">
                    <img src={LogoTitle} alt="logo" className="w-50"/>
                </Card.Header>
                <Card.Body>
                    <Card.Title className="text-uppercase fs-3 global-primary-color fw-semibold">Register</Card.Title>
                    <Card.Text className="global-text-opacity-75">Already have an account? <Link to="/" className="global-text-primary-color">Login</Link></Card.Text>
                    <Card.Text className="d-flex flex-column gap-2">
                        <input type="text" className="form-control mb-2" placeholder="Username"/>
                        <input type="text" className="form-control mb-2" placeholder="Email"/>
                        <input type="password" className="form-control mb-2" placeholder="Password"/>
                        <input type="password" className="form-control mb-2" placeholder="Confirm Password"/>
                        <Button variant="primary" className="w-100 global-primary-bg-color border-0 button-hover text-uppercase fw-bold">Register</Button>
                    </Card.Text>
                    <Card.Text className="global-text-opacity-75 text-center px-2" style={{fontSize: "12px"}}>By Signing Up you agree to our <Link to="#" className="text-decoration-none">Terms of Use</Link> at <Link to="#" className="text-decoration-none">Privacy Policy</Link>.</Card.Text>

                
                </Card.Body>
            </Card>
       </div>
    </div>
    </>
}