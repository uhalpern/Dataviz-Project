import { getMinMax } from './data_helper_functions.js';
import { generateSteps } from './plot_helper_functions.js';

export function createDualUpdateMenus(  colorscaleButtonWidth, colorscaleButtonHeight) {

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
  //console.log(updateMenu)
  return updateMenu;
}
