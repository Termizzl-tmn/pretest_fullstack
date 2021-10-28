import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const [dataTable, setDataTable] = useState([]);
  const [filter, setfilter] = useState();

  useEffect(() => {
    axios.get(`https://api.publicapis.org/categories`)
      .then(res => {
        const persons = res.data;
        setDataTable(persons)
      })
  }, []);

  function TableMapData(props) {
    const data = props.data;
    const filter = props.filter;
    const dataFromFilter = data.filter(categories => (categories.toLowerCase().includes(filter.toLowerCase())));

    const dataMap = dataFromFilter.map((categories, i) =>
      <tr key={i}><td></td><td>{categories}</td></tr>
    );

    return dataMap;
  }

  return (
    <div className="container">
      <div className="searchLine">
        <input placeholder="search"
          onChange={(e) => {
            setfilter(e.target.value);
          }} />
      </div>
      <table>
        <thead><tr><th>#</th><th>CATEGORIES</th></tr></thead>
        <tbody>
          <TableMapData data={dataTable} filter={filter} />
        </tbody>
      </table>
    </div>
  );
}

export default App;