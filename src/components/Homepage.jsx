import React, { useState, useEffect, useRef } from 'react';
import { Container, Form, Button, Row, Col, Card, Spinner, Modal } from 'react-bootstrap';
import { Pagination } from 'react-bootstrap';
import fetchLogo from '../images/fetch_logo.png';

export default function Homepage() {
    const [displayDogs, setDisplayDogs] = useState([]); // Stores dog objects for dogs to be displayed on current page
    const [loading, setLoading] = useState(true); // Loading animation
    let favoriteDog = JSON.parse(sessionStorage.getItem("favorites")); // Stores the dog objects of currently favorited dogs
    const selectedBreed = useRef("");
    const selectedSort = useRef("breed:asc");
    const selectedMinAge = useRef("&ageMin=0");
    const selectedMaxAge = useRef("&ageMax=25");
    const [dogBreeds, setDogBreeds] = useState([]); // Stores all dog breeds possible
    const [totalResults, settotalResults] = useState(0); // Stores the current total results being displayed
    const [maxAge, setMaxAge] = useState(0); // Stores the max age the user selected
    const [minAge, setMinAge] = useState(25); // Stores the min age the user selected
    const currentPage = useRef(1); // Stores the current page the user is on
    const pageInput = useRef(); // Stores the page number the user typed in
    const totalPages = useRef(625); // Stores the current number of page results

   /**
   * Retreives and displays first page of user dog search results
   */
    useEffect(() => {
          fetch(`https://frontend-take-home-service.fetch.com/dogs/breeds`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
        })
          .then((res) => res.json())
          .then(data => {
            setDogBreeds(data);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });

          fetch(`https://frontend-take-home-service.fetch.com/dogs/search?size=16&from=${((Number(currentPage.current) - 1)) * 16}&sort=${selectedSort.current}${selectedBreed.current}${selectedMinAge.current}${selectedMaxAge.current}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
        }).then((res) => res.json())
          .then(data => {
            totalPages.current = (Number(data.total) / 16);
            settotalResults(data.total);
            fetch(`https://frontend-take-home-service.fetch.com/dogs`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(data.resultIds)
            }).then((res) => res.json())
              .then(data => {
                setDisplayDogs(data);
                setLoading(false);
              })
              .catch((error) => {
                console.error("Error fetching data:", error);
              });
          })
          .catch((error) => { 
            console.error("Error fetching data:", error);
          });  
      }, []);

   /**
   * Retreives and displays the page of user dog search results that the user is currently on
   */
  const changePage = async () => {
    setLoading(true);
    fetch(`https://frontend-take-home-service.fetch.com/dogs/search?size=16&from=${((Number(currentPage.current) - 1)) * 16}&sort=${selectedSort.current}${selectedBreed.current}${selectedMinAge.current}${selectedMaxAge.current}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
    }).then((res) => res.json())
      .then(data => {
        totalPages.current = (Number(data.total) / 16);
        settotalResults(data.total);
        fetch(`https://frontend-take-home-service.fetch.com/dogs`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(data.resultIds)
        }).then((res) => res.json())
          .then(data => {
            setDisplayDogs(data);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
        
      })
      .catch((error) => { 
        console.error("Error fetching data:", error);
      });  
  }

    return <Container>   
    <Row className="align-items-center mb-4">
    <Col md={3}></Col>    
    <Col md={4} className="d-flex align-items-center justify-content-end">
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <Col md={8} className="d-flex align-items-center justify-content-end">
       <Form.Group>
           <Form.Label>Sort:</Form.Label>
             <Form.Select value={selectedSort.current} onChange={(e) => {
                selectedSort.current = e.target.value;
                changePage();
                }}>
              <option value="breed:asc">Breed: A-Z</option>
              <option value="breed:desc">Breed: Z-A</option>
              <option value="name:asc">Name: A-Z</option>
              <option value="name:desc">Name: Z-A</option>
              <option value="age:asc">Age: Low to High</option>
              <option value="age:desc">Age: High to Low</option>
            </Form.Select>
          </Form.Group>
    </Col>
    <Col md={8} className="d-flex align-items-center justify-content-end">
       <Form.Group>
           <Form.Label>Filter by Breed:</Form.Label>
             <Form.Select value={selectedBreed.current} onChange={(e) => {
                selectedBreed.current = e.target.value;
                changePage();
                }}>
              <option value="">All Breeds</option>
              {dogBreeds.map((breed) => <option value={`&breeds=${breed}`} >{breed}</option>)}
            </Form.Select>
          </Form.Group>
    </Col>
    <Col md={9} className="d-flex align-items-center justify-content-end">
    <Form.Group>
            <Form.Label>Adjust Max Age: {maxAge}</Form.Label>
            <Form.Range
            value={maxAge}
            onChange={(e) => {
                setMaxAge(e.target.value);
                selectedMinAge.current = `&ageMax=${e.target.value}`;
                changePage();
            }}
            min={0}
            max={25}
            step={1}
            />
          </Form.Group>
    </Col>
    <Col md={9} className="d-flex align-items-center justify-content-end">
    <Form.Group>
            <Form.Label>Adjust Min Age: {minAge}</Form.Label>
            <Form.Range
            value={minAge}
            onChange={(e) => {
                setMinAge(e.target.value);
                selectedMinAge.current = `&ageMin=${e.target.value}`;
                changePage();
            }}
            min={0}
            max={25}
            step={1}
            />
          </Form.Group>
    </Col>
    </div>    
    </Col>  
    </Row>
    <div className="text-center mb-3">
        {/* bootstrap utility classes for centering text and adding bottom margin */}
        <h4 className="text-muted">Total Results: {totalResults}</h4>
        {/* bootstrap muted text for subtle styling */}
    </div>    
    {loading && (
        <div className="text-center my-4">
          {/* bootstrap text-center for alignment and margin-y for spacing */}
          <Spinner animation="border" variant="dark" />
          {/* bootstrap spinner component with border animation and dark variant */}
        </div>
      )}
    {!loading && (
    <Container> 
        <Row>
          {/* bootstrap row for structuring course cards in a responsive grid */}
          {displayDogs.map((dog, index) => (
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
                    if (sessionStorage.getItem("favorites")) {
                        favoriteDog.push(dog);
                    } else {
                        favoriteDog = [dog];
                    }
                    sessionStorage.setItem("favorites", JSON.stringify(favoriteDog));
                    alert("Added " + dog.name + " to favorites!");
                    }}>Add to Favorites</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <Pagination className="mt-3 justify-content-center" count={totalPages.current}>
        <Pagination.Prev disabled={currentPage.current <= 1} onClick={() => {
          currentPage.current = parseInt(Number(currentPage.current) - 1);
          changePage();
        }}>Prev</Pagination.Prev>
        <Pagination.Item>{currentPage.current}</Pagination.Item>
        <Pagination.Next disabled={currentPage.current >= totalPages.current} onClick={() => {
          currentPage.current = parseInt(Number(currentPage.current) + 1);
          changePage();
        }}>Next</Pagination.Next>
        <Form className="mb-4">
        {/* bootstrap form with bottom margin for spacing */}
        <Row>
          {/* bootstrap row with center alignment */}
          <Col md={12}>
            {/* bootstrap column with width adjustment on medium screens */}
            <div className="input-group">
              {/* bootstrap input group for combining input and button, shadow for subtle elevation */}
              <Form.Control
                type="text"
                placeholder="Go to page..."
                ref={pageInput}
                className="border-0 bg-light"
              />
              {/* bootstrap form control with no border and light background for soft appearance */}
              <Button onClick={ () => {
                if (Number.isInteger(Number(pageInput.current.value)) && Number(pageInput.current.value) > 0 && Number(pageInput.current.value) <= totalPages.current) {
                  currentPage.current = pageInput.current.value;
                  changePage();
                }
              }}>Go to Page</Button>
              {/* bootstrap button with dark variant for styling */}
            </div>
          </Col>
        </Row>
      </Form>
      </Pagination>
    </Container>)}
    </Container>
};