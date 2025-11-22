import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import NotificationSystem from "./NotificationSystem";

export default function Layout({ children }) {
  const user = { name: "Maria Silva", initials: "MS" };

  return (
    <div className="app-root">
      <div className="container">
        <Sidebar />
        <main className="main">
          <Topbar user={user} />
          <div className="page-content">
            {children}
          </div>
        </main>
      </div>
      <NotificationSystem />
    </div>
  );
}