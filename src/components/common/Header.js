import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { IoMdKey, IoMdLogOut } from "react-icons/io";
import Button from "./Button";
import styles from "../../lib/styles";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../modules/user";

const HeaderBlock = styled.header`
  width: 100%;
  height: ${styles.header.height};
  background: dodgerblue;
  display: flex;
  color: ${styles.button.transparent.normal};
  box-shadow: 0 0 5px dodgerblue;
`;

const HeaderWrapper = styled.div`
  height: 100%;
  width: 100%;
  margin-left: ${styles.wrapper.marginLeft};
  margin-right: ${styles.wrapper.marginRight};
`;

const HeaderContents = styled.div`
  height: 100%;
  max-width: ${styles.contents.maxWidth};
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left {
    font-size: 1.25rem;
    &:hover {
      color: ${styles.button.transparent.hover};
    }
  }

  .right {
    display: flex;
    align-items: center;

    button {
      margin-left: 0.5rem;
    }
  }
`;

function Header(props) {
  const dispatch = useDispatch();
  const user = useSelector(({ user }) => user.user);
  const onLogout = () => dispatch(logout());

  return (
    <HeaderBlock>
      <HeaderWrapper>
        <HeaderContents>
          <Link to="/" className="left">
            <h1>My Board</h1>
          </Link>
          <div className="right">
            {!user && (
              <Button transparent="true" to="/login">
                <IoMdKey size="2rem" />
              </Button>
            )}
            {user && (
              <>
                <h3>{user.username}</h3>
                <Button transparent onClick={onLogout}>
                  <IoMdLogOut size="2rem" />
                </Button>
              </>
            )}
          </div>
        </HeaderContents>
      </HeaderWrapper>
    </HeaderBlock>
  );
}

export default Header;
