import { React, useState } from "react";
import { useAuth } from '@clerk/clerk-react';

const Addsavings = ({ showModal, handleCloseModal }) => {
  const { userId } = useAuth();

  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    paymentType: ''
  });

  console.log('User ID:', userId);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.category || !formData.amount || !formData.paymentType) {
      console.error("Please fill out all fields.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/savings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: userId,
          category: formData.category,
          paymentType: formData.paymentType,
          amount: formData.amount,
          date: new Date() // or get the date from the form if needed
        }),
      });

      const data = await response.json();

      console.log('Saving added successfully:', data);

      setFormData({ category: '', amount: '', paymentType: '' }); // Clear the form
    } catch (error) {
      console.error('Error adding saving:', error);
    }
  };

  return (
    <div className={`modal ${showModal ? 'show' : ''}`} tabIndex="-1" style={{ display: showModal ? 'block' : 'none' }} >
      <div className="modal-dialog modal-l">
        <div className="modal-content" style={{ backgroundColor: 'rgb(32,32,32)' }}>
          <div className="modal-header">
            <h1 className="modal-title fs-5" style={{ color: 'white' }}>Add Saving</h1>
            <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close" style={{ backgroundColor: '#fe0000' }}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="category">Category: </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  style={{ backgroundColor: 'rgb(32,32,32)', border: 'none' }}
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
                <label htmlFor="paymentType">Payment Type: </label>
                <select
                  id="paymentType"
                  name="paymentType"
                  value={formData.paymentType}
                  onChange={handleInputChange}
                  required
                  style={{ backgroundColor: 'rgb(32,32,32)', border: 'none' }}
                >
                  <option value="">Select Payment Type</option>
                  <option value="Cash">Cash</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Debit Card">Debit Card</option>
                  {/* Add more payment types as needed */}
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
                  style={{ backgroundColor: 'rgb(32,32,32)' }}
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

export default Addsavings;