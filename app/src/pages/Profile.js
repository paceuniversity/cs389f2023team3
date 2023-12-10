import React, { useState, useEffect } from 'react';
import './Profile.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAuth, signOut } from 'firebase/auth'; // Import signOut
import { useAuth, upload } from '../firebase';
import { useHistory } from 'react-router-dom'; // Import useHistory

const ProfileSection = () => {
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({
  });

  const currentUser = useAuth();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  const [photoURL, setPhotoURL] = useState("https://t3.ftcdn.net/jpg/00/64/67/80/360_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.jpg"); 

  const history = useHistory();

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleChange = (e) => { 
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  function handleImageChange(e) { //handleChange
    if (e.target.files[0]) {
      setPhoto(e.target.files[0])
    }
  }

  useEffect(() => {
    if (currentUser && currentUser.photoURL) {
      setPhotoURL(currentUser.photoURL);
    }
  }, [currentUser])
  
  function saveChanges() { //handleClick
    upload(photo, currentUser, setLoading);
    toggleEditMode();
  };

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      history.push("/");
    }).catch((error) => {
    });
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
                      <input disable={loading || !photo} type="file" onChange={handleImageChange} className="mb-2"/>
                    </label>
                  ) : (
                    <img src={photoURL} alt="Profile" className="img-fluid img-thumbnail mt-4 mb-2" style={{ width: '150px', height: '150px', zIndex: 1 }}/>
                  )}
                  <button type="button" className="btn-outline-dark" data-mdb-ripple-color="dark" style={{ zIndex: 1 }} onClick={editMode ? saveChanges : toggleEditMode}>
                    {editMode ? 'Save Changes' : 'Edit Profile'}
                  </button>
                </div>
                <div className="ms-3" style={{ marginTop: '130px', marginLeft: '20px' }}>
                  {editMode ? (
                    <>
                      <input type="text" name="name" placeholder="Name" value={userData.name} onChange={handleChange} className="textbox form-control mb-2"/>
                      <input type="text" name="location" placeholder="City" value={userData.location} onChange={handleChange} className="textbox form-control"/>
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
                      <textarea name="bio" placeholder="Tell us about yourself!" value={userData.bio} onChange={handleChange} className="form-control"/>
                    ) : (
                      <p className="font-italic mb-1">{userData.bio}</p>
                    )}
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                <button className="btn btn-primary" onClick={handleSignOut}>Sign Out</button>
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
                      alt="favorite album 1"
                      className="w-100 rounded-3"
                      style = {{width: '100%', height: 'auto'}}
                    /> </a>                 
                    </div>
                  <div className="col mb-2">
                  <img
                      src="https://upload.wikimedia.org/wikipedia/en/5/51/Igor_-_Tyler%2C_the_Creator.jpg"
                      alt="favorite album 2"
                      className="w-100 rounded-3"
                      style = {{width: '100%', height: 'auto'}}
                    />                  
                    </div>
                </div>
                <div className="row g-2">
                  <div className="col">
                  <img
                      src="https://upload.wikimedia.org/wikipedia/en/6/60/Bad_Bunny_-_Un_Verano_Sin_Ti.png"
                      alt="favorite album 3"
                      className="w-100 rounded-3"
                      style = {{width: '100%', height: 'auto'}}
                    />                  
                    </div>
                  <div className="col">
                  <img
                      src="https://upload.wikimedia.org/wikipedia/en/5/5e/Mac_Miller_-_Swimming.png"
                      alt="favorite album 4"
                      className="w-100 rounded-3"
                      style = {{width: '100%', height: 'auto'}}
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
