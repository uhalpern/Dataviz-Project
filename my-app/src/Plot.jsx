import React, { useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist';
import { loadAndProcessData } from './ProcessData.js'; // Assuming this is where your data processing function is

function App() {
  const plotDiv = useRef(null);

  useEffect(() => {
    async function fetchDataAndRenderPlot() {
      // Fetch and process your final data
      const married_final = await loadAndProcessData();

      // Plotly data
      const data = [{
        type: 'choropleth',
        locationmode: 'USA-states',
        locations: married_final.map(item => item["State_abb"]),
        z: married_final.map(item => item["Married couple households Same-sex"]),
        text: married_final.map(item => item["State name"]),
        colorscale: "Cividis",
        zmin: 20, // Adjusted to make the scale suitable for your data range
        zmax: 100000,
        colorbar: {
          title: 'Same-sex Married Households',
          thickness: 5,
        },
      }];

      // Layout for the plot
      const layout = {
        title: 'Same-sex Married Households by State',
        geo: {
          scope: 'usa',
        },
        dragmode: false,
      };

      // Render the plot in the referenced div
      Plotly.newPlot(plotDiv.current, data, layout);
    }

    fetchDataAndRenderPlot();
  }, []);

  return (
    <div>
      <h1>Same-sex Married Households Visualization</h1>
      {/* div to hold the Plotly plot */}
      <div ref={plotDiv} />
    </div>
  );
}

export default App;
