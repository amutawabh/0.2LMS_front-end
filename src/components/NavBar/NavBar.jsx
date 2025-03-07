import './NavBar.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthedUserContext } from '../../App';

const NavBar = ({ handleSignout }) => {
  const user = useContext(AuthedUserContext);
  return (
    <nav className='navbar'>
      {user ? (
        // signed in user
          <div className="navbar-container">
            <div className="navbar-left">
                <Link to="/">Home</Link>
            </div>
            <div className="navbar-right">
                <p><strong>Welcome, {user.username}</strong></p>

                <Link to="/courses">Courses</Link>
              {/* ROLE BASED NAVBAR */}
              { user.role === 'instructor' ? (
                // instructor navbar
                  <Link to="/courses/new">Add Course</Link>
                ) : (
                  // student navbar
                  //   <Link to="/courses">My Courses</Link>
                  <>
                  </>
                )
              }
                <Link to="" onClick={handleSignout}>
                  Sign Out
                </Link>
            </div>
          </div>
     
      ) : (
        // Not signed-in user
        <div className="navbar-container">
          <div className="navbar-left">
            <Link to="/">Home</Link>
          </div>
          <div className="navbar-right">
            <Link to="/signin">Sign In</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      )}
    </nav>
  );
};
export default NavBar;