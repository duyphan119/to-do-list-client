import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import ToDoList from "../components/ToDoList";
import ModalToDoForm from "../components/ModalToDoForm";
import { apiSignOut } from "../api/apiAuth";
import {
  apiCreate,
  apiDelete,
  apiGetAllToDoByUserId,
  apiUpdate,
} from "../api/apiToDo";
import ConfirmMessage from "../components/ConfirmMessage";

const Home = () => {
  const user = useSelector((state) => state.auth.currentUser);
  const list = useSelector((state) => state.toDo.list);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [date, setDate] = useState(
    moment(new Date().getTime()).format("yyyy-MM-DD")
  );
  const [form, setForm] = useState({
    isOpen: false,
    isEditing: true,
  });
  const [filter, setFilter] = useState({
    name: "date",
    sortBy: "asc",
  });
  const [confirmMessage, setConfirmMessage] = useState({
    isOpen: false,
    onAnswerYes: () => {},
  });
  const handleAdd = async (item) => {
    //add
    await apiCreate(user, item, dispatch);
    await apiGetAllToDoByUserId(user, date, filter, dispatch);
  };
  const handleEdit = (item) => {
    setForm((prev) => {
      return {
        ...prev,
        isOpen: true,
        isEditing: true,
        item: item,
        onSubmit: async (i) => {
          await apiUpdate(user, { ...item, ...i }, dispatch);
          await apiGetAllToDoByUserId(user, date, filter, dispatch);
        },
      };
    });
    //mở form edit
  };
  const handleDelete = (id) => {
    setConfirmMessage((prev) => {
      return {
        ...prev,
        isOpen: true,
        onAnswerYes: async () => {
          await apiDelete(user, id, dispatch);
          await apiGetAllToDoByUserId(user, date, filter, dispatch);
        },
      };
    });
    //Xoá công việc theo id
  };
  const handleComplete = async (item) => {
    await apiUpdate(
      user,
      { ...item, isCompleted: !item.isCompleted },
      dispatch
    );
    await apiGetAllToDoByUserId(user, date, filter, dispatch);
    //Cập nhật trạng thái công việc
  };
  const handleSignOut = () => {
    apiSignOut(dispatch, navigate);
  };

  useEffect(() => {
    //Call api
    console.log("call api home page");
    apiGetAllToDoByUserId(user, date, filter, dispatch);
  }, [date, filter, user, dispatch]);

  if (!user) {
    return <Navigate to="/sign-in" />;
  } else {
    return (
      <div
        style={{
          margin: "0 auto",
          width: "1200px",
        }}
      >
        <h1 style={{ textAlign: "center" }}>TO DO LIST</h1>
        <div>
          {user ? (
            <button
              style={{
                border: "none",
                backgroundColor: "var(--error-color)",
                padding: "4px 12px",
                color: "white",
                cursor: "pointer",
              }}
              onClick={handleSignOut}
            >
              Đăng Xuất
            </button>
          ) : (
            <div
              style={{
                margin: "10px 0",
              }}
            >
              <Link
                style={{
                  border: "none",
                  padding: "4px 0px",
                  cursor: "pointer",
                }}
                to="/sign-up"
              >
                Đăng ký
              </Link>
              <Link
                style={{
                  border: "none",
                  backgroundColor: "var(--main-color)",
                  padding: "4px 12px",
                  color: "white",
                  margin: "0 4px",
                  cursor: "pointer",
                }}
                to="/sign-in"
              >
                Đăng nhập
              </Link>
            </div>
          )}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <label htmlFor="dateFilter">Thời gian</label>
            <input
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
              id="dateFilter"
              style={{ margin: "0 20px" }}
            />
          </div>
          <div>
            <button
              style={{
                border: "none",
                padding: "10px 20px",
                backgroundColor: "var(--main-color)",
                cursor: "pointer",
              }}
              onClick={() =>
                setForm((prev) => {
                  return {
                    ...prev,
                    isOpen: true,
                    isEditing: false,
                    onSubmit: (i) => handleAdd(i),
                  };
                })
              }
            >
              Thêm công việc
            </button>
          </div>
          <div>
            <label>Sắp xếp theo</label>
            <select
              style={{ margin: "0 20px" }}
              value={filter.name}
              onChange={(e) =>
                setFilter((prev) => {
                  return {
                    ...prev,
                    name: e.target.value,
                  };
                })
              }
            >
              <option value="name">Tên công việc</option>
              <option value="date">Thời gian</option>
              <option value="isCompleted">Trạng thái</option>
            </select>
            <select
              value={filter.sortBy}
              onChange={(e) =>
                setFilter((prev) => {
                  return {
                    ...prev,
                    sortBy: e.target.value,
                  };
                })
              }
            >
              <option value="asc">A - Z</option>
              <option value="desc">Z - A</option>
            </select>
          </div>
        </div>
        <ToDoList
          list={list}
          onComplete={(i) => handleComplete(i)}
          onEdit={(i) => handleEdit(i)}
          onDelete={(i) => handleDelete(i)}
        />
        {form.isOpen && <ModalToDoForm form={form} setForm={setForm} />}
        {confirmMessage.isOpen && (
          <ConfirmMessage
            confirmMessage={confirmMessage}
            setConfirmMessage={setConfirmMessage}
          />
        )}
      </div>
    );
  }
};

export default Home;
