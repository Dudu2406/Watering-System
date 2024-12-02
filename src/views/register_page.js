import "../css/main_view.css";
import { Button, Card } from "react-bootstrap";
import LoginImage from "../image/login_image.png";
import LogoTitle from "../image/logo_title.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getFirestore, doc, setDoc } from "firebase/firestore"; 
import '../firebase';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from "../components/useToast";
import { Question } from "react-bootstrap-icons";
import { TutorialComponent } from "../components/tutorial";


export const RegisterPage = () =>{
    const db = getFirestore();
    const navigate = useNavigate();
    const { success, errormsg } = useToast();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const [isOpen, setIsOpen] = useState(false);

    const openTutorial = () => {
        setIsOpen(true);
    }

    const closeTutorial = () => {
        setIsOpen(false);
    }

    //stores the user's information in the database
    const handleRegister = async () => {
        if (error) {
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const userId = uuidv4(); 
            const userRef = doc(db, "users", userId); 
            await setDoc(userRef, {
                id: userId,
                username: username,
                email: email,
                password: password
            });
    
            setError(""); 
            success("Account created successfully");
            navigate("/");
        } catch (error) {
            setError(error.message);
        }
    };
    
    //checks if the email is in the correct format
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(e.target.value)) {
            setError("Invalid email format");
        } else {
            setError("");
        }
    };

    //checks if the password is the same as the confirm password
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (confirmPassword && e.target.value !== confirmPassword) {
            setError("Passwords do not match");
        } else {
            setError("");
        }
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        if (password && e.target.value !== password) {
            setError("Passwords do not match");
        } else {
            setError("");
        }
    };

    return (
        <div className="d-flex flex-row-reverse" style={{ height: "100vh" }}>
            <div className="w-50 h-auto z-3">
                <img src={LoginImage} alt="register" className="w-100 h-100" />
            </div>
            <div className="global-primary-bg-color global-text-primary-color w-50 h-100 d-flex justify-content-center">
                <Card className="w-50 my-auto p-4">
                    <Card.Header className="text-center border-0 bg-white">
                        <img src={LogoTitle} alt="logo" className="w-50" />
                    </Card.Header>
                    <Card.Body>
                        <Card.Title className="text-uppercase fs-3 global-primary-color fw-semibold">Register</Card.Title>
                        <Card.Text className="global-text-opacity-75">
                            Already have an account? <Link to="/" className="global-text-primary-color">Login</Link>
                        </Card.Text>
                        <Card.Text className="d-flex flex-column gap-2">
                            <input type="text" className="form-control mb-2" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                            <input type="text" className="form-control mb-2" placeholder="Email" value={email} onChange={handleEmailChange} />
                            <input type="password" className="form-control mb-2" placeholder="Password" value={password} onChange={handlePasswordChange} />
                            <input type="password" className="form-control mb-2" placeholder="Confirm Password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
                            <Button variant="primary" className="w-100 global-primary-bg-color border-0 button-hover text-uppercase fw-bold" onClick={handleRegister}>Register</Button>
                        </Card.Text>
                        {error && <Card.Text className="text-danger">{error}</Card.Text>}
                        <Card.Text className="global-text-opacity-75 text-center px-2" style={{ fontSize: "12px" }}>
                            By Signing Up you agree to our <Link to="#" className="text-decoration-none">Terms of Use</Link> and <Link to="#" className="text-decoration-none">Privacy Policy</Link>.
                        </Card.Text>
                    </Card.Body>
                </Card>
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
         <TutorialComponent pageLocation="register" isOpen={isOpen} onClose={closeTutorial} />
        </div>
    );
}