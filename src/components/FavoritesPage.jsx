import React, { useState, useEffect, useRef } from 'react';
import { Container, Form, Button, Row, Col, Card, Spinner, Modal } from 'react-bootstrap';
import { Pagination } from 'react-bootstrap';


export default function FavoritesPage() {
    const [matchDog, setMatchDog] = useState(""); // Stores the matched dog object
    const [favoriteDog, setFavoriteDog] = useState(JSON.parse(sessionStorage.getItem("favorites"))); // Stores all the favorited dog objects
    const [showMatchModal, setShowMatchModal] = useState(false);

    return <Container className="py-5">
    <Modal show={showMatchModal} onHide={() => setShowLoginAlertModal(false)}>
        <Modal.Header>
            <Modal.Title>Your Match</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Card className="shadow-sm h-40 border-0 bg-light">
          {/* bootstrap card with a small shadow, full height, no border, and light background */}
          <Card.Body className="d-flex flex-column">
            <Card.Img variant="top" src={matchDog.img} style={{ width: '100%', height: '250px' }}/>
            {/* bootstrap card body with flex column to align content */}
            <Card.Title className="text-dark">{matchDog.name}</Card.Title>
            {/* bootstrap card title with dark text */}
            <Card.Text className="text-muted">Age: {matchDog.age}</Card.Text>
            <Card.Text className="text-muted">Breed: {matchDog.breed}</Card.Text>
            <Card.Text className="text-muted">Zip Code: {matchDog.zip_code}</Card.Text>
          </Card.Body>
        </Card>
        <p>If you feel like this match isn't quite perfect, change your favorites and try again!</p>
        <Button 
            className="mt-3 justify-content-center" 
            onClick={() => setShowMatchModal(false)}
            variant="dark"
        >Close</Button>
        </Modal.Body>
    </Modal>        
    <Row>
    <Button disabled={favoriteDog == null || favoriteDog.length == 0} onClick={() => {
        let dogIds = favoriteDog.map((dog) => dog.id);
        fetch(`https://frontend-take-home-service.fetch.com/dogs/match`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(dogIds),
        }).then((res) => res.json())
        .then(data => {
            fetch(`https://frontend-take-home-service.fetch.com/dogs`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify([data.match])
            }).then((res) => res.json())
            .then(data => {
              setMatchDog(data[0]);
              setShowMatchModal(true);
            })
            .catch((error) => {
              console.error("Error fetching data:", error);
            });
          })  
          .catch((error) => {
            console.error("Error fetching data:", error);
          }); 
    }}>Find your Match</Button>    
    {/* bootstrap row for structuring course cards in a responsive grid */}
    {favoriteDog ? favoriteDog.map((dog, index) => (
      <Col key={index} xs={12} md={6} lg={4} xl={3} className="mb-4">
        {/* bootstrap column with responsive grid sizes for different breakpoints */}
        <Card className="shadow-sm h-40 border-0 bg-light">
          {/* bootstrap card with a small shadow, full height, no border, and light background */}
          <Card.Body className="d-flex flex-column">
            <Card.Img variant="top" src={dog.img} style={{ width: '100%', height: '250px' }}/>
            {/* bootstrap card body with flex column to align content */}
            <Card.Title className="text-dark">{dog.name}</Card.Title>
            {/* bootstrap card title with dark text */}
            <Card.Text className="text-muted">Age: {dog.age}</Card.Text>
            <Card.Text className="text-muted">Breed: {dog.breed}</Card.Text>
            <Card.Text className="text-muted">Zip Code: {dog.zip_code}</Card.Text>
            {/* bootstrap muted text for subtle styling */}
            <Button variant="outline-dark mt-auto" onClick={() => {
                sessionStorage.setItem("favorites", JSON.stringify(favoriteDog.filter(pet => {
                    if(pet.id == dog.id){}
                    else{
                        return pet;
                }})));
                setFavoriteDog(favoriteDog.filter(pet => {
                    if(pet.id == dog.id){}
                    else{
                        return pet;
                }}));
                }}>Remove from Favorites</Button>
          </Card.Body>
        </Card>
      </Col>
    )) :  <div className="text-center mb-3">
    {/* bootstrap utility classes for centering text and adding bottom margin */}
    <h5 className="text-muted">You have no favorites added</h5>
    {/* bootstrap muted text for subtle styling */}
  </div> }
  </Row>
  </Container>
}