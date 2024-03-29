import {React, useState} from "react";
import { useAuth } from '@clerk/clerk-react';
const Addinvestment = ({ showModal, handleCloseModal }) => {
  const { userId } = useAuth();
    const [formData, setFormData] = useState({
        category: '',
        generatesCashFlow: '',
        cashFlowAmount: '',
        paymentType:'',
        amount: '',
      });
      console.log('User ID:', userId);
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = async(e) => {
        e.preventDefault();
        if (!formData.category || !formData.amount || !formData.paymentType) {
          // Handle validation error, show error message to the user
          console.error("Please fill out all fields.");
          return;
        }
          // Get the logged-in user's ID (replace 'getLoggedInUserId' with the actual function to get user ID)
          // const userId = await getLoggedInUserId();
          // Send the expense data along with the user ID to your API endpoint
        try {
          const response = await fetch(`https://bills-n-thrills-backend.onrender.com/api/investments/${userId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          body: JSON.stringify({
            userId: userId,
            category: formData.category,
            generatesCashFlow: formData.generatesCashFlow=== 'YES',
            cashFlowAmount: formData.cashFlowAmount,
            paymentType: formData.paymentType,
            amount: formData.amount,
            date: new Date()
          }),
        });
      
          const data = await response.json();
      
          console.log('Investment added successfully:', data);
          setFormData({ category: '', amount: '', cashFlowAmount: '',paymentType:'' }); // Clear the form
        } catch (error) {
          console.error('Error adding investment:', error);
          // Handle error, show error message to the user
        }
        // Log the selected category and amount to the console
        console.log('Selected Category:', formData.category);
        console.log('Amount:', formData.amount);
        // You can send the form data to your API endpoint here
      };
  return (
    <div className={`modal ${showModal ? 'show' : ''}`} tabIndex="-1" style={{ display: showModal ? 'block' : 'none'}}>
      <div className="modal-dialog modal-l">
        <div className="modal-content" style={{backgroundColor: 'rgb(32,32,32)'}}>
          <div className="modal-header">
            <h1 className="modal-title fs-5">Add Investment</h1>
            <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close" style={{backgroundColor: '#fe0000'}}></button>
          </div>
          <div className="modal-body">
          <form onSubmit={handleSubmit}>
              {/* Form content */}
            <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            style={{backgroundColor: 'rgb(32,32,32)', border: 'none'}}
            required
          >
            <option value="">Select Category</option>
            <option value="Real Estate">Real Estate</option>
            <option value="Stock market">Stock market</option>
            <option value="Mutual funds">Mutual funds</option>
            {/* Add more categories as needed */}
          </select>
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="category">Does this investment generate cash flow:</label>
          <select
            id="generatesCashFlow"
            name="generatesCashFlow"
            value={formData.generatesCashFlow}
            onChange={handleInputChange}
            style={{backgroundColor: 'rgb(32,32,32)', border: 'none'}}
            required
          >
            <option value="">Select Category</option>
            <option value="Food">YES</option>
            <option value="Transportation">NO</option>
            {/* Add more categories as needed */}
          </select>
          {formData.generatesCashFlow === 'Food' && (
        <div className="form-group">
          <label htmlFor="cashFlowAmount">Cash Flow Amount(per month):</label>
          <input
            type="text"
            id="cashFlowAmount"
            name="cashFlowAmount"
            value={formData.cashFlowAmount}
            onChange={handleInputChange}
            style={{ backgroundColor: 'rgb(32,32,32)', border: 'none' }}
            required
          />
        </div>
      )}
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="category">Payment Type: </label>
          <select
            id="paymentType"
            name="paymentType"
            value={formData.paymentType}
            onChange={handleInputChange}
            required
            style={{backgroundColor: 'rgb(32,32,32)', border: 'none'}}
          >
            <option value="">Select Payment Type</option>
            <option value="Credit Card">Credit</option>
            <option value="Debit Card">Debit</option>
          </select>
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            style={{backgroundColor: 'rgb(32,32,32)'}}
            required
          />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline-danger" onClick={handleCloseModal}>Cancel</button>
            <button type="submit" className="btn btn-success">Submit</button>
          </div>
          </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addinvestment;
