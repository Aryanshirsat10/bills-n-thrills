import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ClerkProvider, SignIn ,useUser } from '@clerk/clerk-react';
import Dashboard from './Pages/Dashboard';
import LoadingAnimation from './LoadingAnimation';
import Expense from './Pages/Expense';
import Investments from './Pages/Investments';
import Savings from './Pages/Savings';
import {dark} from "@clerk/themes";

if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}
const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoadingComplete(true);
    }, 3000);
  }, []);
  
  // if (!loadingComplete) {
  //   return <LoadingAnimation />;
  // }

  return (
    <>
    {!loadingComplete && <LoadingAnimation onLoadingComplete={() => setLoadingComplete(true)} />} 
        {loadingComplete && (
    <ClerkProvider publishableKey={clerkPubKey}
    appearance={{
            baseTheme: dark,
          }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/expense" element={<Expense />} />
          <Route path="/investments" element={<Investments />} />
          <Route path="/savings" element={<Savings />} />
        </Routes>
      </Router>
    </ClerkProvider>
        )}
    </>
      
  );
}

function Home() {
  const user = useUser();
  
  if (user.isSignedIn) {
    return <Dashboard />;
  }
  
  return (
    <div className='center-container'>
      <SignIn />
    </div> 
  );
}

export default App;
