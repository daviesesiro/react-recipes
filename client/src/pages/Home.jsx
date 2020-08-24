import React from "react";

import { Query } from "react-apollo";
import { GET_ALL_RECIPES } from "../queries";
const Home = () => {
  return (
    <div>
      <Query query={GET_ALL_RECIPES}>
        {({ data, loading, error }) => {
          if (loading) return <div>Loading</div>;
          if (error) return <div>Error</div>;
          console.log(data);
          return <p>recipe</p>;
        }}
      </Query>
    </div>
  );
};
export default Home;
