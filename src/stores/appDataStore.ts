import {MMKV} from 'react-native-mmkv';
import {create} from 'zustand';
import {persist, StateStorage} from 'zustand/middleware';

const appDataStore = new MMKV({
  id: 'bird-watcher',
  encryptionKey: '',
});

const zustandStorage: StateStorage = {
  setItem: (name, value) => {
    return appDataStore.set(name, value);
  },
  getItem: name => {
    const value = appDataStore.getString(name);
    return value ?? null;
  },
  removeItem: name => {
    return appDataStore.delete(name);
  },
};

interface AppDataStore {
  hasOpenedAppBefore: boolean;
  setHasOpenedAppBefore: (b?: boolean) => void;
  currentCamera?: string;
  setCurrentCamera: (s: string) => void;
}

export const useAppDataStore = create<
  AppDataStore,
  [['zustand/persist', Partial<AppDataStore>]]
>(
  persist(
    set => ({
      currentCamera: undefined,
      hasOpenedAppBefore: false,
      setHasOpenedAppBefore: (b?: boolean) =>
        set({hasOpenedAppBefore: typeof b === 'undefined' ? true : b}),
      setCurrentCamera: (currentCamera: string) => set({currentCamera}),
    }),
    {
      name: 'app-storage',
      getStorage: () => zustandStorage,
      // partialize: state =>
      //   Object.fromEntries(
      //     Object.entries(state).filter(
      //       ([key]) =>
      //         ![
      //           'userAgent',
      //         ].includes(key),
      //     ),
      //   ),
    },
  ),
);
