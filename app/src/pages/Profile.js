import React, { useState } from 'react';
import './Profile.css';

const Profile = () => {
  const [bio, setBio] = useState('');
  const [city, setCity] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(URL.createObjectURL(file));
  };

  return (
    <div className="profile-page">
      <h2>Edit Your Profile</h2>
      <div className="profile-form">
        <div className="profile-picture">
          <img src={profilePicture || 'default-profile-image.png'} alt="Profile" />
          <input type="file" accept="image/*" onChange={handleProfilePictureChange} />
        </div>
        <div className="profile-details">
          <label htmlFor="bio">Bio:</label>
          <textarea
            id="bio"
            value={bio}
            onChange={handleBioChange}
            placeholder="Enter your bio here"
          />
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={handleCityChange}
            placeholder="Enter your city"
          />
        </div>
      </div>
      <button className="save-button">Save Changes</button>
    </div>
  );
};

export default Profile;