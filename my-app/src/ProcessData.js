import * as d3 from 'd3';
import { init, transposeData } from './data_helper_functions.js';

export async function loadAndProcessData() {

  // Read in raw datasets
  const raw_precip_data = await d3.csv('/avg_precipitation.csv');
  const raw_temp_data = await d3.csv('/solar_irradiance.csv');
  const raw_irrad_data = await d3.csv('/solar_irradiance.csv');


  // Transform datasets to have parameter, year, and data fields
  // data field will have lat, lon, and value field
  const mod_precip = init(raw_precip_data);
  const mod_temp_data = init(raw_temp_data);
  const mod_irrad_data = init(raw_irrad_data);

  // Transpose data so that every row is a year
  // transforms into optimal format for year slider
  const transposed_precip = transposeData(mod_precip);
  const transposed_temp = transposeData(mod_temp_data);
  const transposed_irrad = transposeData(mod_irrad_data);

  const datasets = {transposed_precip, transposed_temp, transposed_irrad};
  console.log(datasets);

  return datasets;
}