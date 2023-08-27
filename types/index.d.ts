import {MainStackParamList} from '../src/navigation';

declare let __DEV__: boolean;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends MainStackParamList {}
  }
}
