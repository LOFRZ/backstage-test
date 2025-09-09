import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { pageRouteRef } from './routes';

export const maPremierePagePlugin = createPlugin({
  id: 'ma-premiere-page',
  routes: {
    root: pageRouteRef,
  },
});

export const MaPremierePagePage = maPremierePagePlugin.provide(
  createRoutableExtension({
    name: 'MaPremierePagePage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: pageRouteRef,
  }),
);
