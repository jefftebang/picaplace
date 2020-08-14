import React, { useState } from "react";
import "./NewPost.css";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";
import CardCatalog from "../../global/components/front-end-comps/CardCatalog";
import { CommonLoading } from "react-loadingg";
import { useHistory } from "react-router-dom";

const NewPost = () => {
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const postSubmitHandler = (e) => {
    setIsLoading(true);
    e.preventDefault();
    const apiOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        address,
        description,
        creator: sessionStorage.getItem("creator"),
      }),
    };

    fetch("http://localhost:5001/api/posts", apiOptions)
      .then((res) => res.json())
      .then((res) => {
        setIsLoading(false);
        setAddress("");
        setDescription("");
        history.push(`/${sessionStorage.getItem("creator")}/posts`);
      });
  };

  if (isLoading) {
    return <CommonLoading color="grey" />;
  }

  return (
    <CardCatalog className="post-form">
      <MDBContainer>
        <MDBRow>
          <MDBCol>
            <form onSubmit={postSubmitHandler}>
              <p className="h5 mb-4">Create new post here:</p>
              <div className="grey-text">
                <MDBInput
                  id="address"
                  label="Address"
                  group
                  type="text"
                  validate
                  error="wrong"
                  success="right"
                  onChange={(e) => setAddress(e.target.value)}
                />
                <MDBInput
                  id="description"
                  className="post-desc"
                  label="Description"
                  group
                  type="textarea"
                  validate
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="text-center rounded-0">
                <MDBBtn type="submit" className="rounded-0" color="elegant">
                  POST
                </MDBBtn>
              </div>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </CardCatalog>
  );
};

export default NewPost;
