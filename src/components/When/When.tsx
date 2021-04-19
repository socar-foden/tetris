import React from "react";

const When: React.FC<{ condition: boolean }> = ({ condition, children }) => {
  return <>{condition && children}</>;
};

export default When;
