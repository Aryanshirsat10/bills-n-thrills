import {React, useState} from 'react';
import '../CSS/investments.css'
import { BarChart, Bar, Tooltip ,ResponsiveContainer ,YAxis,XAxis, Cell} from 'recharts';
import { Link } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Addinvestment from '../Components/Addinvestment';
const Investments = () => {
  const data = [
    {
      "name": "Page A",
      "uv": 90,
      "color": '#24c924',
      "pv": 90,
      "amt": 90
    },
    {
      "name": "Page B",
      "uv": 150,
      "color": '#20aa1f',
      "pv": 150,
      "amt": 120

    },
    {
      "name": "Page C",
      "uv": 200,
      "color": '#1a8b19',
      "pv": 200,
      "amt": 200

    },
    {
      "name": "Page D",
      "uv": 250,
      "color": '#136813',
      "pv": 250,
      "amt": 250
    },
    {
      "name": "Page E",
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

  const handleInvestmentClick = (investment) => {
    setSelectedInvestment(investment);
  };

  const togglePopup = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
    <Navbar/>
    <div class="container row">
      <div class="main col p-3">
        <h1>Investments</h1>  
        <div class="saving row">
          <div class="cash col-lg-6 p-3 ">
          <h6>Investment Performance</h6>
          <h1>XX%</h1>
              {selectedInvestment ? (
                // Render Graph for Selected Investment
                <ResponsiveContainer width="100%" height={200}>
                  {/* Render your graph based on selectedInvestment.graphData */}
                  {/* Example: selectedInvestment.graphData*/}
                  <BarChart data={selectedInvestment.graphData}> 
                    <Bar dataKey="value" fill="#00000" barSize={60} barRadius={25}>
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                // Default content when no investment is selected
                // <p>Select an investment to view its performance graph.</p>
                <ResponsiveContainer width="100%" height={200}>
                  {/* Render your graph based on selectedInvestment.graphData */}
                  {/* Example: selectedInvestment.graphData*/}
                  {/* <h1>{selectedInvestment ? selectedInvestment.percentage : 'XX%'}</h1> */}
                  <BarChart data={data}> 
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
              {investmentsData.map(investment => (
                <li key={investment.id} className="list-group-item" onClick={() => handleInvestmentClick(investment)} style={{listStyle: "none", border: 'none'}}>
                  <Link to="#" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h5>{investment.name}</h5>
                    <p>{investment.percentage}</p>
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
            <h3>xxx,xxx</h3>
              <h2>+XX%</h2>
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