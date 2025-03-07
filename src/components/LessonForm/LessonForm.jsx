import './LessonForm.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import * as courseService from '../../services/courseService';

const LessonForm = ({ handleAddLesson }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });

  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      const courseData = await courseService.show(courseId);
      setFormData(courseData.lessons.find((lesson) => lesson._id === lessonId));
    };
    if (lessonId && courseId) {
      fetchCourse();
    }
  }, [courseId, lessonId]);



  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formData.title || !formData.content) {
      alert('Please fill in all required fields.');
      return;
    }
    if (lessonId && courseId) {
      courseService.updateLesson(courseId, lessonId ,formData);
      navigate(`/courses/${courseId}`);
    } else {
      handleAddLesson(formData);
    }
    setFormData({ title: '', content: '' });
  };

  return (
    <div className='lesson-form'>
      <h2>{lessonId && courseId ? 'Edit Lesson' : 'Add Lesson'}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="lesson-title">Lesson Title:</label>
        <input
          type="text"
          name="title"
          id="lesson-title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder='Lesson Title'
        />
        <label htmlFor="lesson-content">Lesson Content:</label>
        <textarea
          name="content"
          id="lesson-content"
          value={formData.content}
          onChange={handleChange}
          required
          placeholder='Lesson Content'
        ></textarea>
        <button type="submit">
          {lessonId && courseId ? 'SAVE CHANGES' : 'ADD LESSON'}
        </button>
      </form>
    </div>
  );
};

export default LessonForm;