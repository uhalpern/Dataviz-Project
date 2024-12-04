export const createdualAnnotations = (variableButtonHeight, variableButtonWidth, colorscaleButtonHeight, colorscaleButtonWidth, year1, year2) => {
  const annotation_offset = 0.05;

  return [
    {
      text: 'Select Variable:',
      x: variableButtonWidth,
      y: variableButtonHeight + annotation_offset,
      yref: 'paper',
      align: 'left',
      pad: { 'b': 5 },
      showarrow: false,
    },
    {
      text: 'Choose Colorscale:',
      x: colorscaleButtonWidth + 0.15,
      y: colorscaleButtonHeight + annotation_offset,
      yref: 'paper',
      align: 'left',
      showarrow: false,
    },
    {
      text: year1,
      x: 0.24,  // Centered above mapbox
      y: 1.01,   // Above the mapbox
      showarrow: false,
      font: {
        size: 20,
        color: 'black'
      },
      xref: 'paper',
      yref: 'paper'
    },
    {
      text: year2,
      x: 0.76,  // Centered above mapbox2
      y: 1.01,   // Above the mapbox2
      showarrow: false,
      font: {
        size: 20,
        color: 'black'
      },
      xref: 'paper',
      yref: 'paper'
    }
  ];
};