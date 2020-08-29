import React from "react";
import { Link } from "react-router-dom";

export default ({ _id, likes, name }) => (
  <li key={_id}>
    <h1>
      <Link to={"recipes/" + _id}>{name}</Link>
    </h1>
    <p>Likes: {likes}</p>
  </li>
);
