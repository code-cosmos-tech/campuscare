import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../store/Auth";
import "./Register.css"; // Import the new stylesheet

export function Register() {
    const [user, setUser] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
    });

    const { URL , setUserToken, isLoggedIn} = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });        
    };

    useEffect(() => {
        if (isLoggedIn) {
            return navigate("/");
        }   
    },[]);

    const handleSubmit = async (e) => {
        try {
            const res = await fetch(`${URL}/api/register`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
            const response = await res.json();
            if (res.ok) {
                setUserToken(response.token);
                navigate("/login");
                toast.success(response.msg);
            } else {
                toast.error(response.msg);
            }
        } catch (error)
        {
            console.log("Registration error", error);
            toast.error("An unexpected error occurred.");
        }
    };

    return (
        <section className="register-section">
            <div className="register-container">
                <h2 className="register-title">Create an Account</h2>
                <p className="register-subtitle">Join our community to start your wellness journey.</p>
                <form className="register-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Choose a username"
                            onChange={handleChange}
                            value={user.username}
                            autoComplete="username"
                            required
                        />
                    </div>
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
                        <label htmlFor="phone">Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            id="phone"
                            placeholder="Enter your phone number"
                            onChange={handleChange}
                            value={user.phone}
                            autoComplete="tel"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Create a strong password"
                            onChange={handleChange}
                            value={user.password}
                            autoComplete="new-password"
                            required
                        />
                    </div>
                    <button type="submit" className="register-button">Create Account</button>
                    <p className="login-link">
                        Already part of the gang? <NavLink to={'/login'}>Log In</NavLink>
                    </p>
                </form>
            </div>
        </section>
    );
}