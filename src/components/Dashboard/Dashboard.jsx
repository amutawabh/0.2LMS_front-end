
import './Dashboard.css';

const Dashboard = ({ user }) => {
    return (
    <main className="dashboard-container">
      <div className="dashboard-card">
        <h1>Welcome Back, {user.username}!</h1>
        <p className="dashboard-role">
          <strong>Role: </strong> {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
        </p>
        <p className="dashboard-message">
          We're excited to see you again! Use the navigation menu to explore your 
          courses, check out lessons, or manage your account. 
        </p>
      </div>
    </main>
    );
  };
  
  export default Dashboard;
