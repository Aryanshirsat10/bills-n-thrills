import React, { useEffect, useState } from 'react';
import { useClerk } from '@clerk/clerk-react';
import { useAuth } from '@clerk/clerk-react';
import { useUser } from '@clerk/clerk-react';

const UserDataFetcher = () => {
  const { client } = useClerk();
  // const [userId, setUserId] = useState(null);
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const {user, isSignedIn,username} = useUser();

  useEffect(() => {
    const sendDataToBackend = async () => {
      try {
        if (isLoaded && userId) {
          // Prepare the data to send to the backend
          const data = {
            name: user.firstName,
            userId: userId,
          };
          // console.log(data);
          // Send the data to your backend API endpoint
          const response = await fetch('http://localhost:5000/api/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              // You might need to include an authentication token if required by your backend
              // 'Authorization': `Bearer ${getToken()}`,
            },
            body: JSON.stringify(data),
          });

          if (response.ok) {
            console.log('Data sent to the backend successfully.');
          } else {
            console.error('Error sending data to the backend:', response.statusText);
          }
        }
      } catch (error) {
        console.error('Error sending data to the backend:', error);
      }
    };

    sendDataToBackend();
  }, [isLoaded, userId]);
// console.log('User ID:', userId); // Log the user ID to the console
// console.log('Session ID:', sessionId);
// if (!isLoaded || !userId) {
//   return null;
  return null;
}
 



export default UserDataFetcher;
