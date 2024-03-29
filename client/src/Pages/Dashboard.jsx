import React, { useEffect, useState } from 'react';
import '../CSS/Dashboard.css'
import { BarChart, Bar, Tooltip ,ResponsiveContainer ,YAxis, Cell, PieChart, Pie,Legend,Label} from 'recharts';
import { Link } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import _ from 'lodash';
import { useAuth } from '@clerk/clerk-react';
const Dashboard = () => {

  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth
  });
  const [totalCredit, setTotalCredit] = useState(0);
  const [totalSaving, setTotalSaving] = useState(0);
  const [totalNet, setTotalNet] = useState(0);
  const [totalInvest, setTotalInvest] = useState(0);
  const [totalDebitValue, setTotalDebit] = useState(0);
  const {userId} = useAuth();
  function calculateScore(totalSaving, totalInvest) {
    let score = totalSaving + totalInvest ;
    if(score<1086000 && score>0){
      score = 5;
    }
    else if(score>= 1086000){
      score = 9;
    }
    
    return score;
  }
  useEffect(() => {
    const debouncedHandleResize = _.debounce(function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      })
    }, 1000)

    window.addEventListener('resize', debouncedHandleResize)

    return () => {
      window.removeEventListener('resize', debouncedHandleResize)
    }
  })

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
  const data1 = [
    { name: "Category 1", value: 25 }, // Replace with your data values
    { name: "Category 2", value: 25 }, // Replace with your data values
    { name: "Category 3", value: 25 },
    { name: "Category 4", value: 25 },
  ];
const totalValue = data1.reduce((sum, entry) => sum + entry.value, 0);
const pointerValue = 80; // Change this to the desired pointer value

// Calculate the angle for the pointer
const pointerAngle = (pointerValue / totalValue) * 180;

