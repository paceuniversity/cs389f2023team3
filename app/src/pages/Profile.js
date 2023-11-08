import React, { useState } from 'react';
import './Profile.css';

const Profile = () => {
  const [bio, setBio] = useState('');
  const [city, setCity] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

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

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // Save changes to the server or perform any necessary actions.
  };

  return (
    <div className="profile-page">
      <h2>Edit Your Profile</h2>
      <div className="profile-form">
        <div className="profile-picture">
          <img src={profilePicture || 'default-profile-image.png'} alt="Profile" />
          {isEditing && (
            <input type="file" accept="image/*" onChange={handleProfilePictureChange} />
          )}
        </div>
        <div className="profile-details">
          {isEditing ? (
            <>
              <label htmlFor="bio" className='text'>Bio:</label>
              <input
                type="text"
                maxLength={200}
                id="bio"
                value={bio}
                onChange={handleBioChange}
                placeholder="Enter your bio here"
              />
              <p className="small-text">Max 200 characters</p>
              <label htmlFor="city" className='text'>City:</label>
              <input
                type="text"
                id="city"
                value={city}
                onChange={handleCityChange}
                placeholder="Enter your city"
              />
            </>
          ) : (
            <>
              <p className='text'>Bio: {bio}</p>
              <br></br>
              <p className='text'>City:{city}</p>
            </>
          )}
        </div>
      </div>
      {isEditing ? (
        <button className="save-button" onClick={handleSaveClick}>
          Save Changes
        </button>
      ) : (
        <button className="edit-button" onClick={handleEditClick}>
          Edit Profile
        </button>
      )}
    </div>
  );
};

export default Profile;
