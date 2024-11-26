import * as d3 from 'd3';

export function get_globalLatLons(data) {
  const lat = data[0].Data.map(row => row.LAT);
  const lon = data[0].Data.map(row => row.LON);

  const global_lat_lons = {lat, lon};

  return global_lat_lons;

};

export function generateSteps(dataset) {
  let steps = dataset.map(row => ({
    label: `Year ${row.Year}`,
    method: 'restyle',
    args: ['z', [row.Data.map(instance => instance.Value)]]
  }));

  return steps;
}