const pointerPath = `M -1,0 L 0,-30 L 1,0 Z`; // Path for the arrow pointer
  // const COLORS = ['#0088FE', '#EFEFEF'];
  const colors = ["#fe0000", "#fec400", "#7ed65d", "#009300"];

  useEffect(() => {
    const fetchCreditData = async () => {
      try {
        const response = await fetch(`https://bills-n-thrills-backend.onrender.com/api/creditData/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        console.log(data);
        // Calculate the total credit value
        // const totalCreditValue = data.reduce((sum, entry) => sum + entry.amount, 0);
        let totalCreditValue = 0;
        for (const entry of data) {
          totalCreditValue += entry.amount;
        }
        setTotalCredit(totalCreditValue);
      } catch (error) {
        console.error('Error fetching credit data:', error);
      }
    };
    const fetchDebitData = async () => {
      try {
        const response = await fetch(`https://bills-n-thrills-backend.onrender.com/api/debitData/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',

          },
        });
        const data = await response.json();
        console.log(data);
        // Calculate the total debit value
        // const totalDebitValue = data.reduce((sum, entry) => sum + entry.amount, 0);
        let totalDebitValue = 0;
    for (const entry of data) {
      totalDebitValue += entry.amount;
    }
        setTotalDebit(totalDebitValue);
      } catch (error) {
        console.error('Error fetching debit data:', error);
      }
    };
    const fetchSavingsData = async () => {
      try {
        const response = await fetch(`https://bills-n-thrills-backend.onrender.com/api/savings/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch savings data');
        }
        const data = await response.json();
        const amounts = data.map(saving => saving.amount); // Extract the amounts from the savings data
        const totalAmount = amounts.reduce((sum, amount) => sum + amount, 0);
        setTotalSaving(totalAmount);
        console.log('Savings data:', data);
        const score = calculateScore(totalSaving, totalInvest);
       setTotalNet(score);
        // Process the savings data as needed
      } catch (error) {
        console.error('Error fetching savings data:', error);
      }
    };

    const fetchinvestmentData = async () => {
      try {
        const response = await fetch(`https://bills-n-thrills-backend.onrender.com/api/investments/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch savings data');
        }
        const data = await response.json();
        const amounts = data.map(saving => saving.amount); // Extract the amounts from the savings data
        const totalAmount = amounts.reduce((sum, amount) => sum + amount, 0);
        setTotalInvest(totalAmount);
        console.log('Savings data:', data);
        const score = calculateScore(totalSaving, totalInvest);
       setTotalNet(score);
        // Process the savings data as needed
      } catch (error) {
        console.error('Error fetching savings data:', error);
      }
    };
    fetchinvestmentData();
    fetchSavingsData();
    fetchCreditData();
    fetchDebitData();
  }, []);
  return (
    <>
    <Navbar/>
    <div class="container row">
      <div class="main col p-3">
        <h1>Dashboard</h1>
        <div class=" row 1 row mb-3">
          <div class="smallheader col mx-2 p-3 rounded-4" style={{backgroundColor: 'rgb(32, 32, 32)'}}><h6>Networth</h6>
            &nbsp;
            <h2 class="networth">₹{totalSaving+totalInvest}</h2>
            {/* <h2 class="networth">₹{netWorth.toFixed(2)}</h2> */}
            {/* <span>90 days <span style={{color: 'rgb(43, 232, 42)'}}>+6,889</span></span> */}
          </div>
          <div class="smallheader col p-3 rounded-4" style={{backgroundColor: 'rgb(32, 32, 32)'}}><h6>Finance Score</h6> 
          {/* <h2 class="networth">₹XXX,XXX.XX</h2> */}
          <ResponsiveContainer width="100%" height={80} class="chart-container">
            <PieChart style={{ marginTop: "0px" }}>
              <Pie
                data={data1}
                cx="50%"
                cy="50%"
                innerRadius={20} // Set innerRadius to 0 for a half circle
                outerRadius={40}
                startAngle={180} // Rotate the Pie to position it as a half circle pointer
                endAngle={0}
                paddingAngle={2}
                stroke="none"
              >
                {data1.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index]} />
                ))}
              </Pie>
              <path
                transform={`translate(155, 40) rotate(${180 + pointerAngle})`}
                d={pointerPath}
                fill="#ffff" // Change the color of the pointer arrow
              />
            </PieChart>
          </ResponsiveContainer>
          <span class='chart-lab'>Score:{totalNet}</span>
          </div>
          <div class="smallheader col mx-2 p-3 rounded-4"style={{backgroundColor: 'rgb(32, 32, 32)'}}><h6>Credit</h6>
          &nbsp;
          <h2 class="networth">-₹{totalCredit.toFixed(2)}</h2>
          {/* <h2 class="networth">₹{netWorth.toFixed(2)}</h2> */}
          </div>  
        </div>  
        <h2>Saving Analytics</h2>
        <div class="saving row">
          <div class="cash col-lg-6 p-3 ">
          <Link to="/savings" style={{textDecoration: "none", color:"black"}}>
            <h6>Cash</h6>
            </Link>
            <h1>₹{totalSaving}</h1>
            {/* grow since last day<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M7 7h8.586L5.293 17.293l1.414 1.414L17 8.414V17h2V5H7v2z"/></svg> */}
          <ResponsiveContainer width="100%" height={100}>
          <BarChart data={data}>
            {/* <Tooltip /> */}
            <Bar dataKey="uv" fill="#00000" barSize={60} barRadius={25}>
              {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={data[index].color} />
              ))}
            </Bar>
            
            </BarChart>
          </ResponsiveContainer>
          </div>
          <div class="inv col-lg-5 p-3">
          <Link to="/investments" style={{textDecoration: "none", color:"black"}}>
            <h6>Investment</h6>
          </Link>
          <h1>₹{totalInvest}</h1>
          &nbsp;
          <ResponsiveContainer width="100%" height={100}>
          <BarChart data={data}>
            {/* <Tooltip /> */}
            <Bar dataKey="uv" fill="#00000" barSize={60}/>
            </BarChart>
          </ResponsiveContainer> 
          </div>
          <div class="col-5 p-1">
            <div class="se p-3 mt-2 text-black"><h6>Business</h6>
              <h3>&nbsp;</h3>
              <h2>Coming soon</h2>
            </div>
          </div>
          <div class="col-2 p-1"><div class="se p-3 mt-2 text-black"><h6>Credit</h6>
            <h3>Coming soon</h3>
              {/* <h2>+XX%</h2> */}
            </div></div>
          <div class="col-2 p-1"><div class="se p-3 mt-2 text-black"><h6>Charity</h6>
            <h3>Coming soon</h3>
              {/* <h2>+XX%</h2> */}
            </div></div>
          <div class="col-3">
            <div class="p-1 mt-3 mb-2 rounded-4 text-black text-center inr" style={{backgroundColor: 'rgb(132, 138, 138)'}}>Income
                <h4>Coming soon</h4>
            </div>
            <div class="p-1 rounded-4 mt-0 text-black text-center inr" style={{backgroundColor: 'rgb(132, 138, 138)'}}>
            Outcome
            <h4>Coming soon</h4>
            </div>
          </div>
        </div>
      </div>
      <div class="sidesection col-lg-3 p-3 d-none d-lg-block">
      <Sidebar/>
      </div>
    </div>
    </>
    
  )
}

export default Dashboard
