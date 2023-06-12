import "./App.css";
import Navbar from "./Header/Navbar";
import Home from "./UserActions/Home";
import AddUser from "./UserActions/AddUser";
import UserList from "./UserActions/UserList";
import Logout from "./User/Logout";
import Login from "./User/Login";
import Error from "./User/Error";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IndexPage from "./IndexPage";
import UpdateUser from "./UserActions/UpdateUser";
import Register from "./User/Register";
import AuthenticatedRoute from "./Auth/AuthenticatedRoute";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<IndexPage />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route
            exact
            path="/home/:loggedInUser"
            element={
              <AuthenticatedRoute>
                <Home />
              </AuthenticatedRoute>
            }
          />
          <Route
            exact
            path="/addUser"
            element={
              <AuthenticatedRoute>
                <AddUser />
              </AuthenticatedRoute>
            }
          />
          <Route
            exact
            path="/usersList"
            element={
              <AuthenticatedRoute>
                <UserList />
              </AuthenticatedRoute>
            }
          />
          <Route
            exact
            path="/updateUser/:id"
            element={
              <AuthenticatedRoute>
                <UpdateUser />
              </AuthenticatedRoute>
            }
          />
          <Route
            exact
            path="/logout"
            element={
              <AuthenticatedRoute>
                <Logout />
              </AuthenticatedRoute>
            }
          />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
