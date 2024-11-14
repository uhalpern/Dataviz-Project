import * as d3 from 'd3';

export async function loadAndProcessData() {
  const data = await d3.csv('/married.csv');
  const married_parsed = data.map(row => ({
    ...row,  // Spread the original row to keep other fields intact
    "Total Married": parseInt(row["Total Married"].replace(/,/g, ''), 10),
    "Married couple households": parseInt(row["Married couple households"].replace(/,/g, ''), 10),
    "Married couple households Opposite-sex": parseInt(row["Married couple households Opposite-sex"].replace(/,/g, ''), 10),
    "Married couple households Same-sex": parseInt(row["Married couple households Same-sex"].replace(/,/g, ''), 10),
  }));

  const TO_NAME = 1;
  const TO_ABBREVIATED = 2;
  function convertRegion(input, to) {
    var states = [
      ['Alabama', 'AL'],
      ['Alaska', 'AK'],
      ['American Samoa', 'AS'],
      ['Arizona', 'AZ'],
      ['Arkansas', 'AR'],
      ['Armed Forces Americas', 'AA'],
      ['Armed Forces Europe', 'AE'],
      ['Armed Forces Pacific', 'AP'],
      ['California', 'CA'],
      ['Colorado', 'CO'],
      ['Connecticut', 'CT'],
      ['Delaware', 'DE'],
      ['District Of Columbia', 'DC'],
      ['Florida', 'FL'],
      ['Georgia', 'GA'],
      ['Guam', 'GU'],
      ['Hawaii', 'HI'],
      ['Idaho', 'ID'],
      ['Illinois', 'IL'],
      ['Indiana', 'IN'],
      ['Iowa', 'IA'],
      ['Kansas', 'KS'],
      ['Kentucky', 'KY'],
      ['Louisiana', 'LA'],
      ['Maine', 'ME'],
      ['Marshall Islands', 'MH'],
      ['Maryland', 'MD'],
      ['Massachusetts', 'MA'],
      ['Michigan', 'MI'],
      ['Minnesota', 'MN'],
      ['Mississippi', 'MS'],
      ['Missouri', 'MO'],
      ['Montana', 'MT'],
      ['Nebraska', 'NE'],
      ['Nevada', 'NV'],
      ['New Hampshire', 'NH'],
      ['New Jersey', 'NJ'],
      ['New Mexico', 'NM'],
      ['New York', 'NY'],
      ['North Carolina', 'NC'],
      ['North Dakota', 'ND'],
      ['Northern Mariana Islands', 'NP'],
      ['Ohio', 'OH'],
      ['Oklahoma', 'OK'],
      ['Oregon', 'OR'],
      ['Pennsylvania', 'PA'],
      ['Puerto Rico', 'PR'],
      ['Rhode Island', 'RI'],
      ['South Carolina', 'SC'],
      ['South Dakota', 'SD'],
      ['Tennessee', 'TN'],
      ['Texas', 'TX'],
      ['US Virgin Islands', 'VI'],
      ['Utah', 'UT'],
      ['Vermont', 'VT'],
      ['Virginia', 'VA'],
      ['Washington', 'WA'],
      ['West Virginia', 'WV'],
      ['Wisconsin', 'WI'],
      ['Wyoming', 'WY'],
    ];

    if (to === TO_ABBREVIATED) {
      input = input.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
      for (let i = 0; i < states.length; i++) {
        if (states[i][0] === input) {
          return states[i][1];
        }
      }
    } else if (to === TO_NAME) {
      input = input.toUpperCase();
      for (let i = 0; i < states.length; i++) {
        if (states[i][1] === input) {
          return states[i][0];
        }
      }
    }
    return input; // In case of no match, return the input as-is
  }

  // Mapping the function to "State name" field in married_parsed
  let married_parsed2 = married_parsed.map(row => {
    return {
      ...row,
      "State_abb": convertRegion(row["State name"], TO_ABBREVIATED)  // Converting to abbreviated form
    };
  });

  //console.log(married_parsed2)

  const married_final = married_parsed2.map((row, count) => {
    return {
      ...row,  // Spread the original row to keep other fields intact
      "OBJECTID": count  // Add 1 if you want OBJECTID to start from 1 instead of 0
    };
  });

  console.log(married_final)

  return married_final
}