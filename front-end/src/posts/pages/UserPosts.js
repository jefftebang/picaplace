import React, { useEffect, Fragment } from "react";
import PostsCatalog from "../components/PostsCatalog";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { CommonLoading } from "react-loadingg";
import { useHttp } from "../../global/components/front-end-comps/http";

const UserPosts = () => {
  const [loadedPosts, setLoadedPosts] = useState();
  const { isLoading, sendRequest } = useHttp();

  const userId = useParams().userId;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const resData = await sendRequest(
          `http://localhost:5001/api/posts/user/${userId}`
        );
        setLoadedPosts(resData);
      } catch (err) {}
    };
    fetchPosts();
  }, [sendRequest, userId]);

  if (isLoading) {
    return <CommonLoading color="grey" />;
  }

  return (
    <Fragment>
      {" "}
      {!isLoading && loadedPosts && <PostsCatalog bits={loadedPosts} />}
    </Fragment>
  );
};

export default UserPosts;
