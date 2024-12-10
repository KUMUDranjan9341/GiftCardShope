import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/myprofile.css'; // your custom CSS
import ProfileSidebar from '../components/ProfileSidebar'; // Sidebar component

const MyProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
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

        setUserData(response.data);
        setSelectedGender(response.data.gender || '');
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError('Failed to fetch profile data. Please try again later.');
        console.error(err);
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
      dob: userData.dob,
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

      // Update the state with the new data
      setUserData(response.data.user);
      setSelectedGender(response.data.user.gender);
      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Error while updating profile:', err);
      setError('Failed to update profile. Please try again later.');
    }
  };

  // Show loading or error if necessary
  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  if (!userData) return <div>No user data available</div>;

  return (
    <>
      <div className="container my-3">
        <div className="row d-flex justify-content-center">
          <div className="col-md-10">
            <h5 className="p-0 m-0">Account</h5>
            <p className="f_13 fw-bold text-success">{userData.name}</p>
            <hr />
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="col-md-2">
            <div className="py-5">
              <ProfileSidebar />
            </div>
          </div>
          <div className="col-md-8">
            <div className="py-5 border px-5">
              <h5>Profile Details</h5>
              <hr />
              <table className="table">
                <tbody className="f_14">
                  <tr>
                    <td>Full Name</td>
                    <td>{userData.name}</td>
                  </tr>
                  <tr>
                    <td>Email ID</td>
                    <td>{userData.email}</td>
                  </tr>
                  <tr>
                    <td>Mobile No.</td>
                    <td>{userData.number}</td>
                  </tr>
                  <tr>
                    <td>Gender</td>
                    <td>{userData.gender || 'Not provided'}</td>
                  </tr>
                  <tr>
                    <td>Date of Birth</td>
                    <td>{userData.dob || 'Not provided'}</td>
                  </tr>
                </tbody>
              </table>

              <button
                data-bs-toggle="modal"
                data-bs-target="#ProfileModal"
                className="btn border bg-danger text-white f_12 fw-bolder w-100"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Editing Profile */}
      <div
        className="modal fade"
        id="ProfileModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content rounded-0 border-0">
            <div className="modal-header">
              <h1 className="modal-title f_16 fw-bold text-center w-100" id="exampleModalLabel">
                Edit Profile
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSaveDetails}>
                <div className="form_wrap">
                  <div className="input_wrap">
                    <input
                      className="address_input"
                      type="text"
                      value={userData.name}
                      onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                      required
                    />
                    <label>Name*</label>
                  </div>

                  <div className="input_wrap my-3">
                    <input
                      className="address_input"
                      type="email"
                      value={userData.email}
                      onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                      required
                    />
                    <label>Email*</label>
                  </div>

                  <div className="input_wrap my-3">
                    <input
                      className="address_input"
                      type="text"
                      value={userData.number}
                      onChange={(e) => setUserData({ ...userData, number: e.target.value })}
                      required
                    />
                    <label>Mobile No*</label>
                  </div>

                  <div className="input_wrap my-3">
                    <input
                      className="address_input"
                      type="text"
                      value={userData.dob}
                      onChange={(e) => setUserData({ ...userData, dob: e.target.value })}
                      required
                    />
                    <label>Birthday (dd/mm/yyyy)*</label>
                  </div>

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
                </div>

                <div>
                  <button className="btn bg-danger w-100 f_13 fw-bolder text-white" type="submit">
                    Save Details
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
