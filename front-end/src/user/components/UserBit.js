import React from "react";
import "./UserBit.css";
import Avatar from "../../global/components/front-end-comps/Avatar";
import { Link } from "react-router-dom";
import CardCatalog from "../../global/components/front-end-comps/CardCatalog";

const UserBit = (props) => {
  return (
    <li className="user-bit__li">
      <CardCatalog className="user-bit__content user-bit">
        <Link to={`/${props.id}/posts`}>
          <div className="user-bit__image">
            <Avatar image={props.image} alt={props.name} />
          </div>
          <div className="user-bit__info">
            <h4>{props.name}</h4>
            <h6>
              {props.postCount} {props.postCount <= 1 ? "Post" : "Posts"}
            </h6>
          </div>
        </Link>
      </CardCatalog>
    </li>
  );
};

export default UserBit;
