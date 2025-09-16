import { useState, useEffect } from 'react';
import { useAuth } from '../../store/Auth';
import { toast } from 'react-toastify';
import { data, useNavigate } from 'react-router-dom';
import './Profile.css';
import { Navbar } from '../../components/layout/Navbar';

export function Profile() {
    const { userData, token, URL, getUpdatedUser, logout} = useAuth();
    const update = true;
    const navigate = useNavigate();

    const [isEditMode, setIsEditMode] = useState(false);
    const [formData, setFormData] = useState({ username: '', email: '', phone: '' });

    useEffect(() => {
        if (userData) {
            setFormData({
                username: userData.username,
                email: userData.email,
                phone: userData.phone,
            });
        }
    }, [userData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCancelEdit = () => {
        setIsEditMode(false);
        // Reset form data to original state
        if (userData) {
            setFormData({
                username: userData.username,
                email: userData.email,
                phone: userData.phone,
            });
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch(`${URL}/api/user/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json', // Set content type to JSON
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData), // Send formData as a JSON string
            });
            const responseData = await response.json();

            if (response.ok) {
                toast.success('Profile updated successfully!');
                setIsEditMode(false);getUpdatedUser();
            } else {
                toast.error(responseData.msg || 'Failed to update profile.');
            }
        } catch (error) {
            console.error('Update error:', error);
            toast.error('An unexpected error occurred.');
        }
    };

    useEffect(()=>{
        
    }, [update])

    const handleDelete = async () => {
        try {
            const response = await fetch(`${URL}/api/user/delete`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
            const responseData = await response.json();

            if (response.ok) {
                toast.success('Profile deleted successfully!');
                localStorage.removeItem("accessToken")
                navigate("/")
            } else {
                toast.error(responseData.msg || 'Failed to delete profile.');
            }
        } catch (error) {
            console.error('delete error:', error);
            toast.error('An unexpected error occurred.');
        }
    };

    if (!userData) return <p>Loading profile...</p>;

    return (
        <>
            <Navbar/>
            <section className="profile-section">
                <div className="profile-container">
                    <div className="profile-header">
                        {/* Simplified avatar - can be an icon or a static image */}
                        <div className="profile-avatar-wrapper">
                
                        </div>
                        <h2 className="profile-username">{formData.username}</h2>
                        <p className="profile-email">{formData.email} | {formData.phone}</p>
                    </div>

                    {!isEditMode ? (
                        <div className="profile-details">
                            <div className="profile-actions">
                                <button className="btn-edit" onClick={() => setIsEditMode(true)}>Edit Profile</button>
                                <button className="btn-delete" onClick={handleDelete}>Delete Account</button>
                            </div>
                        </div>
                    ) : (
                        <form className="profile-form" onSubmit={handleUpdate}>
                            <div className="input-group">
                                <label htmlFor="username">Username</label>
                                <input type="text" id="username" name="username" value={formData.username} onChange={handleInputChange} required />
                            </div>
                            <div className="input-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" value={formData.email} disabled />
                            </div>
                            <div className="input-group">
                                <label htmlFor="phone">Phone Number</label>
                                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
                            </div>
                            <div className="form-actions">
                                <button type="submit" className="btn-save">Save Changes</button>
                                <button type="button" className="btn-cancel" onClick={handleCancelEdit}>Cancel</button>
                            </div>
                        </form>
                    )}
                </div>
            </section>
        </>
    );
}