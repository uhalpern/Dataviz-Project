import React, { useEffect, useRef, useState } from 'react';
import Plotly from 'plotly.js-dist';
import { loadAndProcessData } from './ProcessData.js';
import { get_globalLatLons, generateSteps } from './plot_helper_functions.js';
import { createdualAnnotations } from './dualannotations';
import { getMinMax } from './data_helper_functions.js';
import { createDualUpdateMenus } from './dualupdateMenus.js';
import { buttonConfigs } from "./colorscaleButtonConfig.js";

function DualPlot() {
  const plotDiv = useRef(null);

  const [datasets, setDatasets] = useState(null);
  const [currentDataset, setCurrentDataset] = useState(null);
  const [year1, setYear1] = useState(null);
  const [year2, setYear2] = useState(null);
  const [selectedColorscale, setSelectedColorscale] = useState('Portland'); // Default colorscale

  useEffect(() => {
    async function fetchData() {
      const loadedDatasets = await loadAndProcessData();
      setDatasets(loadedDatasets);
      setCurrentDataset(loadedDatasets.transposed_temp); // Default dataset

      setYear1(1984);
      setYear2(2022);
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (!currentDataset || !datasets || !year1 || !year2) return;

    const currentMinMax = getMinMax(currentDataset);
    const global_lat_lons = get_globalLatLons(currentDataset);

    const selectedYear1 = currentDataset.filter((row) => row.Year === year1);
    const selectedYear2 = currentDataset.filter((row) => row.Year === year2);

    //const updateMenu = createDualUpdateMenus(1.12, 0.9);
    const annotations = createdualAnnotations(
      0.9,
      1.12,
      year1,
      year2
    );

    const data = [
      {
        type: 'densitymapbox',
        lon: selectedYear1[0].Data.map((row) => row.LON),
        lat: selectedYear1[0].Data.map((row) => row.LAT),
        z: selectedYear1[0].Data.map((row) => row.Value),
        colorscale: selectedColorscale,
        radius: 50,
        opacity: 0.4,
        zmin: currentMinMax.zmin,
        zmax: currentMinMax.zmax,
        subplot: 'mapbox',
        name: `${year1}`,
      },
      {
        type: 'densitymapbox',
        lon: selectedYear2[0].Data.map((row) => row.LON),
        lat: selectedYear2[0].Data.map((row) => row.LAT),
        z: selectedYear2[0].Data.map((row) => row.Value),
        colorscale: selectedColorscale,
        radius: 50,
        opacity: 0.4,
        zmin: currentMinMax.zmin,
        zmax: currentMinMax.zmax,
        subplot: 'mapbox2',
        name: `${year2}`,
      },
    ];

    const layout = {
      width: 1000,
      height: 455,
      margin: { t: 40, r: 40, b: 40, l: 40 },
      title: {
        text: `${currentDataset[0].Parameter} Density Map Comparison`,
        font: {size: 26}
      },
      //updatemenus: updateMenu,
      annotations: annotations,
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
        zoom: 5.05,
      },
      mapbox2: {
        style: 'open-street-map',
        domain: { x: [0.52, 1], y: [0, 0.95] },
        center: {
          lat: global_lat_lons.lat.reduce((sum, lat) => sum + lat, 0) / global_lat_lons.lat.length,
          lon: global_lat_lons.lon.reduce((sum, lon) => sum + lon, 0) / global_lat_lons.lon.length,
        },
        zoom: 5.05,
      },
    };

    Plotly.newPlot(plotDiv.current, data, layout);
  }, [currentDataset, year1, year2, selectedColorscale]);

  const renderButtons = () =>
    buttonConfigs.map((button, index) => (
      <button
        key={index}
        className={`plot-button ${button.colorscale === selectedColorscale ? "selected" : ""}`} // Add 'selected' class conditionally
        onClick={() => setSelectedColorscale(button.colorscale)}
      >
        <img
          src={button.imgSrc}
          alt={button.alt}
        />
        {button.label}
      </button>
    ));

  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        {/* Plot container */}
        <div
          ref={plotDiv}
          style={{
            flex: 1, // Makes the plot container take up most of the available space
          }}
        />
        {/* Button container */}
        <div className="button-container">
          Choose Colorscale:
          {renderButtons()}
        </div>
      </div>
      <div style={{ padding: "5px", marginRight: "200px"}}>
        {datasets && (
          <>
            <button
              className={`custom-button ${currentDataset === datasets.transposed_temp ? "active" : ""}`}
              onClick={() => setCurrentDataset(datasets.transposed_temp)}
            >
              Temperature
            </button>
            <button
              className={`custom-button ${currentDataset === datasets.transposed_precip ? "active" : ""}`}
              onClick={() => setCurrentDataset(datasets.transposed_precip)}
            >
              Precipitation
            </button>
            <button
              className={`custom-button ${currentDataset === datasets.transposed_irrad ? "active" : ""}`}
              onClick={() => setCurrentDataset(datasets.transposed_irrad)}
            >
              Solar Irradiance
            </button>
          </>
        )}
      </div>
      {currentDataset && (
        <div style={{ padding: "5px", marginRight: "200px"}}>
          <label style={{ padding: "5px" }}>
            Year 1:
            <select style={{ marginLeft: "10px" }} value={year1 || ''} onChange={(e) => setYear1(parseInt(e.target.value))}>
              {Array.from(new Set(currentDataset.map((row) => row.Year))).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </label>
          <label style={{ padding: "5px" }}>
            Year 2:
            <select style={{ marginLeft: "10px" }} value={year2 || ''} onChange={(e) => setYear2(parseInt(e.target.value))}>
              {Array.from(new Set(currentDataset.map((row) => row.Year))).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}
    </div>
  );
}

export default DualPlot;
