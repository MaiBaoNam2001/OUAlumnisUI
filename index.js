import { registerRootComponent } from 'expo';
import { enGB, registerTranslation } from 'react-native-paper-dates';

import Main from './Main';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(Main);
registerTranslation('en-GB', enGB);