import React from "react";
import GurmanServiceContext from "../gurman-service-context";

const WithGurmanService = () => (Wrapped) => {
  return (props) => {
    return (
      <GurmanServiceContext.Consumer>
        {(GurmanService) => {
          return <Wrapped {...props} GurmanService={GurmanService} />;
        }}
      </GurmanServiceContext.Consumer>
    );
  };
};

export default WithGurmanService;
