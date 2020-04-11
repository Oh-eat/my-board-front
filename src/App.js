import React from "react";
import Header from "./components/common/Header";
import Wrapper from "./components/common/Wrapper";
import { Route } from "react-router-dom";
import PostListPage from "./pages/PostListPage";
import PostPage from "./pages/PostPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import WritePage from "./pages/WritePage";
import Modals from "./components/common/Modals";

function App() {
  return (
    <>
      <Modals />
      <Header />
      <Wrapper>
        <Route path={["/", "/post"]} exact component={PostListPage} />
        <Route path="/post/read/:postId" exact component={PostPage} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/register" exact component={RegisterPage} />
        <Route path="/post/write" exact component={WritePage} />
      </Wrapper>
    </>
  );
}

export default App;
