import React, { createContext, useState } from "react";
export const editJobContext = createContext();

const JobEditContext = ({ children }) => {
  const [dataresponse, setDataResponse] = useState([]);

  return (
    <div>
      <editJobContext.Provider value={{ dataresponse, setDataResponse }}>
        {children}
      </editJobContext.Provider>
    </div>
  );
};

export default JobEditContext;
