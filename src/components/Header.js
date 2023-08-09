import React, { useState } from "react";
import {
  Navbar,
  Container,
  FormControl,
  Nav,
  Dropdown,
  Badge,
  Button,
} from "react-bootstrap";
import { useSearchContext } from "../Context/SearchProvider";
import { useLoginContext } from "../Context/LoginProvider";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useFavoriteArticlesContext } from "../Context/FavoriteProvider";
import Article from "./Article";

function Header() {
  const { searchText, setSearchText } = useSearchContext();
  const { loginCred, setLoginCred } = useLoginContext();
  const [show, setShow] = useState(false);
  const { favoriteArticles, setFavoriteArticles } =
    useFavoriteArticlesContext();
  console.log("favoriteArticles: ", favoriteArticles);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Sneaky News</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
          </Nav>
          <Navbar.Text className="search">
            <FormControl
              style={{ width: 500 }}
              placeholder="Search....   title, desc, content"
              className="m-auto"
              value={searchText}
              onInput={(event) => {
                setSearchText(event.target.value);
              }}
            ></FormControl>
          </Navbar.Text>
          {loginCred.username && loginCred.password ? (
            <div className="d-flex-column align-items-center mx-4">
              {/* <span className="text-light me-2">Logged in as:</span> */}
              <Button variant="light" className="mx-2" href="/login">
                Sign Out
              </Button>
              <span className="text-light font-weight-bold">
                {loginCred.username}
              </span>
            </div>
          ) : (
            <Button variant="light" className="mx-2" href="/signup">
              SignUp
            </Button>
          )}
          <Button variant="light" className="mx-2" onClick={handleShow}>
            Read Later
            <Badge style={{ marginLeft: "10px" }}>
              {favoriteArticles.length}
            </Badge>
          </Button>
          <Offcanvas show={show} onHide={handleClose} placement="end">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>
                Favorite Articles/Read Later List
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              {/* Article rendering */}
              <div>
                {favoriteArticles.map((article, index) => (
                  <Article
                    key={index}
                    title={article.title}
                    description={article.description}
                    url={article.url}
                  />
                ))}
              </div>
            </Offcanvas.Body>
          </Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
