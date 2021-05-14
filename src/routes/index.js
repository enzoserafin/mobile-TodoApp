import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Home from '../views/Home';
import Task from '../views/Task';
import QrCode from '../views/QrCode';

const Routes = createAppContainer(
  createSwitchNavigator({
    Home,
    Task,
    QrCode,
  }),
);

export default Routes;
