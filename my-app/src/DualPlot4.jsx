import React, { useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist';
import { loadAndProcessData } from './ProcessData.js';
import { get_globalLatLons, generateSteps } from './plot_helper_functions.js';
import { createdualAnnotations } from './dualannotations';
import { createDualUpdateMenus } from './dualupdateMenus.js';
import { getMinMax } from './data_helper_functions.js';

function DualPlot() {
  const plotDiv = useRef(null);

  useEffect(() => {
    async function fetchDataAndRenderPlot() {
      // Configuration
      const variableButtonHeight = 1.04;
      const variableButtonWidth = 0;
      const colorscaleButtonHeight = 0.9;
      const colorscaleButtonWidth = 1.12;

      // Fetch datasets
      const datasets = await loadAndProcessData();

      // Assume the first dataset is temperature
      const currentDataset = datasets.transposed_temp;

      const currentMinMax = getMinMax(currentDataset);
      const precipMinMax = getMinMax(datasets.transposed_precip);
      const irradMinMax = getMinMax(datasets.transposed_irrad);

      console.log(currentDataset)

      // Select two different years (for example, first and last year in the dataset)
      const year1 = currentDataset.filter(row => row.Year === 1994);
      const year2 = currentDataset.filter(row => row.Year === 2020);
      console.log(year1);

      let year1_annotation = year1[0].Year;
      let year2_annotation = year2[0].Year;

      // Get global lat/lon for centering
      const global_lat_lons = get_globalLatLons(currentDataset);

      const updateMenu = createDualUpdateMenus(datasets, precipMinMax, variableButtonHeight, colorscaleButtonWidth, colorscaleButtonHeight);

      const annotations = createdualAnnotations(variableButtonHeight, variableButtonWidth, colorscaleButtonHeight, colorscaleButtonWidth, year1_annotation, year2_annotation)

      // Layout configuration
      let layout = {
        title: {
          text: `${currentDataset[0].Parameter} Density Map Comparison`,
          font: {
            family: 'Helvetica, sans-serif',
            size: 24,
            color: '#333'
          }
        },
        grid: {
          rows: 1,
          columns: 3,
          pattern: 'independent'
        },
        width: 1200,
        height: 500,
        margin: { t: 40, r: 40, b: 40, l: 40 },

        // Mapbox configurations for each plot
        mapbox: {
          style: 'open-street-map',
          domain: {
            row: 0,
            column: 0,
            x: [0, 0.48],   // Takes up 45% of the width
            y: [0, 0.95]    // Takes up 95% of the height
             },
          center: {
            lat: global_lat_lons.lat.reduce((sum, lat) => sum + lat, 0) / global_lat_lons.lat.length, // Calculate the center latitude
            lon: global_lat_lons.lon.reduce((sum, lon) => sum + lon, 0) / global_lat_lons.lon.length  // Calculate the center longitude
          },
          zoom: 5.0
        },
        mapbox2: {
          style: 'open-street-map',
          domain: {
            row: 0,
            column: 1,
            x: [0.52, 1],   // Takes up 45% of the width, starting from 55%
            y: [0, 0.95]    // Takes up 95% of the height
             },
          center: {
            lat: global_lat_lons.lat.reduce((sum, lat) => sum + lat, 0) / global_lat_lons.lat.length, // Calculate the center latitude
            lon: global_lat_lons.lon.reduce((sum, lon) => sum + lon, 0) / global_lat_lons.lon.length  // Calculate the center longitude
          },
          zoom: 5.0
        },

        // Annotations and update menus
        annotations: annotations,
        updatemenus: updateMenu
      };

      let data = [
        {
          type: 'densitymapbox',
          lon: year1[0].Data.map(row => row.LON),
          lat: year1[0].Data.map(row => row.LAT),
          z: year1[0].Data.map(row => row.Value),
          colorscale: 'Viridis',
          radius: 50,
          opacity: 0.4,
          zmin: currentMinMax.zmin,
          zmax: currentMinMax.zmax,
          subplot: 'mapbox',
          name: '1994'
        },
        {
          type: 'densitymapbox',
          lon: year2[0].Data.map(row => row.LON),
          lat: year2[0].Data.map(row => row.LAT),
          z: year2[0].Data.map(row => row.Value),
          colorscale: 'Viridis',
          radius: 50,
          opacity: 0.4,
          zmin: currentMinMax.zmin,
          zmax: currentMinMax.zmax,
          subplot: 'mapbox2',
          name: '2020'
        }
      ];

      // Render the plot
      Plotly.newPlot(plotDiv.current, data, layout);
    }

    fetchDataAndRenderPlot();
  }, []);

  return (
    <div>
      <div ref={plotDiv} style={{ minHeight: '500px', minWidth: '900px' }} />
    </div>
  );
}

export default DualPlot;