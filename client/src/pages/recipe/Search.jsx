import React, { useState } from "react";
import { useQuery } from "react-apollo";
import { SEARCH_RECIPES } from "../../queries";
import SearchItem from "./SearchItem";

export default () => {
  const { client, loading } = useQuery(SEARCH_RECIPES, {
    onCompleted: (data) => setRecipes(data.searchRecipes),
  });
  const [recipes, setRecipes] = useState([]);

  const handleSearchChange = async (e) => {
    e.persist();
    const { value } = e.target;
    const { data } = await client.query({
      query: SEARCH_RECIPES,
      variables: { searchTerm: value },
    });
    setRecipes(data.searchRecipes);
  };

  return !loading ? (
    <>
      <input
        type="search"
        placeholder="Search Recipes"
        onChange={handleSearchChange}
      />
      <ul>
        {recipes.map((recipe) => (
          <SearchItem key={recipe._id} {...recipe} />
        ))}
      </ul>
    </>
  ) : (
    <div>Loading</div>
  );
};
