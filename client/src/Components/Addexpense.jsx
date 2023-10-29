import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';

const Addexpense = ({ showModal, handleCloseModal }) => {
const {userId} = useAuth();
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    paymentType: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);

  // const [userId, setUserId] = useState(null);

  // useEffect(() => {
  //   // Fetch user data when the component mounts
  //   const fetchData = async () => {
  //     const userData = await UserDataFetcher();
  //     setUserId(userData); // Set the user ID in the state
  //   };

  //   fetchData();
  // }, []); // Empty dependency array ensures this effect runs only once when the component mounts
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.category.trim() || !formData.amount.trim() || !formData.paymentType.trim()) {
      // Handle validation error, show error message to the user
      console.error('Please fill out all fields.');
      return;
    }
    try {
      // Send the expense data along with the user ID to your API endpoint
      const response = await fetch('http://localhost:5000/api/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId:userId, // Use the user ID fetched from UserDataFetcher
          category: formData.category,
          amount: formData.amount,
          paymentType: formData.paymentType,
        }),
      });

      const data = await response.json();

      console.log('Expense added successfully:', data);

      // Trigger a function to update the UI with the new expense (if needed)
      // onExpenseAdded();
      setSuccessMessage('Expense added successfully!');
      setShowSuccessBanner(true);
      setFormData({ category: '', amount: '', paymentType: '' });
      setTimeout(() => {
        setShowSuccessBanner(false); // Hide success banner after a few seconds
        handleCloseModal(); // Close the modal after hiding the banner
      }, 3000); // Clear the form
    } catch (error) {
      console.error('Error adding expense:', error);
      // Handle error, show error message to the user
    }

    // Log the selected category and amount to the console
    console.log('Selected Category:', formData.category);
    console.log('Amount:', formData.amount);
    console.log('Payment Type:', formData.paymentType);
  };
        // You can send the form data to your API endpoint here
  return (
    <div className={`modal ${showModal ? 'show' : ''}`} tabIndex="-1" style={{ display: showModal ? 'block' : 'none'}} >
      <div className="modal-dialog modal-l">
        <div className="modal-content" style={{backgroundColor: 'rgb(32,32,32)'}}>
          <div className="modal-header">
            <h1 className="modal-title fs-5" style={{color:'white'}}>Add Expense</h1>
            <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close" style={{backgroundColor: '#fe0000'}}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              {/* Form content */}
        <div className="form-group">
          <label htmlFor="category">Category: </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
            style={{backgroundColor: 'rgb(32,32,32)', border: 'none'}}
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Transportation">Transportation</option>
            <option value="Entertainment">Entertainment</option>
            {/* Add more categories as needed */}
          </select>
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="payementType">Payment Type: </label>
          <select
            id="payementType"
            name="payementType"
            value={formData.paymentType}
            onChange={handleInputChange}
            required
            style={{backgroundColor: 'rgb(32,32,32)', border: 'none'}}
          >
            <option value="">Select Category</option>
            <option value="Debit">Debit</option>
            <option value="Credit">Credit</option>
          </select>
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="amount">Amount: </label>
          <input
            type="text"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            required
            style={{backgroundColor: 'rgb(32,32,32)'}}
          />
        </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline-danger" onClick={handleCloseModal}>Cancel</button>
            <button type="submit" className="btn btn-success" onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addexpense;
