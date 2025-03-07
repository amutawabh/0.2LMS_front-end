import './CourseList.css'
import { Link } from 'react-router-dom';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const CourseList = ({ courses }) => {
  if (!courses) return <LoadingSpinner />;
  return (
    <main className="course-list-container">
      <h1 className="course-list-header">Courses</h1>
      {courses.length > 0 ? (
        <div className="course-grid">
          {courses.map((course) => (
            <Link
              key={course._id}
              to={`/courses/${course._id}`}
              className="course-link"
            >
              <article className="course-card">
                <header>
                  <h2 className="course-title">{course.title}</h2>
                  <p className="course-instructor">By {course.instructor.user.username}</p>
                </header>
                <p className="course-description">{course.description}</p>
              </article>
            </Link>
          ))}
        </div>
      ) : (
        <p className="no-courses">No courses available. Check back later or create a new course!</p>
      )}
    </main>
  );
};

export default CourseList;