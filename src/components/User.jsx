import React, { useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../actions/userActions";
import { unixToDate } from "../functions/unixToSeconds";
import Loader from "./Loader";
import Message from "./Message";

// const user = {
//   about: "This is a test",
//   created: 1173923446,
//   delay: 0,
//   id: "jl",
//   karma: 2937,
//   submitted: [8265435, 8168423, 8090946],
// };

const User = ({ match }) => {
  const dispatch = useDispatch();
  const userDetailSelector = useSelector((state) => state.userDetail);
  const { loading, user, error } = userDetailSelector;

  useEffect(() => {
    if (!user && match.params.id !== null) {
      dispatch(getUserById(match.params.id));
    }
  }, [user, dispatch, match.params.id]);

  return (
    <>
      {loading && <Loader />}
      {error && <Message>{error}</Message>}
      {user && (
        <Card>
          <Card.Header>Username - {user.id}</Card.Header>
          <Card.Body>
            <Card.Text>Created : {unixToDate(user.created)}</Card.Text>
            <Card.Text>Karma : {user.karma}</Card.Text>
            <Card.Text>
              <span style={{ fontSize: "4vh" }}>About : </span>
              <br />
              <div dangerouslySetInnerHTML={{ __html: user.about }}></div>
            </Card.Text>
            <Button variant='info'>submitted</Button>
            <Button variant='info'>comments</Button>
            <Button variant='info'>favorites</Button>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default User;
