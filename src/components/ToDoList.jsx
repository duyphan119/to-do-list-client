import React from "react";
import ToDoItem from "./ToDoItem";

const ToDoList = ({ list, onEdit, onDelete, onComplete }) => {
  const renderItems = () => {
    return list.map((item, index) => {
      return (
        <ToDoItem
          item={item}
          key={item._id}
          index={index}
          onEdit={onEdit}
          onDelete={onDelete}
          onComplete={onComplete}
        />
      );
    });
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>STT</th>
          <th>Công việc</th>
          <th>Thời gian</th>
          <th>Trạng trái</th>
          <th></th>
        </tr>
      </thead>
      <tbody>{renderItems()}</tbody>
    </table>
  );
};

export default ToDoList;
