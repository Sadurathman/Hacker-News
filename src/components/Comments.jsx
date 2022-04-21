import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getComments } from "../actions/itemActions";
import Comment from "./Comment";
import Loader from "./Loader";
import Message from "./Message";

// const comments = {
//   2921983: {
//     user: "norvig",
//     id: 2921983,
//     kids: [2922097, 2922429, 2924562, 2922709, 2922573, 2922140, 2922141],
//     parent: 2921506,
//     text: "Aw shucks, guys ... you make me blush with your compliments.<p>Tell you what, Ill make a deal: I'll keep writing if you keep reading. K?",
//     time: 1314211127,
//     type: "comment",
//   },
//   2921982: {
//     user: "norvig",
//     id: 2921983,
//     kids: [2922097, 2922429, 2924562, 2922709, 2922573, 2922140, 2922141],
//     parent: 2921506,
//     text: "Aw shucks, guys ... you make me blush with your compliments.<p>Tell you what, Ill make a deal: I'll keep writing if you keep reading. K?",
//     time: 1314211127,
//     type: "comment",
//   },
// };

const Comments = ({ itemId, kids }) => {
  const dispatch = useDispatch();

  const [id, setId] = useState("");
  const [itemKids, setItemKids] = useState(null);
  const commentSelector = useSelector((state) => state.itemComment);
  const { loading, comments, error } = commentSelector;

  useEffect(() => {
    if (!comments || id !== itemId || itemKids !== kids) {
      dispatch(getComments(itemId));
      setId(itemId);
      setItemKids(kids);
    }
  }, [comments, dispatch, itemId, kids, id, itemKids]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        // comments &&
        // kids && (
        //   <ListGroup>
        //     {kids.map((kid) => {
        //       comments[kid] && <Comment comment={comments[kid]} />;
        //     })}
        //   </ListGroup>
        // )
        comments &&
        kids && (
          <ListGroup as='ol' numbered={true}>
            {Object.values(comments).map(
              (comment) =>
                comment &&
                kids.includes(comment.id) && (
                  <Comment comment={comment} comments={comments} />
                )
            )}
          </ListGroup>
        )
      )}
    </>
  );
};

export default Comments;
