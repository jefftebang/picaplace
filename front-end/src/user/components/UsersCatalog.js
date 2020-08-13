import React from "react";
import "./UsersCatalog.css";
import UserBit from "./UserBit";
import CardCatalog from "../../global/components/front-end-comps/CardCatalog";

const UsersCatalog = (props) => {
  if (props.bits.length === 0) {
    return (
      <div className="center">
        <CardCatalog>
          <h2>No users to show.</h2>
        </CardCatalog>
      </div>
    );
  }

  return (
    <ul className="users-catalog">
      {props.bits.map((user) => (
        <UserBit
          key={user.id}
          id={user.id}
          image={user.image}
          name={user.name}
          postCount={user.posts.length}
        />
      ))}
    </ul>
  );
};

export default UsersCatalog;
