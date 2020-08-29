import React, { useContext, useState } from "react";
import moment from "moment";
import { authContext } from "../../context/auth.context";
import { useQuery } from "react-apollo";
import { GET_CURRENT_USER } from "../../queries";
import { Link } from "react-router-dom";

export default () => {
  const [loading, setLoading] = useState(false);
  const {
    auth: { user },
    dispatch,
  } = useContext(authContext);

  // const onCompleted = (data) => {
  //   console.log("hello");
  //   dispatch({ type: "setUser", user: data.getCurrentUser });
  //   console.log(data.getCurrentUser);
  //   setLoading(false);
  // };

  // useQuery(GET_CURRENT_USER, { onCompleted });
  return (
    !loading &&
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
