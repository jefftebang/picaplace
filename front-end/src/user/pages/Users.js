import React, { useEffect, useState, Fragment } from "react";
import UsersCatalog from "../components/UsersCatalog";
import { CommonLoading } from "react-loadingg";

const Users = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line
  const [error, setError] = useState(undefined);
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:5001/api/users/users");

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setLoadedUsers(responseData.users);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    };
    sendRequest();
  }, []);

  if (isLoading) {
    return <CommonLoading color="grey" />;
  }

  return (
    <Fragment>
      {!isLoading && loadedUsers && <UsersCatalog bits={loadedUsers} />}
    </Fragment>
  );
};

export default Users;
