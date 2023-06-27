import React, { useEffect, useState } from "react";
import { useAuthContext } from "@asgardeo/auth-react";
import axios from 'axios';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';


const App = () => {

  const { state, signIn, signOut, getIDToken, getAccessToken } = useAuthContext();
  const [drugList, setDrugList] = useState(null); // Corrected line
  const [searchInput, setSearchInput] = useState('');



  async function handleSearch() {
    if (state.isAuthenticated) {
      const token = await getAccessToken();
      try {
        const query = `query {
            findByNDC(ndc: "${searchInput}") {
            description
            effectiveDate
            ndc
            nadac_PerUnit
          }
        }`;
        const res = await axios.post('https://d5bf27b3-7029-4076-97d2-b7937585e512-dev.e1-us-east-azure.choreoapis.dev/uzrg/nadac/1.0.0/', { query }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`

          }
        });
        const fetchedData = res.data.data.findByNDC;
        console.log(fetchedData);
        setDrugList(fetchedData);


      } catch (error) {
        console.error('Error fetching data:', error);
        setDrugList([]);

      }
    }
    else {
      //alert box to say login
      alert("Please Login to Search");
    }

  }

  const handleChange = (event) => {
    setSearchInput(event.target.value);
  };



  return (
    <div style={{ backgroundColor: 'white', color: 'blue', height: '60vh' }}>
      <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
        {
          state.isAuthenticated
            ? (
              <div>

                <button
                  style={{
                    backgroundColor: 'blue',
                    color: 'white',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                  onClick={() => signOut()}
                >
                  Log out
                </button>
              </div>
            )
            : <button
              style={{
                backgroundColor: 'blue',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
              onClick={() => signIn()}
            >
              Login
            </button>
        }


      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'right',
          height: '50%',
          paddingLeft: '20px',
        }}
      >
        <h1 style={{ color: 'blue' }}>Prime Therapeutics Demo App</h1>
      </div>
      {state.isAuthenticated ? <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '-50px' }}>
        <input
          type="text"
          style={{
            borderRadius: '20px',
            padding: '10px',
            width: '400px',
            marginRight: '10px',
            border: '1px solid blue',
          }}
          placeholder="Search..."
          value={searchInput}
          onChange={handleChange}
        />
        <button
          style={{
            backgroundColor: 'blue',
            color: 'white',
            borderRadius: '20px',
            padding: '10px 20px',
            border: 'none',
            cursor: 'pointer',
          }}
          onClick={handleSearch}
        >
          Search
        </button>
      </div> : <div>
        <h1 style={{ color: 'blue', textAlign: 'center' }}>Please Login to Search</h1>
      </div>
      }
      <div style={{ height: '40px' }}></div>
      <div>
        <Container style={{ display: 'flex', justifyContent: 'center' }}>
          <Table striped bordered hover style={{ backgroundColor: '#f1f5f8' }}>
            <thead>
              <tr>
                <th style={{ backgroundColor: '#325ac2', color: '#fff', borderRadius: '8px 8px 0 0' }}>NDC</th>
                <th style={{ backgroundColor: '#325ac2', color: '#fff', borderRadius: '0 0 0 0' }}>Description</th>
                <th style={{ backgroundColor: '#325ac2', color: '#fff', borderRadius: '0 0 0 0' }}>Nadac Per Unit</th>
                <th style={{ backgroundColor: '#325ac2', color: '#fff', borderRadius: '0 0 8px 8px' }}>Effective Date</th>
              </tr>
            </thead>
            <tbody>
              {drugList &&
                drugList.map((drug, index) => (
                  <tr key={index}>
                    <td style={{ backgroundColor: '#fff' }}>{drug.ndc}</td>
                    <td style={{ backgroundColor: '#fff' }}>{drug.description}</td>
                    <td style={{ backgroundColor: '#fff' }}>{drug.nadac_PerUnit}</td>
                    <td style={{ backgroundColor: '#fff' }}>{drug.effectiveDate}</td>
                  </tr>
                ))}
            </tbody>
          </Table>

        </Container>
      </div>
    </div>


  );
}

export default App;