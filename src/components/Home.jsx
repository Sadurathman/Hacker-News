import React, { useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { home } from "../actions/itemActions";
import Story from "./Story";
import Loader from "./Loader";
import Message from "./Message";

// const items = [
//   {
//     user: "dhouston",
//     descendants: 71,
//     id: 8863,
//     kids: [
//       8952, 9224, 8917, 8884, 8887, 8943, 8869, 8958, 9005, 9671, 8940, 9067,
//       8908, 9055, 8865, 8881, 8872, 8873, 8955, 10403, 8903, 8928, 9125, 8998,
//       8901, 8902, 8907, 8894, 8878, 8870, 8980, 8934, 8876,
//     ],
//     score: 111,
//     time: 1175714200,
//     title: "My YC app: Dropbox - Throw away your USB drive",
//     type: "story",
//     url: "http://www.getdropbox.com/u/2/screencast.html",
//   },
// ];

const Home = ({ match }) => {
  const dispatch = useDispatch();

  const homeSelector = useSelector((state) => state.home);
  const { loading, items, error } = homeSelector;

  useEffect(() => {
    if (!items) {
      dispatch(home(match.params.type));
    }
  }, [items, dispatch]);

  return (
    <>
      {loading && <Loader />}
      {error && <Message>{error}</Message>}
      <ListGroup>
        {items &&
          items.map(
            (item) =>
              !item.dead && (
                <ListGroup.Item
                  key={item.id}
                  action
                  href={item.url ? item.url : `/item/${item.id}`}
                >
                  <Story item={item} />
                </ListGroup.Item>
              )
          )}
      </ListGroup>
    </>
  );
};

export default Home;
