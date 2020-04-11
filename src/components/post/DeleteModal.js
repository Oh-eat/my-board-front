import React from "react";
import Modal from "../common/Modal";
import Button from "../common/Button";
import InputWithIcon from "../common/InputWithIcon";
import { IoMdLock } from "react-icons/io";

function DeleteModal({
  user,
  post,
  permission,
  error,
  onRemoveExecute,
  onCheck,
  onCancel,
  postPassword,
  onChangePassword,
}) {
  const errorMessage = !error
    ? null
    : error === 400
    ? "조건에 맞게 입력해 주세요."
    : permission
    ? "포스트를 삭제할 권한이 없습니다."
    : "비밀번호가 올바르지 않습니다.";

  const showExecute =
    permission ||
    (post.author._id && user) ||
    (user && user.membership === "admin");

  const showCheck =
    !permission &&
    !post.author._id &&
    (!user || (user && user.membership !== "admin"));

  return (
    <Modal title="포스트 삭제">
      {showExecute && (
        <div>
          <p>정말 삭제하시겠습니까?</p>
          {errorMessage && (
            <div className="error" style={{ color: "red", fontSize: "0.9rem" }}>
              {errorMessage}
            </div>
          )}
          <div className="buttons">
            <Button fluid onClick={onCancel}>
              취소
            </Button>
            <Button color="red" fluid onClick={onRemoveExecute}>
              삭제
            </Button>
          </div>
        </div>
      )}
      {showCheck && (
        <div>
          <p>포스트 비밀번호를 입력해 주세요.</p>
          <InputWithIcon
            icon={<IoMdLock size="1.5rem" />}
            name="password"
            value={postPassword}
            type="password"
            placeholder="포스트 비밀번호"
            maxLength={15}
            onChange={onChangePassword}
            alnumOnly
          />
          {errorMessage && (
            <div className="error" style={{ color: "red", fontSize: "0.9rem" }}>
              {errorMessage}
            </div>
          )}
          <div className="buttons">
            <Button fluid onClick={onCancel}>
              취소
            </Button>
            <Button fluid onClick={onCheck}>
              계속
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}

export default DeleteModal;
