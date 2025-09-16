import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom"; // Combined imports
import { toast } from "react-toastify";
import { useAuth } from "../../store/Auth";
import "./Login.css"; // Import the stylesheet

export function Login() {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const { setUserToken, URL, isLoggedIn} = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        console.log(`${URL}/api/login`);

        setTimeout(() => {
            
        }, 2000);
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                setUserToken(data.token);
                navigate("/");
                toast.success(data.msg);
            } else {
                toast.error(data.msg);
            }
        } catch (error) {
            console.log("Login error", error);
            toast.error("An unexpected error occurred.");
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/");
        }   
    },[]);

    return (
        <section className="login-section">
            <div className="login-container">
                <h2 className="login-title">Sign In</h2>
                <p className="login-subtitle">Welcome back! Please enter your details.</p>
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            placeholder="you@example.com" 
                            onChange={handleChange} 
                            value={user.email}
                            autoComplete="email"
                            required 
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            id="password" 
                            placeholder="Enter password" 
                            onChange={handleChange} 
                            value={user.password}
                            autoComplete="current-password"
                            required 
                        />
                    </div>
                    <button type="submit" className="login-button">Sign In</button>
                    <p className="signup-link">
                        New here? Let's make it official <NavLink to={'/register'}>Sign Up</NavLink>
                    </p>
                </form>
            </div>
        </section>
    );
}