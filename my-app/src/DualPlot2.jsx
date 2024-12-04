import React, { useEffect, useRef, useState } from 'react';
import Plotly from 'plotly.js-dist';
import { loadAndProcessData } from './ProcessData.js';
import { get_globalLatLons, generateSteps } from './plot_helper_functions.js';
import { createdualAnnotations } from './dualannotations';
import { getMinMax } from './data_helper_functions.js';
import { createDualUpdateMenus } from './dualupdateMenus.js';

function DualPlot() {
  const plotDiv = useRef(null);

  // Add state for the current dataset
  const [datasets, setDatasets] = useState(null);
  const [currentDataset, setCurrentDataset] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const loadedDatasets = await loadAndProcessData();
      setDatasets(loadedDatasets);
      setCurrentDataset(loadedDatasets.transposed_temp); // Default dataset
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (!currentDataset || !datasets) return;

    const currentMinMax = getMinMax(currentDataset);
    const colorscaleButtonHeight = 0.5;
    const colorscaleButtonWidth = 0.5;

    // Select two different years (example: 1994 and 2020)
    const year1 = currentDataset.filter((row) => row.Year === 1984);
    const year2 = currentDataset.filter((row) => row.Year === 2022);
    console.log("year1", year1)

    const global_lat_lons = get_globalLatLons(currentDataset);

    const updateMenu = createDualUpdateMenus( colorscaleButtonWidth, colorscaleButtonHeight);
    console.log("Update menu")
    console.log(updateMenu)

    const data = [
      {
        type: 'densitymapbox',
        lon: year1[0].Data.map((row) => row.LON),
        lat: year1[0].Data.map((row) => row.LAT),
        z: year1[0].Data.map((row) => row.Value),
        colorscale: 'Viridis',
        radius: 50,
        opacity: 0.4,
        zmin: currentMinMax.zmin,
        zmax: currentMinMax.zmax,
        subplot: 'mapbox',
        name: '1994',
      },
      {
        type: 'densitymapbox',
        lon: year2[0].Data.map((row) => row.LON),
        lat: year2[0].Data.map((row) => row.LAT),
        z: year2[0].Data.map((row) => row.Value),
        colorscale: 'Viridis',
        radius: 50,
        opacity: 0.4,
        zmin: currentMinMax.zmin,
        zmax: currentMinMax.zmax,
        subplot: 'mapbox2',
        name: '2020',
      },
    ];

    const layout = {
      width: 1200,
      height: 500,
      margin: { t: 40, r: 40, b: 40, l: 40 },
      title: `${currentDataset[0].Parameter} Density Map Comparison`,
      updatemenus: updateMenu,
      grid: {
        rows: 1,
        columns: 3,
        pattern: 'independent',
      },
      mapbox: {
        style: 'open-street-map',
        domain: { x: [0, 0.48], y: [0, 0.95] },
        center: {
          lat: global_lat_lons.lat.reduce((sum, lat) => sum + lat, 0) / global_lat_lons.lat.length,
          lon: global_lat_lons.lon.reduce((sum, lon) => sum + lon, 0) / global_lat_lons.lon.length,
        },
        zoom: 5.0,
      },
      mapbox2: {
        style: 'open-street-map',
        domain: { x: [0.52, 1], y: [0, 0.95] },
        center: {
          lat: global_lat_lons.lat.reduce((sum, lat) => sum + lat, 0) / global_lat_lons.lat.length,
          lon: global_lat_lons.lon.reduce((sum, lon) => sum + lon, 0) / global_lat_lons.lon.length,
        },
        zoom: 5.0,
      },
    };

    Plotly.newPlot(plotDiv.current, data, layout);
  }, [currentDataset]);

  return (
    <div>
      <div ref={plotDiv} style={{ minHeight: '500px', minWidth: '900px' }} />
      <div>
        {datasets && (
          <>
            <button onClick={() => setCurrentDataset(datasets.transposed_temp)}>Temperature</button>
            <button onClick={() => setCurrentDataset(datasets.transposed_precip)}>Precipitation</button>
            <button onClick={() => setCurrentDataset(datasets.transposed_irrad)}>Solar Irradiance</button>
          </>
        )}
      </div>
    </div>
  );
}

export default DualPlot;
