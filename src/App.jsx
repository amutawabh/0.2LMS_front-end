import { useState, createContext, useEffect  } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

// Components
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SignupForm from './components/SignupForm/SignupForm'
import SigninForm from './components/SigninForm/SigninForm'

// Course Components
import CourseList from './components/CourseList/CourseList'
import CourseForm from './components/CourseForm/CourseForm'
import CourseDetails from './components/CourseDetails/CourseDetails'; 
import LessonForm from './components/LessonForm/LessonForm';

// Services
import * as authService from '../src/services/authService';
import * as  courseService from '../src/services/courseService'


// eslint-disable-next-line react-refresh/only-export-components
export const AuthedUserContext = createContext(null);


const App = () => {
  const [user, setUser] = useState(authService.getUser());
  const [courses, setCourses] = useState([]);

  const navigate = useNavigate();

  const handleSignout = () => {
    authService.signout()
    setUser(null)
  }

  useEffect(() => {
    const fetchAllCourses = async () => {
      const coursesData = await courseService.index();
      
      if (!coursesData) return;
      await Promise.all(coursesData.map(async (course) => {
        course.instructor = await authService.getInstructorById(course.instructor);
      }));

      // console.log(coursesData);

      setCourses(coursesData);
    };
    if (user) fetchAllCourses();
  }, [user]);

  const handleAddCourse = async (newCourseData) => {
    
    newCourseData.instructor = user;
    const newCourse = await courseService.create(newCourseData)
    newCourse.instructor = await authService.getInstructorById(newCourse.instructor);
    // console.log('New Course after added to db', newCourse);
    setCourses([newCourse, ...courses]);
    // console.log('New Coursessss after added to db', courses);

    navigate('/courses');
  }

  const handleUpdateCourse = async (courseId, updatedCourseData) => {
    const updatedCourse = await courseService.update(courseId, updatedCourseData);
    setCourses(courses.map(course => course._id === courseId ? updatedCourse : course));
    navigate('/courses/' + courseId);
  }

  const handleDeleteCourse = async (courseId) => {
    await courseService.deleteCourse(courseId);
    setCourses(courses.filter(course => course._id !== courseId));
    navigate('/courses');
  }


  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <div className="page-container">
          <header>
            <NavBar user={user} handleSignout={handleSignout} />
          </header>
          <main className="content">
            <Routes>
              { user ? (
                  // all signed in user routes
                <>
                  <Route path="/" element={<Dashboard user={user} />} />
                  <Route path="/courses" element={<CourseList courses={courses} />} />

                  { user.role === 'instructor' ? (
                    // instructor routes
                    <>
                      <Route path="/courses/:courseId" element={<CourseDetails handleDeleteCourse={handleDeleteCourse}  />} />
                      <Route path="/courses/new" element={<CourseForm handleAddCourse={handleAddCourse} />} />
                      <Route path="/courses/:courseId/edit" element={<CourseForm handleUpdateCourse={handleUpdateCourse} />} />
                      <Route path="/courses/:courseId/lessons/:lessonId/edit" element={<LessonForm />} />
                    </>

                  ) : (

                    // student routes
                    <>
                      <Route path="/courses/:courseId" element={<CourseDetails />} />
                      <Route path="/" element={<Dashboard user={user} />} />
                    </>
                  )}
                </>
              ) : (

                // not signed in routes
                <>
                  <Route path="/" element={<Landing />} />
                </>
              )}
              <Route path="/signup" element={<SignupForm setUser={setUser} />} />
              <Route path='/signin' element={<SigninForm setUser={setUser} />} />
            </Routes>
          </main>
          <footer className="footer">
            <p>© 2024 Your LMS. All Rights Reserved.</p>
          </footer>

        </div>
      </AuthedUserContext.Provider>
    </>
  );
};

export default App;