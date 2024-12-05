import React, { useEffect, useRef, useState } from 'react';
import Plotly from 'plotly.js-dist';
import { loadAndProcessData } from './ProcessData.js';
import { get_globalLatLons, generateSteps} from './plot_helper_functions.js';
import { createAnnotations } from './annotations';
import { createUpdateMenus } from './updateMenus';
import { getMinMax } from './data_helper_functions.js';

function Plot() {
  const plotDiv = useRef(null);

  const [datasets, setDatasets] = useState(null);
  const [currentDataset, setCurrentDataset] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const loadedDatasets = await loadAndProcessData();
      setDatasets(loadedDatasets);
      setCurrentDataset(loadedDatasets.transposed_temp); // Default dataset

      let steps = generateSteps(currentDataset);

    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchDataAndRenderPlot() {
      if (!currentDataset) return; // Prevent running before the dataset is set
      // Fetch datasets
      const variableButtonHeight = 1.0;
      const variableButtonWidth = 0;
      const colorscaleButtonHeight = 1.0;
      const colorscaleButtonWidth = 1.2;

      const datasets =  await loadAndProcessData();
      console.log("datasets:");
      console.log(datasets);
      const global_lat_lons = get_globalLatLons(datasets.transposed_temp);
      //console.log("lat_lons:")
      //console.log(global_lat_lons);
      const currentMinMax = getMinMax(currentDataset);
      let steps = generateSteps(currentDataset);

      const annotations = createAnnotations(colorscaleButtonHeight, colorscaleButtonWidth)

      const updateMenu = createUpdateMenus(datasets, colorscaleButtonWidth, colorscaleButtonHeight);

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
        opacity: 0.5,
        zmin: currentMinMax.zmin, // Explicit minimum for colorscale
        zmax: currentMinMax.zmax // Explicit maximum for colorscale
      }];

      // Layout for the plot
      let layout = {
        title: {
          text: `${currentDataset[0].Parameter} Density Map`,
          font: {
            family: 'Helvetica, sans-serif', // Choose one of the fonts
            size: 28,
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
      };

      // Render the plot in the referenced div
      Plotly.react(plotDiv.current, data, layout);
    }

    fetchDataAndRenderPlot();
  }, [currentDataset]); // Add currentDataset as a dependency

  return (
    <div>
      {/* div to hold the Plotly plot */}
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        {/* Plot container */}
        <div
          ref={plotDiv}
          style={{
            flex: 1, // Makes the plot container take up most of the available space
          }}
        />

        {/* Button container */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "20px", // Adds spacing between the plot and the buttons
          }}
        >
          <button
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "white",
              border: "1px solid #ccc",
              padding: "5px 10px",
              cursor: "pointer",
              marginBottom: "10px",
              width: "150px", // Set a fixed width for consistency
            }}
            onClick={() => Plotly.restyle(plotDiv.current, { colorscale: "Viridis" })}
          >
            <img
              src="/viridis.png" // Adjust the path to match your public directory
              alt="Viridis"
              style={{ height: "16px", marginRight: "10px" }}
            />
            Viridis
          </button>
          {/* Add more buttons as needed */}
        </div>
      </div>
      <div style={{ padding: "5px", marginRight: "180px"}}>
        {datasets && (
          <>
            <button style={{
              backgroundColor: currentDataset === datasets.transposed_temp ? "#6CA0DC" : "white",
              color: currentDataset === datasets.transposed_temp ? "white" : "black",
              marginRight: "5px",
            }} onClick={() => setCurrentDataset(datasets.transposed_temp)}>Temperature</button>
            <button style={{
              backgroundColor: currentDataset === datasets.transposed_precip ? "#6CA0DC" : "white",
              color: currentDataset === datasets.transposed_precip ? "white" : "black",
              marginRight: "5px",
            }} onClick={() => setCurrentDataset(datasets.transposed_precip)}>Precipitation</button>
            <button style={{
              backgroundColor: currentDataset === datasets.transposed_irrad ? "#6CA0DC" : "white",
              color: currentDataset === datasets.transposed_irrad ? "white" : "black",
            }} onClick={() => setCurrentDataset(datasets.transposed_irrad)}>Solar Irradiance</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Plot;
