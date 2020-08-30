import React, { useContext } from "react";
import moment from "moment";
import { authContext } from "../../context/auth.context";
import { Link } from "react-router-dom";

export default () => {
  const {
    auth: { user },
  } = useContext(authContext);
  return (
    user && (
      <>
        <h3> User Info</h3>
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
        <p>Joined: {moment(user.joinedDate).fromNow()}</p>
        <ul>
          <h3>{user.username}'s Favorites:</h3>
          {user.favourites.length ? (
            user.favourites.map((favourite) => (
              <Link key={favourite._id} to={`recipes/${favourite._id}`}>
                <li>{favourite.name}</li>
              </Link>
            ))
          ) : (
            <li>No favourites</li>
          )}
        </ul>
      </>
    )
  );
};
