import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as authService from '../../services/authService'
import '../SigninForm/SigninForm.css';

const SignupForm = (props) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(['']);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConf: '',
    role: "student",
  });

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // console.log(formData)
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const newUserResponse = await authService.signup(formData)
      // console.log(newUserResponse)
      props.setUser(newUserResponse.user); //because the response has token and user
      navigate('/')
    } catch (err) {
      updateMessage(err.message)
    }
  }

  const { username, password, passwordConf, role } = formData;

  const isFormInvalid = () => {
    return !(username && password && password === passwordConf && role);
  };

  return (
    <main className='sign'>
      <h1>Sign Up</h1>
      <p>{message}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="name"
            value={username}
            name="username"
            onChange={handleChange}
            placeholder='Write your username here...'
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            name="password"
            onChange={handleChange}
            placeholder='Write your password here...'
          />
        </div>
        <div>
          <label htmlFor="confirm">Confirm Password:</label>
          <input
            type="password"
            id="confirm"
            name="passwordConf"
            value={passwordConf}
            onChange={handleChange}
            placeholder='Confirm your password...'
          />
        </div>
        <div>
          <label htmlFor="role">Role:</label>
          <select 
            id="role" 
            name="role" 
            onChange={handleChange} 
            value={role}
          >
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
          </select>
        </div>
        
        <div>
          <button disabled={isFormInvalid()}>Sign Up</button>
          <Link to="/">
            <button className='cancel-button'>Cancel</button>
          </Link>
        </div>
      </form>
    </main>
  );
};

export default SignupForm;