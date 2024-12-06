export const createdualAnnotations = (colorscaleButtonHeight, colorscaleButtonWidth, year1, year2) => {
  const annotation_offset = 0.05;

  return [
    {
      text: year1,
      x: 0.24,  // Centered above mapbox
      y: 1.02,   // Above the mapbox
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
      y: 1.02,   // Above the mapbox2
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