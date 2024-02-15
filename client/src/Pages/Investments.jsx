import {React, useState,useEffect} from 'react';
import '../CSS/investments.css'
import { Tooltip ,ResponsiveContainer,Cell, PieChart, Pie, Legend, Label,ComposedChart,XAxis,YAxis,Area,Bar,BarChart, Line} from 'recharts';
import { Link } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Addinvestment from '../Components/Addinvestment';
import { useAuth } from '@clerk/clerk-react';
const Investments = () => {
  const data = [
    {
      "name": "RealEstate",
      "uv": 90,
      "color": '#24c924',
      "pv": 90,
      "amt": 90
    },
    {
      "name": "Stock Market",
      "uv": 150,
      "color": '#20aa1f',
      "pv": 150,
      "amt": 120

    },
    {
      "name": "Mutual Funds",
      "uv": 200,
      "color": '#1a8b19',
      "pv": 200,
      "amt": 200

    },
    {
      "name": "other",
      "uv": 300,
      "color": '#000000',
      "pv": 480,
      "amt": 218
    }
  ]
  // const data1 = [
  //   { name: 'Progress', value: 70 },
  //   { name: 'Remaining', value: 30 },
  // ];
  
  // const COLORS = ['#0088FE', '#EFEFEF'];
  const investmentsData = [
    { id: 1, name: 'Investment 1', percentage: '+10%' },
    { id: 2, name: 'Investment 2', percentage: '+15%' },
    { id: 3, name: 'Investment 3', percentage: '+15%' },
    { id: 4, name: 'Investment 4', percentage: '+15%' },
    { id: 5, name: 'Investment 5', percentage: '+15%' },
    { id: 6, name: 'Investment 6', percentage: '+15%' },
    { id: 7, name: 'Investment 7', percentage: '+15%' },
    { id: 8, name: 'Investment 8', percentage: '+15%' },
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
        const response = await fetch(`https://bills-n-thrills-backend.onrender.com/api/investments/${userId}`, {
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
        <h1>Investments</h1>  
        <div class="saving row">
          <div class="cash col-lg-6 p-3 ">
          <h6>Investment Performance</h6>
          {/* <h1>XX%</h1> */}
              {selectedInvestment ? (
                // Render Graph for Selected Investment
                <ResponsiveContainer width="100%" height={200}>
                  {/* Render your graph based on selectedInvestment.graphData */}
                  {/* Example: selectedInvestment.graphData*/}
                  <ComposedChart width="100%" height={250} data={existingData} style={{marginTop: "50px"}}>
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
                  <BarChart data={data} style={{marginTop: "50px"}}> 
                  <YAxis/>
                  <XAxis dataKey="name" />
                    <Bar dataKey="uv" fill="#00000" barSize={60} barRadius={25}>
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={data[index].color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
          </div>
          <div className="inv col-lg-6 p-3" style={{ maxHeight: '350px', overflowY: 'scroll' }}>
            <h6>Investments</h6>
            <ul className="list-group" style={{ listStyle: 'none', padding: '0' }}>
              {existingData.map(investment => (
                <li key={investment._id} className="list-group-item" onClick={() => handleInvestmentClick(investment)} style={{listStyle: "none", border: 'none'}}>
                  <Link to="#" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h5>{investment.category}</h5>
                    <p>{investment.amount}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div class="col-lg-6 p-1">
            <div class="se p-3 mt-2 text-black"><h6>Calculators</h6>
              <a href="https://sipcalculator.in/" target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none', color: 'black'}}>
                <h1>SIP CALCULATOR</h1>
              </a>
              <p style={{color: 'black'}}>Calculate the sip for your investments here</p>
            </div>
          </div>
          <div class="col-lg-6 p-1"><div class="se p-3 mt-2 text-black"><h6>Latest news</h6>
            <h3>Comming soon...</h3>
            </div>
            </div>
        </div>
      </div>
      <div className="circular-button" onClick={togglePopup}>
        +
      </div>

      {/* Popup Div */}
      {isModalOpen && <Addinvestment showModal={isModalOpen} handleCloseModal={handleCloseModal} />}
    </div>
    </>
    
  )
}

export default Investments
