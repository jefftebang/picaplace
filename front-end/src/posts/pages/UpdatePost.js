import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";
import CardCatalog from "../../global/components/front-end-comps/CardCatalog";
import { CommonLoading } from "react-loadingg";

const UpdatePost = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [description, setDescription] = useState(
    props.location.state.description
  );
  const history = useHistory();
  const postId = useParams().postId;

  const postUpdateHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const apiOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        description,
      }),
    };

    fetch(`${process.env.REACT_APP_BACKEND_URL}/posts/${postId}`, apiOptions)
      .then((res) => res.json())
      .then((res) => {
        setDescription("");
        setIsLoading(false);
        history.push(`/${sessionStorage.getItem("creator")}/posts`);
      });
  };

  if (!postId) {
    return (
      <div className="center">
        <h2>Cannot find your post.</h2>
      </div>
    );
  }

  if (isLoading) {
    return <CommonLoading color="grey" />;
  }

  return (
    <CardCatalog className="post-form">
      <MDBContainer>
        <MDBRow>
          <MDBCol>
            <form onSubmit={postUpdateHandler}>
              <p className="h5 mb-5">Edit description here:</p>
              <div className="grey-text">
                <MDBInput
                  id="description"
                  className="post-desc"
                  label="Description"
                  group
                  type="textarea"
                  validate
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                />
              </div>
              <div className="text-center rounded-0">
                <MDBBtn className="rounded-0" color="elegant" type="submit">
                  SAVE CHANGES
                </MDBBtn>
              </div>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </CardCatalog>
  );
};

export default UpdatePost;
