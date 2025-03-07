// const Landing = () => {
//     return (
//       <main>
//         <h1>Hello, you are on the landing page for visitors.</h1>
//         <h3>
//           If you sign up for a new account, you will have the ability to sign in
//           and see your super secret dashboard.
//         </h3>
//       </main>
//     );
//   };
  
//   export default Landing;

import './Landing.css'; // Import a CSS file for styling

const Landing = () => {
  return (
    <main className="landing-container">
      <section className="hero-section">
        <h1 className="hero-title">Welcome to Your Learning Hub</h1>
        <p className="hero-subtitle">
          Discover courses, enhance your skills, and achieve your goals with ease.
        </p>
      </section>

      <section className="features-section">
        <h2>Why Choose Our LMS?</h2>
        <div className="features">
          <div className="feature-card">
            <h3>📚 Diverse Courses</h3>
            <p>Explore a wide range of courses tailored to your learning needs.</p>
          </div>
          <div className="feature-card">
            <h3>💻 Easy Access</h3>
            <p>Learn anytime, anywhere with our user-friendly platform.</p>
          </div>
          <div className="feature-card">
            <h3>🏆 Track Your Progress</h3>
            <p>Monitor your achievements and keep pushing towards your goals.</p>
          </div>
        </div>
      </section>

    </main>
  );
};

export default Landing;