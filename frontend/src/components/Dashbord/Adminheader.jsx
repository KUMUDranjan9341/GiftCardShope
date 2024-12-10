import React, { useState, useContext, useEffect } from 'react';
import { CiEdit } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MdOutlineMail } from "react-icons/md";
import { FaMobileScreenButton } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import profile_image from '../../assets/images/profile_dummy.jpg';
import '../../styles/Dashboardcss/admin.css'
import { AuthContext } from '../../context/AuthContext';

const AdminHeader = () => {
  const [selectedProfileImage, setSelectedProfileImage] = useState(null);
  const { isLoggedIn, logout } = useContext(AuthContext);

  const [selectedGender, setSelectedGender] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No token found. Please log in.');
          setLoading(false);
          return;
        }

        const response = await axios.get('http://localhost:4000/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data) {
          setUserData(response.data);
          setSelectedGender(response.data.gender || ''); 
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching profile data:', err);
        setError('Failed to fetch profile data. Please try again later.');
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleGenderChange = (gender) => {
    setSelectedGender(gender);
  };

  const handleSaveDetails = async (e) => {
    e.preventDefault();

    const updatedData = {
      name: userData.name,
      email: userData.email,
      number: userData.number,
      gender: selectedGender, 
    };

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found. Please log in.');
        return;
      }

      const response = await axios.put('http://localhost:4000/profile', updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserData(response.data.user);
      setSelectedGender(response.data.user.gender); 

      alert('Profile updated successfully');
    } catch (err) {
      console.error('Error while updating profile:', err);
      if (err.response) {
        setError(err.response.data.message || 'Failed to update profile. Please try again later.');
      } else {
        setError('Network error. Please check your connection and try again.');
      }
    }
  };

  const handleProfileImageChange = (e) => {
    const profilefile = e.target.files[0];
    if (profilefile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedProfileImage(reader.result);
      };
      reader.readAsDataURL(profilefile);
    }
  };

  const handleEditClickProfile = () => {
    const fileInput = document.getElementById('profile_img'); 
    if (fileInput) {
      fileInput.click(); 
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="container-fluid back_c p-0 m-0">
        <div className="row p-0 m-0">
          <div className="col-12 p-0 m-0">
            <div className="admin_header d-flex justify-content-between align-items-center">
              <div className="col-1 d-flex justify-content-end"></div>
              <div className="col-1">
                <div
                  className="profile_image pointer_text "
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    className="img-fluid w-100 rounded-circle"
                    src={selectedProfileImage || profile_image} 
                    alt="Profile"
                  />
                  <div className="dropdown">
                    <ul className="dropdown-menu">
                      <li data-bs-toggle="modal" data-bs-target="#Profile">
                        <a className="dropdown-item">Profile</a>
                      </li>
                      <li>
                        <a className="dropdown-item" onClick={logout}>Logout</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      <div
        className="modal fade"
        id="Profile"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content rounded-0 border-0">
            <div className="modal-header">
              <h1 className="modal-title f_16 fw-bold text-center w-100" id="exampleModalLabel">
                Profile Details
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="container">
                <form onSubmit={handleSaveDetails}>
                  <div className="row">
                    <div className="col-12">
                      <div className="mb-3">
                        <div className="input-group py-2 d-flex justify-content-center">
                          <div className="editimage-preview">
                            {selectedProfileImage ? (
                              <img alt="Selected" className="img-fluid" src={selectedProfileImage} />
                            ) : (
                              <img alt="Default" className="img-fluid" src={profile_image} />
                            )}

                            <span className="edit-image" onClick={handleEditClickProfile}>
                              <CiEdit />
                            </span>

                            <div className="profile_image-overlay ">
                              {selectedProfileImage && (
                                <img alt="Selected" className="img-fluid" src={selectedProfileImage} />
                              )}
                            </div>
                          </div>

                          <input
                            id="profile_img"
                            type="file"
                            className="form-control"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleProfileImageChange}
                          />
                        </div>

                        <div className="input-group py-2">
                          <span className="input-group-text f_13 fw_600 text_g rounded-0 px-3" id="">
                            <CgProfile />
                          </span>
                          <input
                            value={userData.name || ''}
                            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                            type="text"
                            className="form-control f_13 py-2 fw_600 rounded-0"
                            placeholder="Name ....."
                          />
                        </div>

                        <div className="input-group py-2 pe-1">
                          <span className="input-group-text f_13 fw_600 text_g rounded-0 px-3" id="">
                            <MdOutlineMail />
                          </span>
                          <input
                            value={userData.email || ''}
                            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                            type="text"
                            className="form-control f_13 py-2 fw_600 rounded-0"
                            placeholder="Email..."
                          />
                        </div>

                        <div className="input-group py-2">
                          <span className="input-group-text f_13 fw_600 text_g rounded-0 px-3" id="">
                            <FaMobileScreenButton />
                          </span>
                          <input
                            value={userData.number || ''}
                            onChange={(e) => setUserData({ ...userData, number: e.target.value })}
                            type="text"
                            className="form-control f_13 py-2 fw_600 rounded-0"
                            placeholder="Mobile No..."
                          />
                        </div>

                        {/* Gender Selection */}
                        {/* <div className="input_wrap my-3">
                          <div className="row d-flex align-items-center text-center p-0 m-0">
                            <div className="col-6 border">
                              <div
                                className={`py-2 gender ${selectedGender === 'male' ? 'active' : ''}`}
                                onClick={() => handleGenderChange('male')}
                              >
                                <span className="f_14">Male</span>
                              </div>
                            </div>

                            <div className="col-6 border">
                              <div
                                className={`py-2 gender ${selectedGender === 'female' ? 'active' : ''}`}
                                onClick={() => handleGenderChange('female')}
                              >
                                <span className="f_14">Female</span>
                              </div>
                            </div>
                          </div>
                        </div> */}

<div className="input_wrap my-3">
                      <div className="row d-flex align-items-center text-center p-0 m-0">
                        <div className="col-6 border">
                          <div
                            className={`py-2 gender ${selectedGender === 'male' ? 'active' : ''}`}
                            onClick={() => handleGenderChange('male')}
                          >
                            <input
                              className="d-none"
                              type="radio"
                              name="gender"
                              value="male"
                              checked={selectedGender === 'male'}
                              readOnly
                            />
                            <span className="gender-symbol">{selectedGender === 'male' && '✓'}</span>
                            <span className="f_14">Male</span>
                          </div>
                        </div>

                        <div className="col-6 border">
                          <div
                            className={`py-2 gender ${selectedGender === 'female' ? 'active' : ''}`}
                            onClick={() => handleGenderChange('female')}
                          >
                            <input
                              className="d-none"
                              type="radio"
                              name="gender"
                              value="female"
                              checked={selectedGender === 'female'}
                              readOnly
                            />
                            <span className="gender-symbol">{selectedGender === 'female' && '✓'}</span>
                            <span className="f_14">Female</span>
                          </div>
                        </div>
                      </div>
                    </div>

                        {/* Save Button */}
                        <div className="col-12">
                          <button type="submit" className="btn bg-danger rounded-0 f_13 text-light fw_600 w-100">
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHeader;
