import React from "react";
import "./PostsCatalog.css";
import CardCatalog from "../../global/components/front-end-comps/CardCatalog";
import PostBit from "./PostBit";
import { MDBBtn } from "mdbreact";
import { Link } from "react-router-dom";

const PostsCatalog = (props) => {
  if (props.bits.length === 0) {
    return (
      <div className="post-catalog center">
        <CardCatalog className="px-5">
          <h3 className="py-3">No posts to show.</h3>
          <Link to="/posts/new">
            <MDBBtn type="submit" className="rounded-0" color="elegant">
              Create Post
            </MDBBtn>
          </Link>
        </CardCatalog>
      </div>
    );
  }

  return (
    <ul className="post-catalog">
      {props.bits.map((post) => (
        <PostBit
          key={post._id}
          id={post._id}
          image={post.image}
          address={post.address}
          description={post.description}
          creatorId={post.creator}
          location={post.location}
          onDelete={props.onDeletePost}
        />
      ))}
    </ul>
  );
};

export default PostsCatalog;
