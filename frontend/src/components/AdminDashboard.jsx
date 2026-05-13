import { pageWrapper, headingClass, bodyText } from "../styles/common";

function AdminDashboard() {
  return (
    <div className={pageWrapper}>
      <h1 className={headingClass}>Admin Dashboard</h1>
      <p className={`${bodyText} mt-4`}>Admin tools can be added here when moderation features are ready.</p>
    </div>
  );
}

export default AdminDashboard;
