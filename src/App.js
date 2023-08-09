import "./App.css";
import Home from "./components/Home";
import NoteState from "./Context/noteState";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./components/About";
import Header from "./components/Header";
import { SearchProvider } from "./Context/SearchProvider";
import Login from "./components/Login";
import { LoginProvider } from "./Context/LoginProvider";
import SignUp from "./components/SignUp";
import { FavoriteProvider } from "./Context/FavoriteProvider";

function App() {
  return (
    <>
      <SearchProvider>
        <FavoriteProvider>
          <LoginProvider>
            <BrowserRouter>
              <Header></Header>
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/about" element={<About />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/signup" element={<SignUp />}></Route>
              </Routes>
            </BrowserRouter>
          </LoginProvider>
        </FavoriteProvider>
      </SearchProvider>
    </>
  );
}

export default App;
