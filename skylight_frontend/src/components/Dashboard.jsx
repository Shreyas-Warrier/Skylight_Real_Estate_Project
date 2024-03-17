import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();
  const [editPassword, setEditPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [userProperties, setUserProperties] = useState([]);

  useEffect(() => {
    const fetchUserProperties = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/users/${localStorage.getItem('userID')}/properties`);
        setUserProperties(response.data);
      } catch (error) {
        console.error('Error fetching user properties:', error);
      }
    };

    fetchUserProperties();
  }, []);

  const handleChangePassword = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/users/${localStorage.getItem('userID')}/password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: newPassword })
      });
      if (response.ok) {
        alert('Password updated successfully');
        setEditPassword(false);
        setNewPassword('');
      } else {
        console.error('Password update failed');
      }
    } catch (error) {
      console.error('Error updating password:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account?')) {
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:8080/api/users/${localStorage.getItem('userID')}`);
      if (response.status === 204) {
        alert('Account deleted successfully');
        localStorage.removeItem('userID');
        navigate('/');
      } else {
        alert('Failed to delete account');
      }
    } catch (error) {
      console.error('Failed to delete account:', error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
        {userProperties.length > 0 && (
          <>
            <h2 className="text-2xl font-bold mb-4">Your Properties</h2>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Purpose</th>
                  <th className="border border-gray-300 px-4 py-2">Price</th>
                  <th className="border border-gray-300 px-4 py-2">Rooms</th>
                  <th className="border border-gray-300 px-4 py-2">Baths</th>
                  <th className="border border-gray-300 px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {userProperties.map(property => (
                  <tr key={property.id}>
                    <td className="border border-gray-300 px-4 py-2">{property.purpose}</td>
                    <td className="border border-gray-300 px-4 py-2">{property.price}</td>
                    <td className="border border-gray-300 px-4 py-2">{property.rooms}</td>
                    <td className="border border-gray-300 px-4 py-2">{property.baths}</td>
                    <td className="border border-gray-300 px-4 py-2">Pending</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
  
        <br/><br/><br/><br/><br/><br/>
        <div className="mt-4">
          {!editPassword ? (
            <>
              <h2 className="text-2xl font-bold mb-4">Account Settings</h2>
              <button
                className="bg-blue-200 hover:bg-blue-300 text-blue-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mb-4"
                onClick={() => setEditPassword(true)}
              >
                Edit Password
              </button>
              <button
                onClick={() => setShowDeleteConfirmation(true)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              >
                Delete Account
              </button>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-4">Change Password</h2>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">New Password</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                />
              </div>
              <div className="mb-4">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                  onClick={handleChangePassword}
                >
                  Update Password
                </button>
              </div>
              <div className="mb-4">
                <button
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                  onClick={() => setEditPassword(false)}
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </div>
  
      {showDeleteConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md">
            <p className="text-lg font-semibold mb-4">Are you sure you want to delete your account?</p>
            <div className="flex justify-between">
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleDeleteAccount}
              >
                Yes, Delete
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => setShowDeleteConfirmation(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
