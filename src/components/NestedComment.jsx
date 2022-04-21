import React from "react";
import { ListGroup } from "react-bootstrap";
import Comment from "./Comment";

const NestedComment = ({ comments, kids }) => {
  return (
    comments && (
      <ListGroup as='ol' numbered={true}>
        {Object.values(comments).map(
          (comment) =>
            comment &&
            kids &&
            kids.includes(comment.id) && (
              <Comment comments={comments} comment={comment} />
            )
        )}
      </ListGroup>
    )
  );
};

export default NestedComment;
