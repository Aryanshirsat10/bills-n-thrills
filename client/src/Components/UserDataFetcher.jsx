import React, { useEffect } from 'react';
import { useClerk,useAuth } from '@clerk/clerk-react';

const UserDataFetcher = () => {
  const { client ,sessionClaims} = useClerk();


  useEffect(() => {
    const fetchAndStoreUserData = async () => { 
      try {
        const user = await client.currentUser();
        if (user) {
          const { id, username } = user;
          console.log('User object:', user);
        //   const clerkUserID = sessionClaims?.id; // Clerk-generated unique user ID
        //   const username = sessionClaims?.username; // Clerk username
          console.log('Clerk UserID:', id);
          console.log('Username:', username);
  
          // Send a request to your backend API to store clerkUserID and username in your database
          const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: username,
              userId: id,
            }),
          });
  
          if (response.ok) {
            console.log('User data stored successfully:', id, username);
          } else {
            console.error('Error storing user data:', response.statusText);
          }
        } else {
          console.error('User object is null or undefined');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    fetchAndStoreUserData();
  }, [client]);
  

  // You can return null or any UI component if you don't want to render anything for this logic
  return null;
};

export default UserDataFetcher;
