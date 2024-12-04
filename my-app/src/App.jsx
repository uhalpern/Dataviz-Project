import React, { useState } from 'react'
import './App.css'

// Import your Plot component
import Plot from './Plot.jsx';
import DualPlot from './DualPlot2.jsx';
//import DualPlot from './DualPlot'; // Dual-plot component
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import NavbarComponent from './Navbar'; // Import Navbar component
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles

function App() {
  const [isDualPlot, setIsDualPlot] = useState(false); // set initial state to no dual plot

  const toggleView = () => {
    setIsDualPlot((prev) => !prev);
  };

  return (
    <Container fluid style={{ padding: 0 }}>
      <NavbarComponent setIsDualPlot={setIsDualPlot} />
      <Container
        style={{
          display: 'flex',
          flexDirection: 'column',   // Stack items vertically (header above plot)
          justifyContent: 'center', // Horizontally centers content
          alignItems: 'center',     // Vertically centers content
          minHeight: '100vh',       // Ensures full viewport height for centering
          textAlign: 'center',      // Centers text horizontally inside the container
        }}
      >
        <h1>Climate Variable Visualizer</h1>
        {isDualPlot ? <DualPlot /> : <Plot />} {/* If isDualPlot is true, display dual plot else,  */}
      </Container>
    </Container>
  )
}

export default App


{/*/!* Conditionally render either Plot or DualPlot *!/*/}
{/*<div>*/}
{/*  {isDualPlot ? <DualPlot /> : <Plot />}*/}
{/*</div>*/}