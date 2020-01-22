import {createContext} from 'react';

export const DictionaryContext = createContext({ user: null, setUser: () => {}, langs: {}, langMap: {} });
