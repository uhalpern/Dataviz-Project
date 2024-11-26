import React, { useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist';
import { loadAndProcessData } from './ProcessData.js';
import { get_globalLatLons, generateSteps} from './plot_helper_functions.js';
import { annotations } from './annotations';
import { createUpdateMenus } from './updateMenus';
import { getMinMax } from './data_helper_functions.js';

function App() {
  const plotDiv = useRef(null);

  useEffect(() => {
    async function fetchDataAndRenderPlot() {
      // Fetch datasets
      const variableButtonHeight = 1.0;
      const colorscaleButtonHeight = 1.0;
      const colorscaleButtonWidth = 1.2;

      const datasets =  await loadAndProcessData();
      console.log("datasets:");
      console.log(datasets);
      const global_lat_lons = get_globalLatLons(datasets.transposed_temp);
      console.log("lat_lons:")
      console.log(global_lat_lons);
      const currentDataset = datasets.transposed_temp;
      const currentMinMax = getMinMax(currentDataset);
      const precipMinMax = getMinMax(datasets.transposed_precip);
      const irradMinMax = getMinMax(datasets.transposed_irrad);

      let steps = generateSteps(currentDataset);

      const updateMenu = createUpdateMenus(datasets, precipMinMax, variableButtonHeight, colorscaleButtonWidth, colorscaleButtonHeight);

      const baseSliderConfig = {
        len: 0.8,
        bgcolor: '#e0e0e0',
        bordercolor: '#444',
        borderwidth: 2,
        tickwidth: 1,
        pad: { l: 5, t: 10, b: 30 },
        x: 0.1,
      };


      // Plotly data
      let data = [{
        type: 'densitymapbox',
        lon: currentDataset[0].Data.map(row => row.LON),
        lat: currentDataset[0].Data.map(row => row.LAT),
        z: currentDataset[0].Data.map(row => row.Value), // Initial z values
        colorscale: 'Portland', // Consistent colorscale
        radius: 50,
        opacity: 0.4,
        zmin: currentMinMax.zmin, // Explicit minimum for colorscale
        zmax: currentMinMax.zmax // Explicit maximum for colorscale
      }];

      // Layout for the plot
      let layout = {
        title: {
          text: `${currentDataset[0].Parameter} Density Map`,
          font: {
            family: 'Helvetica, sans-serif', // Choose one of the fonts
            size: 24,
            color: '#333' // Adjust the color if needed
          },
        },
        mapbox: {
          style: 'open-street-map',
          center: {
            lat: global_lat_lons.lat.reduce((sum, lat) => sum + lat, 0) / global_lat_lons.lat.length, // Calculate the center latitude
            lon: global_lat_lons.lon.reduce((sum, lon) => sum + lon, 0) / global_lat_lons.lon.length  // Calculate the center longitude
          },
          zoom: 5.0
        },
        width: 900, // Width of the plot in pixels
        height: 500, // Height of the plot in pixels
        margin: { t: 40, r: 0, b: 0, l: 0 },
        sliders: [{
          ...baseSliderConfig,
          active: 0,
          steps: steps // Use the dynamically generated steps
        }],
        annotations: annotations,
        updatemenus: updateMenu,
      };

      // Render the plot in the referenced div
      Plotly.newPlot(plotDiv.current, data, layout);
    }

    fetchDataAndRenderPlot();
  }, []);

  return (
    <div>
      <h1>Climate Variable Visualizer</h1>
      {/* div to hold the Plotly plot */}
      <div ref={plotDiv} />
    </div>
  );
}

export default App;
