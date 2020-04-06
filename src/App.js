import React from "react";
import Header from "./components/common/Header";
import Wrapper from "./components/common/Wrapper";
import { Route } from "react-router-dom";
import PostListPage from "./pages/PostListPage";
import PostPage from "./pages/PostPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import WritePage from "./pages/WritePage";

function App() {
  return (
    <>
      <Header />
      <Wrapper>
        <Route path={["/", "/post"]} exact component={PostListPage} />
        <Route path="/post/:postId" exact component={PostPage} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/register" exact component={RegisterPage} />
        <Route path="/write" exact component={WritePage} />
      </Wrapper>
    </>
  );
}

export default App;
