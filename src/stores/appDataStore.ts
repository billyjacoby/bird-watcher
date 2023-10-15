import {MMKV} from 'react-native-mmkv';
import {create} from 'zustand';
import {createJSONStorage, persist, StateStorage} from 'zustand/middleware';

import {DEFAULT_EVENTS_TO_LOAD} from '@utils';

const appDataStore = new MMKV({
  id: 'bird-watcher',
  encryptionKey: '',
});

const simpleStorage: StateStorage = {
  getItem: name => appDataStore.getString(name) || null,
  setItem: (name, value) => appDataStore.set(name, value),
  removeItem: name => appDataStore.delete(name),
};

interface AppDataStore {
  hasOpenedAppBefore: boolean;
  setHasOpenedAppBefore: (b?: boolean) => void;
  currentCamera?: string;
  setCurrentCamera: (s: string) => void;
  eventsToLoad: number;
  setEventsToLoad: (n?: number) => void;
}

const defaultDataStore = {
  currentCamera: undefined,
  hasOpenedAppBefore: false,
  eventsToLoad: DEFAULT_EVENTS_TO_LOAD,
};

export const useAppDataStore = create<
  AppDataStore,
  [['zustand/persist', Partial<AppDataStore>]]
>(
  persist(
    set => ({
      currentCamera: undefined,
      hasOpenedAppBefore: false,
      eventsToLoad: DEFAULT_EVENTS_TO_LOAD,
      setEventsToLoad: (n?: number) =>
        set({eventsToLoad: n || defaultDataStore.eventsToLoad}),
      setHasOpenedAppBefore: (b?: boolean) =>
        set({hasOpenedAppBefore: typeof b === 'undefined' ? true : b}),
      setCurrentCamera: (currentCamera: string) => set({currentCamera}),
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => simpleStorage),
      //   partialize: state =>
      //     Object.fromEntries(
      //       Object.entries(state).filter(
      //         ([key]) =>
      //           ![
      //             'setEventsToLoad',
      //             'keyToNotStore',
      //           ].includes(key),
      //       ),
      //     ),
    },
  ),
);
