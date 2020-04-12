import React from "react";
import { IoMdLock } from "react-icons/io";
import Modal from "../common/Modal";
import Button from "../common/Button";
import InputWithIcon from "../common/InputWithIcon";

function DeleteModal({
  type,
  permission,
  error,
  onCancel,
  onCheck,
  onRemoveExecute,
  password,
  onChangePassword,
  showCheck,
  showExecute,
}) {
  const errorMessage = !error
    ? null
    : error === 400
    ? "조건에 맞게 입력해 주세요."
    : permission
    ? "삭제할 권한이 없습니다."
    : "비밀번호가 올바르지 않습니다.";

  return (
    <Modal title={`${type} 삭제`}>
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
          <p>{`${type} 비밀번호를 입력해 주세요.`}</p>
          <InputWithIcon
            icon={<IoMdLock size="1.5rem" />}
            name="password"
            value={password}
            type="password"
            placeholder={`${type} 비밀번호`}
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
