import React, { useState } from "react";
import PropTypes from "prop-types";

const DataContext = React.createContext(null);

export { DataContext };

function DataContextContainer(props) {
  const [allProperties, setAllProperties] = useState([]);
  const [listedProperties, setListedProperties] = useState([]);
  
  return (
    <DataContext.Provider
      value={{
        allProperties,
        setAllProperties,
        listedProperties,
        setListedProperties
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
}
DataContextContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DataContextContainer;
