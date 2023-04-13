import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Auth from "./components/Auth";
// import Note from "./components/Note";
import Note1 from "./components/Note1";
import NoteView from "./components/NoteView";
import { addToken } from "./reducers/authReducers";
import {
  BrowserRouter as Router,
  Routes,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import FindNote from "./components/FindNote";

function App() {
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(addToken());
  }, []);
  {
    /* <div className="App">{token ? <Note1 /> : <Auth />}</div> */
  }

  return (
    <Router>
      <Routes>
        <Route path="/" exact element={token ? <Note1 /> : <Auth />}></Route>
        <Route path="/NoteView" exact element={<NoteView/>}></Route>
        <Route path="/FindNote" exact element={<FindNote/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
