import {React, useState,useEffect} from 'react';
import '../CSS/Expense.css'
import { Tooltip ,ResponsiveContainer,Cell, PieChart, Pie, Legend, Label,ComposedChart,XAxis,YAxis,Area,Bar, Line} from 'recharts';
import { Link } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Addexpense from '../Components/Addexpense';
import UserDataFetcher from '../Components/UserDataFetcher';
import { useAuth } from '@clerk/clerk-react';

const Expense = () => {
  const data = [
    {
      "name": "Food",
      "value": 1000
    },
    {
      "name": "Investment",
      "value": 1000
    },
    {
      "name": "Tranportation",
      "value":  2000
    },
    {
      "name": "Others",
      "value": 100
    }
  ];
  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF00FF', '#FF5733', '#C70039', '#900C3F'];
  const investmentsData = [
    { id: 1, name: 'Expense 1', percentage: '+10%' },
    { id: 2, name: 'Expense 2', percentage: '+15%' },
    { id: 3, name: 'Expense 3', percentage: '+15%' },
    { id: 4, name: 'Expense 4', percentage: '+15%' },
    { id: 5, name: 'Expense 5', percentage: '+15%' },
    { id: 6, name: 'Expense 6', percentage: '+15%' },
    { id: 7, name: 'Expense 7', percentage: '+15%' },
    { id: 8, name: 'Expense 8', percentage: '+15%' },
    // Add more investment data objects as needed
  ];
  const [selectedInvestment, setSelectedInvestment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [existingData, setExistingData] = useState([]);

  const handleInvestmentClick = (investment) => {
    setSelectedInvestment(investment);
  };

  const togglePopup = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const {userId} = useAuth();

  useEffect(() => {
    // Fetch existing data from the database when the component mounts
    const fetchExistingData = async () => {
      try {
        const response = await fetch(`https://bills-n-thrills-backend.onrender.com/api/expenses/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        console.log(data);
        setExistingData(data);
      } catch (error) {
        console.error('Error fetching existing data:', error);
      }
    };

    fetchExistingData();
  }, [userId]);
  
  return (
    <>
    <Navbar/>
    <div class="container row">
      <div class="main col p-3">
        <h1>Expenses</h1>  
        <UserDataFetcher/>
        <div class="saving row">
          <div class="cash col-lg-6 p-3 " style={{backgroundColor: "rgb(255,255,255)"}}>
          <h3>Expenses Diversity</h3>
          <h3>{selectedInvestment ? selectedInvestment.percentage : ''}</h3>
              {selectedInvestment ? (
                // Render Graph for Selected Investment
                <ResponsiveContainer width="100%" height={200}>
                  {/* Render your graph based on selectedInvestment.graphData */}
                  {/* Example: selectedInvestment.graphData*/}
                  <ComposedChart width="100%" height={250} data={existingData} style={{marginTop: "40px"}}>
                    <XAxis dataKey="category" />
                    <YAxis dataKey="amount"/>
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="amount" fill="#8884d8" stroke="#8884d8" />
                    <Bar dataKey="amount" barSize={20} fill="#413ea0" />
                    <Line type="monotone" dataKey="amount" stroke="#ff7300" />
                  </ComposedChart>
                </ResponsiveContainer>
              ) : (
                // Default content when no investment is selected
                // <p>Select an investment to view its performance graph.</p>
                <ResponsiveContainer width="100%" height={200}>
                  {/* Render your graph based on selectedInvestment.graphData */}
                  {/* Example: selectedInvestment.graphData*/}
                  {/* <h1>{selectedInvestment ? selectedInvestment.percentage : 'XX%'}</h1> */}
                  <PieChart style={{marginTop: "40px"}}>
                  <Tooltip contentStyle={{ color: "black" }}/>
                    <Pie data={data} cx="50%" cy="50%" innerRadius={70} outerRadius={100} >
                      {
                        data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={colors[index]}/>
                        ))
                      }
                      <Label
                      value="Expenses"
                      position="center"
                      fill="black"
                      style={{
                        fontSize: "32px",
                        fontWeight: "bold",
                        fontFamily: "Roboto"
                      }}
                    />
                    </Pie>
                    <Legend iconType='circle' align="right" verticalAlign="middle" layout="vertical" wrapperStyle={{ paddingRight: "30px" }} />
                    
                  </PieChart>
                </ResponsiveContainer>
              )}
          </div>
          <div className="inv col-lg-6 p-3" style={{ maxHeight: '350px', overflowY: 'scroll',backgroundColor:"rgb(32, 32, 32)",color:"white" }}>
            <h6>Expenses</h6>
            <ul className="list-group" style={{ listStyle: 'none', padding: '0'}}>
              {existingData.map(expense => (
                <li key={expense._id} className="list-group-item" onClick={() => handleInvestmentClick(expense)} style={{listStyle: "none", border: 'none', backgroundColor:"rgb(32, 32, 32)", color: 'white'}}>
                  <Link to="#" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h5>{expense.category}</h5>
                    <p>{expense.amount}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div class="col-lg-6 p-1">
            <div class="se p-3 mt-2 text-black"><h6>Calculators</h6>
              <a href="https://emicalculator.net/" target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none', color: 'black'}}>
                <h4>EMI CALCULATOR</h4>
              </a>
              <p style={{color: 'black'}}>Calculate the emi for your loans here</p>
            </div>
          </div>
        </div>
      </div>
      <div className="circular-button" onClick={togglePopup}>
        +
      </div>

      {/* Popup Div */}
      {isModalOpen && <Addexpense showModal={isModalOpen} handleCloseModal={handleCloseModal} />}
    </div>
    </>
    
  )
}

export default Expense
