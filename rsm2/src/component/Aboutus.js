import React from 'react';
import Navbar from './Navbar';
import {
  Paper,
  Stack,
  Card,
  Table,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import jk from '../Images/jk1.jpg'; 
import abhi from '../Images/Abhi.jpg'
import sai from '../Images/sai.jpg'
const individualData = [
  {
    name: 'Jithendra Kumar',
    id: '2200030165',
    phoneNumber: '9030596218',
    email: 'jithendra98982@gmail.com',
    avatar: jk, 
  },
  {
    name: 'Sai Krishna',
    id: '2200030730',
    phoneNumber: '8121406397',
    email: 'saikrishna98982@gmail.com',
    avatar: sai, 
  },
  {
    name: 'Abhishek',
    id: '2200033265',
    phoneNumber: '936521459',
    email: 'Abhishek98982@gmail.com',
    avatar: abhi, 
  },
];

export default function Aboutus() {
  const cardStyle = {
    marginLeft: '20px',
    marginBottom: '20px',
    backgroundColor: '#ffffff',
    width: '25%',
    height: '450px',
    marginTop: '200px',
    borderRadius: '15px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)',
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  };

  return (
    <div>
      <Navbar />
      <div style={containerStyle}>
        {individualData.map((individual, index) => (
          <Card elevation={12} style={cardStyle} key={index}>
            <Stack>
              <Paper elevation={12} sx={{ width: '100%', height: '700px', borderRadius: '15px' }}>
                <img
                  src={individual.avatar}
                  alt={individual.name}
                  style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    display: 'block',
                    margin: '20px auto',
                  }}
                />
                <h1 align="center">{individual.name}</h1>
                <hr />
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>{individual.name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>ID Number</TableCell>
                      <TableCell>{individual.id}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Phone Number</TableCell>
                      <TableCell>{individual.phoneNumber}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Email</TableCell>
                      <TableCell>{individual.email}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Paper>
            </Stack>
          </Card>
        ))}
      </div>
    </div>
  );
}