import React, { useState } from 'react';
import './Profile.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProfileSection = () => {
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({
    name: 'Andy Horwitz',
    location: 'New York',
    bio: 'Hi! My name is Andy. I love all things indie rock. I live in NYC and I\'m currently learning how to play the electric guitar.',
    profilePic: 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp'
  });

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUserData({ ...userData, profilePic: URL.createObjectURL(e.target.files[0]) });
    }
  };

  const saveChanges = () => {
    toggleEditMode();
    // Add any logic here to handle saving to a server or local storage
  };

  return (
    <section className="h-100 gradient-custom-2">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-lg-9 col-xl-7">
            <div className="card">
              <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
                <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '140px', marginLeft: '20px' }}>
                  {editMode ? (
                    <label className='file-upload'>
                      <input type="file" onChange={handleImageChange} className="mb-2"/>
                    </label>
                  ) : (
                    <img src={userData.profilePic} alt="Profile" className="img-fluid img-thumbnail mt-4 mb-2" style={{ width: '150px', height: '150px', zIndex: 1 }}/>
                  )}
                  <button type="button" className="btn-outline-dark" data-mdb-ripple-color="dark" style={{ zIndex: 1 }} onClick={editMode ? saveChanges : toggleEditMode}>
                    {editMode ? 'Save Changes' : 'Edit Profile'}
                  </button>
                </div>
                <div className="ms-3" style={{ marginTop: '130px', marginLeft: '20px' }}>
                  {editMode ? (
                    <>
                      <input type="text" name="name" value={userData.name} onChange={handleChange} className="textbox form-control mb-2"/>
                      <input type="text" name="location" value={userData.location} onChange={handleChange} className="textbox form-control"/>
                    </>
                  ) : (
                    <>
                      <h5>{userData.name}</h5>
                      <p>{userData.location}</p>
                    </>
                  )}
                </div>
              </div>
              <br></br>
              <div className="card-body p-4 text-black">
                <div className="mb-5">
                  <br></br>
                  <p className="lead fw-normal mb-1">Bio</p>
                  <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                    {editMode ? (
                      <textarea name="bio" value={userData.bio} onChange={handleChange} className="form-control"/>
                    ) : (
                      <p className="font-italic mb-1">{userData.bio}</p>
                    )}
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <p className="lead fw-normal mb-0">Current favorites</p>
                  {/* <p className="mb-0">
                    <a href="#!" className="text-muted">
                      Show all
                    </a>
                  </p> */}
                </div>
                <div className="row g-2">
                  {/* Add album images here */}
                  <div className="col mb-2">
                  <a href="#!" className='currentfav'><img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbxAVFZuPdIEQ874znLgqrncPeU93F8rkE27RvM3MZIw&s"
                      alt="image 1"
                      className="w-100 rounded-3"
                      style = {{width: '250px', height: '250px'}}
                    /> </a>                 
                    </div>
                  <div className="col mb-2">
                  <img
                      src="https://upload.wikimedia.org/wikipedia/en/5/51/Igor_-_Tyler%2C_the_Creator.jpg"
                      alt="image 1"
                      className="w-100 rounded-3"
                      style = {{width: '250px', height: '250px'}}
                    />                  
                    </div>
                </div>
                <div className="row g-2">
                  <div className="col">
                  <img
                      src="https://upload.wikimedia.org/wikipedia/en/6/60/Bad_Bunny_-_Un_Verano_Sin_Ti.png"
                      alt="image 1"
                      className="w-100 rounded-3"
                      style = {{width: '250px', height: '250px'}}
                    />                  
                    </div>
                  <div className="col">
                  <img
                      src="https://upload.wikimedia.org/wikipedia/en/5/5e/Mac_Miller_-_Swimming.png"
                      alt="image 1"
                      className="w-100 rounded-3"
                      style = {{width: '250px', height: '250px'}}
                    />                  
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;
