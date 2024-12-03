import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Plot from 'react-plotly.js';

function DualPlot() {
  // State for shared settings, like colorscale
  const [colorScale, setColorScale] = useState('Viridis'); // Default colorscale

  // Options for colorscales
  const colorScales = ['Viridis', 'Cividis', 'Jet', 'Hot'];

  // Function to update the colorscale for both plots
  const updateColorScale = (newScale) => {
    setColorScale(newScale);
  };

  // Sample data for plots (you can replace this with your actual data)
  const plotData1 = [
    {
      z: [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
      type: 'heatmap',
      colorscale: colorScale,
    },
  ];

  const plotData2 = [
    {
      z: [[9, 8, 7], [6, 5, 4], [3, 2, 1]],
      type: 'heatmap',
      colorscale: colorScale,
    },
  ];

  return (
    <div>
      {/* Color scale buttons */}
      <div style={{ marginBottom: '20px' }}>
        {colorScales.map((scale) => (
          <button
            key={scale}
            onClick={() => updateColorScale(scale)}
            style={{
              padding: '10px',
              margin: '0 10px',
              backgroundColor: colorScale === scale ? '#4caf50' : '#e0e0e0',
            }}
          >
            {scale}
          </button>
        ))}
      </div>

      {/* Flex container for side-by-side plots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
        {/* Plot 1 */}
        <div style={{ flex: 1 }}>
          <Plot
            data={plotData1}
            layout={{
              title: 'Plot 1',
              width: 400,
              height: 400,
            }}
          />
        </div>

        {/* Plot 2 */}
        <div style={{ flex: 1 }}>
          <Plot
            data={plotData2}
            layout={{
              title: 'Plot 2',
              width: 400,
              height: 400,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default DualPlot;
