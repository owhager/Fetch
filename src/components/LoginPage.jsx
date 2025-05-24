import React, { useState, useRef } from 'react';
import { Container, Card, Button, Form, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const navigate = useNavigate();
    const nameInput = useRef(""); //Stores user input for name
    const emailInput = useRef(""); //Stores user input for email

    const containerStyle = {
        maxWidth: '400px',
        margin: '3rem auto',
        padding: '2rem',
        background: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
      };
      const formContainerStyle = {
        background: '#fff',
        padding: '1.5rem',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      };
      const formGroupStyle = {
        marginBottom: '1rem',
        display: 'flex',
        flexDirection: 'column'
      };
      const inputStyle = {
        padding: '0.5rem',
        borderRadius: '4px'
      };
      
   /**
   * Logs in user with given credentials
   */
      const loginUser = (e) => {
        e.preventDefault();
        fetch(`https://frontend-take-home-service.fetch.com/auth/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
              name: nameInput.current.value,
              email: emailInput.current.value,
            }),
        }).then(res => {
            if(res.status == 400 || res.status == 401) {
                alert("Login unsuccessful. Please try again");
            } else if (res.status == 200) {
               navigate('/main');
            }
        })  
          .catch((error) => {
            console.error("Error fetching data:", error);
          });  
      }  
    return <Container className="py-5">
    <Container style={containerStyle}>
    <h5 className="text-center mb-4 fw-bold text-dark">Type your information in here:</h5>    
    <Container style={formContainerStyle}>
    <Container style={formGroupStyle}>    
    <label style={inputStyle}>Name:</label>    
    <Form>
      <div className="input-group shadow">
        <Form.Control type="text" ref={nameInput} className="border-0 bg-light" />
      </div>
    </Form>
    </Container>
    <Container style={formGroupStyle}>
    <label style={inputStyle}>Email:</label>
    <Form>
      <div className="input-group shadow">
        <Form.Control type="text" ref={emailInput} className="border-0 bg-light" />
      </div>
    </Form>
    </Container> 
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
       <Button variant="dark" onClick={loginUser}>Login</Button>
    </div>
 </Container> 
  </Container>   
  </Container>
}