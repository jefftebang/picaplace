import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";
import CardCatalog from "../../global/components/front-end-comps/CardCatalog";

const UpdatePost = (props) => {
  const [description, setDescription] = useState(
    props.location.state.description
  );

  const postId = useParams().postId;

  const postUpdateHandler = (e) => {
    e.preventDefault();
    const result = {
      description,
    };
  };

  if (!postId) {
    return (
      <div className="center">
        <h2>Cannot find your post.</h2>
      </div>
    );
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
