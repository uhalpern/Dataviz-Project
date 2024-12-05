export const createAnnotations = (colorscaleButtonHeight, colorscaleButtonWidth) => {
  const annotation_offset = 0.05;

  return [
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