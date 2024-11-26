import * as d3 from 'd3';

export function init(data) {
  // Find all the unique instances of "PARAMETER", "LAT", "LON"
  const uniqueInstances = data.filter((value, index, self) =>
      index === self.findIndex((t) => (
        t.PARAMETER === value.PARAMETER && t.LAT === value.LAT && t.LON === value.LON
      ))
  );

  // Initialize an array to hold the results
  const result = [];

  // Assign all these unique instances into the array data structure.
  for (let i = 0; i < uniqueInstances.length; i++) {
    const unique = uniqueInstances[i];

    // Find all matching records in the dataNASA dataset
    const matchingRecords = data.filter((record) =>
      record.PARAMETER === unique.PARAMETER &&
      record.LAT === unique.LAT &&
      record.LON === unique.LON
    );

    // Assign all these unique instances into the array data structure.
    result.push({
      // Object Keys: "PARAMETER", "LAT", "LON", and "DATA"
      "PARAMETER": unique.PARAMETER,
      "LAT": parseFloat(unique.LAT),
      "LON": parseFloat(unique.LON),
      "DATA": matchingRecords.map(record => {
        // Return only the fields you want to keep in the "DATA" array (e.g., VALUE)
        const { PARAMETER, LAT, LON, ...rest } = record;  // Destructure to exclude PARAMETER, LAT, LON
        const convertedRest = Object.fromEntries(
          Object.entries(rest).map(([key, value]) => [key, parseFloat(value)])
        );
        return convertedRest;
      })
    });
  }
  return result;
}

export function transposeData(processedData) {
  // get unique years from the first item's DATA array
  const uniqueYears = processedData[0].DATA.map(entry => entry.YEAR);
  const parameter = Object.keys(processedData[0].DATA[0])[1] // get second key of DATA field

  // transpose the data
  const transposedData = uniqueYears.map(year => ({
    Parameter: parameter,
    Year: year,
    Data: processedData.map(location => ({
      LAT: location.LAT,
      LON: location.LON,
      Value: location.DATA.find(data => data.YEAR === year)[parameter]
    }))
  }));

  return transposedData;
}

export function getMinMax(dataset)  {
  // return an array of years where for each year we have an array of temperatures for the lat/lons
  let unflat = dataset.map(row => {
    let yearTemp = row.Data.map(data => data.Value);
    return yearTemp;
  });

  // flatten array so that we can apply operations on all values
  const flattened = unflat.flat();

  // Remove 0s since they represent missing values
  const fliteredFlattned = flattened.filter(value => value !== 0)

  // min and max values will be based on one standard deviation away from mean in both directions
  const mean = d3.mean(fliteredFlattned);
  const sd = d3.deviation(fliteredFlattned);

  const max_val = mean + sd;

  // Make sure min_val is not below 0
  const min_val = mean - (2 * sd);
  const min_vals = [min_val, 0];
  const real_minval = d3.max(min_vals);

  return {
    zmax: max_val,
    zmin: real_minval
  };
};