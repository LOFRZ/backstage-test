import { createDevApp } from '@backstage/dev-utils';
import { maPremierePagePlugin, MaPremierePagePage } from '../src/plugin';

createDevApp()
  .registerPlugin(maPremierePagePlugin)
  .addPage({
    element: <MaPremierePagePage />,
    title: 'Ma Premiere Page', 
    path: '/ma-premiere-page',
  })
  .render();