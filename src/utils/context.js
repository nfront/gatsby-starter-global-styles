import React, { useState } from 'react';

const defaultContextValue = {
  data: {
    // set initial data shape here
    menuOpen: false,
  },
  mergeData: () => {},
};

const Context = React.createContext(defaultContextValue);
const { Provider } = Context;

function ContextProviderComponent({ children }) {
  const [data, setData] = useState({
    // context value is wrapped in state,
    // then state is passed as context value.
    // Spread syntax to merge mergeData function
    // as property with the defaultContextValue.
    // In effect, we overwrite empty mergeData,
    // which already exists on the object.
    ...defaultContextValue,
    mergeData, // shorthand method name
  });

  function mergeData(newData) {
    // console.log('SETTING CONTEXT PROVIDER STATE...');

    // Again, we keep copy the old state structure,
    // including the data property and the mergeData method,
    // and overwrite old data property (via merge) with
    // new data property that merges old properties like menuOpen,
    // with new properties (newData) passed by the Consumer.

    // If Consumer passes property named menuOpen, spread syntax
    // will overwrite existing menuOpen property,
    // instead of merging in a new property.

    // If we decide to pass in an object with new properties
    // that are not already inside the data property, then they
    // will be added to the data object (i.e. merged in).
    setData(oldData => ({
      ...oldData,
      data: {
        ...oldData.data,
        ...newData,
      },
    }));
  }

  return <Provider value={data}>{children}</Provider>;
}

export { Context as default, ContextProviderComponent };
