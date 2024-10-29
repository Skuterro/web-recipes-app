import React from "react";
import { useAuth } from "../providers/AuthProvider";

export const UserProfile = () => {
  const { loggedUser, handleLogout } = useAuth();

  if (!loggedUser) {
    return <p className="text-center text-red-500">Musisz być zalogowany, aby zobaczyć tę stronę.</p>;
  }

  return (
    <div className="p-6 max-w-sm mx-auto text-center border border-gray-300 rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-4">Username: {loggedUser.username}!</h2>
      <p className="mb-2">
        <strong>Email: </strong> {loggedUser.email}
      </p>
      <p className="mb-4">
        <strong>User ID: </strong> {loggedUser.id}
      </p>

      <button 
        onClick={handleLogout} 
        className="mt-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Logout
      </button>
    </div>
  );
};

