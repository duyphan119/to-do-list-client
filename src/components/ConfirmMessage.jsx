import React from "react";

const ConfirmMessage = ({ confirmMessage, setConfirmMessage }) => {
  return (
    <div className="modal">
      <div
        className="overlay"
        onClick={() =>
          setConfirmMessage((prev) => {
            return {
              ...prev,
              isOpen: false,
            };
          })
        }
      ></div>
      <div className="confirm-message">
        <div className="confirm-message__title">Xác nhận</div>
        <div className="confirm-message__question">
          Bạn có chắc chắn <strong>xoá</strong> ? Bạn{" "}
          <strong>không thể hoàn tác</strong>
        </div>
        <div className="confirm-message__answers">
          <button
            className="confirm-message__answer yes"
            onClick={() => {
              confirmMessage.onAnswerYes();
              setConfirmMessage((prev) => {
                return {
                  ...prev,
                  isOpen: false,
                };
              });
            }}
          >
            Có
          </button>
          <button
            className="confirm-message__answer no"
            onClick={() =>
              setConfirmMessage((prev) => {
                return {
                  ...prev,
                  isOpen: false,
                };
              })
            }
          >
            Không
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmMessage;
