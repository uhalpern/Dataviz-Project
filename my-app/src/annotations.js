
const variableButtonHeight = 1.0;
const annotation_offset = 0.05;
const colorscaleButtonHeight = 1.0;
const colorscaleButtonWidth = 1.2;

export const annotations = [
  {
    text: 'Select Variable:',
    x: 0,
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