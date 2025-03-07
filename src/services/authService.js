export const getUser = () =>  {
    const token = localStorage.getItem('token');
    if (!token) return null;
    const user = JSON.parse(atob(token.split('.')[1]));
    return user;
  }
  
  export const signup = async (formData) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (json.err) {
        throw new Error(json.err);
      }
      if (json.token) {
        localStorage.setItem('token', json.token)
      }
      console.log(json)
      return json;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  
  export const signin = async (user) => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/signin`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user),
        });
        const json = await res.json();
    
        if (json.token) {
          localStorage.setItem('token', json.token);
    
          const user = JSON.parse(atob(json.token.split('.')[1]));
    
          return user
        }
  
        if (json.error) {
          throw new Error(json.error);
        }
  
      } catch (err) {
        console.log(err);
        throw err;
      }
  };
  
  export const signout = () => {
      localStorage.removeItem('token');
  };
  
  export const getInstructorById = async (instructorId) => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/profiles/${instructorId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return res.json();
      } catch (error) {
        console.log(error);
      }
  }