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

export function createUpdateMenus(datasets, precipMinMax, variableButtonHeight, colorscaleButtonWidth, colorscaleButtonHeight) {

  console.log("datasets in updatemenu");
  console.log(datasets);
  const updateMenu =  [
    {
      buttons: [
        {
          method: 'update',
          args: [
            {
              lon: [datasets.transposed_temp[0].Data.map(row => row.LON)],
              lat: [datasets.transposed_temp[0].Data.map(row => row.LAT)],
              z: [datasets.transposed_temp[0].Data.map(row => row.Value)],
              zmin: getMinMax(datasets.transposed_temp).zmin,
              zmax: getMinMax(datasets.transposed_temp).zmax,
            },
            {
              title: `${datasets.transposed_temp[0].Parameter} Density Map`,
              sliders: [
                {
                  ...baseSliderConfig, // Spread the base styling so that only below params get updated
                  active: 0,
                  steps: generateSteps(datasets.transposed_temp),
                },
              ],
            },
          ],
          label: 'Temperature',
        },
        {
          method: 'update',
          args: [
            {
              lon: [datasets.transposed_precip[0].Data.map(row => row.LON)],
              lat: [datasets.transposed_precip[0].Data.map(row => row.LAT)],
              z: [datasets.transposed_precip[0].Data.map(row => row.Value)],
              zmin: precipMinMax.zmin,
              zmax: precipMinMax.zmax,
            },
            {
              title: `${datasets.transposed_precip[0].Parameter} Density Map`,
              sliders: [
                {
                  ...baseSliderConfig, // Spread the base styling so that only below params get updated
                  active: 0,
                  steps: generateSteps(datasets.transposed_precip),
                },
              ],
            },
          ],
          label: 'Precipitation',
        },
        {
          method: 'update',
          args: [
            {
              lon: [datasets.transposed_irrad[0].Data.map(row => row.LON)],
              lat: [datasets.transposed_irrad[0].Data.map(row => row.LAT)],
              z: [datasets.transposed_irrad[0].Data.map(row => row.Value)],
              zmin: getMinMax(datasets.transposed_irrad).zmin,
              zmax: getMinMax(datasets.transposed_irrad).zmax,
            },
            {
              title: `${datasets.transposed_irrad[0].Parameter} Density Map`,
              sliders: [
                {
                  ...baseSliderConfig, // Spread the base styling so that only below params get updated
                  active: 0,
                  steps: generateSteps(datasets.transposed_irrad),
                },
              ],
            },
          ],
          label: 'Solar Irradiance',
        },
      ],
      direction: 'down',
      type: 'dropdown',
      showactive: true,
      x: 0,
      xanchor: 'left',
      y: variableButtonHeight,
      yanchor: 'top',
    },
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
