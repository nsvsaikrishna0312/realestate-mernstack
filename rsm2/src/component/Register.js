import React, { useState } from 'react';
import {
  Button,
  Paper,
  Stack,
  TextField,
} from '@mui/material';
import jkLogo from './logo.png'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Bg from '../Images/signlogo1.jpg'

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    gmail: '',
    phone_number: '',
    dob: ''
  });
  const [alert, setAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailRegex.test(email);
  };

  const calculateAge = (dateOfBirth) => {
    const dobDate = new Date(dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - dobDate.getFullYear();
    const monthDiff = today.getMonth() - dobDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
      return age - 1;
    }
    return age;
  };

  const onHandleClick = async () => {
    const { username, password, gmail, phone_number, dob } = formData;

    if (
      username.trim() !== '' &&
      password.trim() !== '' &&
      gmail.trim() !== '' &&
      phone_number.trim() !== '' &&
      dob.trim() !== '' &&
      validateEmail(gmail) &&
      password.length >= 8
    ) {
      const age = calculateAge(dob);
      if (age >= 18) {
        try {
          const response = await axios.post('http://localhost:5000/api/signup', {
            username, 
            gmail,
            password,
            phone_number,
            dob,
          });

          console.log('Registration successful:', response.data);

          setSuccessMessage('Successfully registered. Redirecting to login...');
          setTimeout(() => {
            navigate('/login');
          }, 3000);

          // Display success toast
          toast.success('Successfully registered. Redirecting to login...');
        } catch (error) {
          console.error('Error during registration:', error);
          setAlert(true);
          setSuccessMessage('Error during registration. Please try again.');

          // Display error toast
          toast.error('Error during registration. Please try again.');
        }
      } else {
        setAlert(true);
        setSuccessMessage('You must be at least 18 years old to register.');

        // Display error toast
        toast.error('You must be at least 18 years old to register.');
      }
    } else {
      setAlert(true);
      setSuccessMessage('Please fill in all fields correctly.');

      // Display error toast
      toast.error('Please fill in all fields correctly.');
    }
  };

  const closeAlert = () => {
    setAlert(false);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${Bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Paper elevation={20} sx={{ width: '27%', height: '590px', marginLeft: '850px' }}>
        <Stack spacing={2}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img src={jkLogo} alt="jk logo" style={{ width: '200px', height: '127px', top:'100' }} />
            <TextField
              label="User name"
              value={formData.username}
              onChange={handleFormChange}
              name="username"
              sx={{ width: '90%' }}
            />
            <br />
            <TextField
              label="Gmail"
              value={formData.gmail}
              onChange={handleFormChange}
              name="gmail"
              sx={{ width: '90%' }}
            />
            <br />
            <TextField
              type="password"
              label="Password"
              value={formData.password}
              onChange={handleFormChange}
              name="password"
              sx={{ width: '90%' }}
            />
            <br />
            <TextField
              label="Phone Number"
              value={formData.phone_number}
              onChange={handleFormChange}
              name="phone_number"
              sx={{ width: '90%' }}
            />
            <br />
            <TextField
              type="date"
              label="Date of Birth"
              value={formData.dob}
              onChange={handleFormChange}
              name="dob"
              InputLabelProps={{ shrink: true }}
              sx={{ width: '90%' }}
            />
            <p>
              Already a user? <Link to="/login">Login Here</Link>
            </p>
            <Button variant='contained' onClick={onHandleClick}>REGISTER</Button>
          </div>
          {alert && (
            <div>
              <p style={{ color: 'red' }}>{successMessage}</p>
              <Button variant="contained" onClick={closeAlert}>Close</Button>
            </div>
          )}
        </Stack>
      </Paper>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default Register;
