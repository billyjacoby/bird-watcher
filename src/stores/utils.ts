import * as devalue from 'devalue';
import {MMKV} from 'react-native-mmkv';
import {PersistStorage} from 'zustand/middleware';

/**
 * @description Creates a more complex storage wrapper that will
 * properly store and retrieve values like Maps, Sets, Dates, etc using devalue
 * to do so. The downside to doing this is that we'll have to use zustand's partialize
 * function to ensure that we aren't trying to store any function values.
 */
export const createComplexStorage = <T>(
  storage: MMKV,
): PersistStorage<Partial<T>> => ({
  setItem: (name, value) => {
    const stringified = devalue.stringify(value);
    return storage.set(name, stringified);
  },
  getItem: name => {
    const value = storage.getString(name);
    return devalue.parse(value || '');
  },
  removeItem: name => {
    return storage.delete(name);
  },
});
