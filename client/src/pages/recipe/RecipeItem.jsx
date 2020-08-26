import React from "react";
import { Link } from "react-router-dom";

export default ({ _id, imageUrl, name, category }) => {
  return (
    <li className="card">
      <span className={category}>{category}</span>
      <div className="card-text">
        <Link to={`/recipes/${_id}`}>
          <h4>{name}</h4>
        </Link>
      </div>
    </li>
  );
};
