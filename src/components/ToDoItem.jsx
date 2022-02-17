import moment from "moment";
import React from "react";

const convertToDateTimeLocal = (datetime) => {
  const date = new Date(datetime);
  return `${date.getFullYear()}-${
    (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)
  }-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}T${
    date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
  }:${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}`;
};
const ToDoItem = ({ item, index, onEdit, onDelete, onComplete }) => {
  return (
    <tr>
      <td>{index}</td>
      <td>{item.name}</td>
      <td>{moment(convertToDateTimeLocal(item.date)).format("yyyy-MM-DD HH:mm")}</td>
      <td>
        <button
          style={{
            backgroundColor: `${
              item.isCompleted ? "var(--success-color)" : "black"
            }`,
            padding: "3px 8px",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "12px",
            color: "white",
            border: "none",
          }}
          onClick={() => onComplete(item)}
        >
          {item.isCompleted ? "Hoàn thành" : "Chưa hoàn thành"}
        </button>
      </td>
      <td
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <button
          style={{
            border: "none",
            textAlign: "center",
            backgroundColor: "var(--info-color)",
            padding: "4px 12px",
            color: "white",
            fontSize: "12px",
            margin: "0 2px",
            cursor: "pointer",
          }}
          onClick={() => onEdit(item)}
        >
          Sửa
        </button>
        <button
          style={{
            border: "none",
            textAlign: "center",
            backgroundColor: "var(--error-color)",
            padding: "4px 12px",
            color: "white",
            fontSize: "12px",
            margin: "0 2px",
            cursor: "pointer",
          }}
          className="delete-btn"
          onClick={() => onDelete(item._id)}
        >
          Xoá
        </button>
      </td>
    </tr>
  );
};

export default ToDoItem;
