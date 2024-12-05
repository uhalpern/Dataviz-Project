import { getMinMax } from './data_helper_functions.js';
import { generateSteps } from './plot_helper_functions.js';

const baseSliderConfig = {
  len: 0.8,
  bgcolor: '#e0e0e0',
  bordercolor: '#444',
  borderwidth: 2,
  tickwidth: 1,
  pad: { l: 5, t: 10},
  x: 0.1,
};

export function createUpdateMenus(datasets, colorscaleButtonWidth, colorscaleButtonHeight) {

  const updateMenu =  [
    {
      buttons: [
        { args: ['colorscale', 'Viridis'], label: 'Viridis', method: 'restyle' },
        { args: ['colorscale', 'Portland'], label:'Portland', method:'restyle' },
        { args: ['colorscale', 'Earth'], label:'Earth', method:'restyle' },
        { args: ['colorscale', 'Hot'], label:'Hot', method:'restyle' },
        { args: ['colorscale', 'Jet'], label:'Jet', method:'restyle' },
        { args: ['colorscale', 'Electric'], label:'Electric', method:'restyle' },
        { args: ['colorscale', 'Rainbow'], label:'Rainbow', method:'restyle' },
        { args: ['colorscale', 'Blackbody'], label:'Blackbody', method:'restyle' },
        { args: ['colorscale', 'Cividis'], label:'Cividis', method:'restyle' }
      ],
      direction: 'down',
      pad: { r: 10, t: 10 },
      showactive: true,
      type: 'buttons',
      x: colorscaleButtonWidth,
      xanchor: 'left',
      y: colorscaleButtonHeight,
      yanchor: 'top',
      active: 1,
    },
  ];

  return updateMenu;
}
