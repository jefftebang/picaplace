import React, { useState, Fragment } from "react";
import "./PostBit.css";
import CardCatalog from "../../global/components/front-end-comps/CardCatalog";
import Modal from "../../global/components/front-end-comps/Modal";
import Map from "../../global/components/front-end-comps/Map";
import { MDBBtn } from "mdbreact";
import { Link } from "react-router-dom";
import Avatar from "../../global/components/front-end-comps/Avatar";
import { useHttp } from "../../global/components/front-end-comps/http";
import { CommonLoading } from "react-loadingg";

const PostBit = (props) => {
  const { isLoading, sendRequest } = useHttp();
  const [openMap, setOpenMap] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const openMapHandler = () => {
    setOpenMap(true);
  };

  const closeMapHandler = () => {
    setOpenMap(false);
  };

  const openDeleteHandler = () => {
    setOpenConfirm(true);
  };

  const closeDeleteHandler = () => {
    setOpenConfirm(false);
  };

  const submitDeleteHandler = async () => {
    setOpenConfirm(false);
    try {
      await sendRequest(
        `http://localhost:5001/api/posts/${props.id}`,
        "DELETE"
      );
      props.onDelete(props.id);
    } catch (err) {}
  };

  return (
    <Fragment>
      <Modal
        show={openMap}
        header={props.address}
        contentClass="post-bit__modal-content"
        onClick={closeMapHandler}
      >
        <div className="map-wrap">
          <Map center={props.location} zoom={15} />
        </div>
      </Modal>
      <Modal
        className="modal-prompt"
        show={openConfirm}
        onClick={closeDeleteHandler}
        header="DELETE"
        footerClass="post-bit__modal-actions"
        footer={
          <Fragment>
            <hr />
            <div className="delete-footer">
              <MDBBtn
                className="post-btn rounded-0"
                color="grey grey lighten-1"
                onClick={closeDeleteHandler}
              >
                CANCEL
              </MDBBtn>
              <MDBBtn
                className="post-btn rounded-0"
                color="grey grey lighten-1"
                onClick={submitDeleteHandler}
              >
                DELETE
              </MDBBtn>
            </div>
          </Fragment>
        }
      >
        <p style={{ padding: "1rem 3rem" }}>
          Are you sure you want to delete this post? It cannot be undone after.
        </p>
      </Modal>
      <li className="post-bit">
        <CardCatalog className="post-bit__content">
          {isLoading && <CommonLoading color="grey" />}
          {/* <div className="post-head">
            <p className="creatorName">
              <strong>Ctreator Name</strong>
            </p>
          </div> */}
          <div className="post-bit__image">
            <div className="user__image">
              <Avatar image={props.image} alt={props.name} />
            </div>
            <img src={props.image} alt={props.location} />
          </div>
          <div className="post-bit__info">
            <p>
              <strong>{props.address}</strong>
            </p>
            <p className="post-bit__desc">
              {props.name} {props.description}
            </p>
          </div>
          <div className="post-bit__actions">
            <MDBBtn onClick={openMapHandler} className="rounded-0 post-btn">
              VIEW ON MAP
            </MDBBtn>
            {sessionStorage.creator === props.creatorId && (
              <Fragment>
                <Link
                  to={{
                    pathname: `/posts/${props.id}`,
                    state: {
                      description: props.description,
                    },
                  }}
                >
                  <MDBBtn className="rounded-0 post-btn">EDIT</MDBBtn>
                </Link>
                <MDBBtn
                  onClick={openDeleteHandler}
                  className="rounded-0 post-btn"
                >
                  DELETE
                </MDBBtn>
              </Fragment>
            )}
          </div>
        </CardCatalog>
      </li>
    </Fragment>
  );
};

export default PostBit;
