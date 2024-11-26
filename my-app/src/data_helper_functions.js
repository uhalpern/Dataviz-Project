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
      "LAT": unique.LAT,
      "LON": unique.LON,
      "DATA": matchingRecords.map(record => {
        // Return only the fields you want to keep in the "DATA" array (e.g., VALUE)
        const { PARAMETER, LAT, LON, ...rest } = record;  // Destructure to exclude PARAMETER, LAT, LON
        return rest;  // Return the rest of the fields (e.g., VALUE)
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

  return transposedData
}