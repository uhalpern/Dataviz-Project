export const createAnnotations = (variableButtonHeight, variableButtonWidth, colorscaleButtonHeight, colorscaleButtonWidth) => {
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
  ];
};