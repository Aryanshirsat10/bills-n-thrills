import React from 'react';
import '../CSS/Dashboard.css';
import {ResponsiveContainer, AreaChart, Legend, Area} from 'recharts';

const Sidebar = () => {
    const data1 = [
        {
          "name": "Page A",
          "Age32":0,
          "Age42":0,
          "Age52":0,
          "Age62":0,
        },
        {
          "name": "Page B",
          "Age32":200,
          "Age42":500,
          "Age52":1000,
          "Age62":2000,
          
    
        },
        {
          "name": "Page C",
          "Age32":400,
          "Age42":1200,
          "Age52":2100,
          "Age62":4500,
    
        },
        {
          "name": "Page D",
          "Age32": 1000,
          "Age42":2500,
          "Age52":4500,
          "Age62":8000,
          
        },
        {
          "name": "Page E",
          "Age32": 2100,
          "Age42": 5000,
          "Age52": 8000,
          "Age62":12000,
          
        }
      ]
  return (
    <div class="chart-container">
        <h4>Increase your relative <br/> return by</h4>
        <h4>Network by age</h4>
        <div>
        <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data1}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          {/* <defs>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FFFFFF" stopOpacity={0.9}/>
              <stop offset="95%" stopColor="#14FF00" stopOpacity={0.5}/>
            </linearGradient>
          </defs> */}
          {/* <YAxis />  */}
          {/* <Tooltip /> */}
          <Legend iconType='circle' align='left'/>
          <Legend iconType='circle' align='left'/>
          <Legend iconType='circle' align='left'/>
          <Legend iconType='circle' align='left'/>
          <Area type="monotone" dataKey="Age62" stroke="#c3e1c5" fillOpacity={1} fill="#c3e1c5" />
          <Area type="monotone" dataKey="Age52" stroke="#9ce49b" fillOpacity={1} fill="#9ce49b" />
          <Area type="monotone" dataKey="Age42" stroke="#7ce57e" fillOpacity={1} fill="#7ce57e" />
          <Area type="monotone" dataKey="Age32" stroke="#2be82a" fillOpacity={1} fill="#2be82a" />
        </AreaChart>
        </ResponsiveContainer>
        <h3 class="chart-label text-white">9.7%</h3>
        </div>
        <div class="row mt-5 p-3">
          <h5>Recommendations</h5>
          <div className="col-5 p-3 text-black rounded-5 mt-2" style={{backgroundColor: 'rgb(43, 232, 42)'}}><h4></h4>
            {/* ₹xx<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M7 7h8.586L5.293 17.293l1.414 1.414L17 8.414V17h2V5H7v2z"/></svg> */}
            &nbsp;<br/><br/>
            <h6>Share's price rising</h6>
          </div>
          <div className="col-5 p-3 mx-2 bg-white text-black rounded-5 mt-2"><h4></h4>
          <p><span style={{ color:'#2ae029'}}>&#x2B;</span>&nbsp;&nbsp;<strong></strong></p>
            &nbsp;
            <h6>Points<br/>changes</h6>
          </div>
        </div>
    </div>
    
  )
}

export default Sidebar