import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { apiSignUp } from "../api/apiAuth";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values) => {
      apiSignUp(values, navigate);
    },
    validationSchema: Yup.object().shape({
      username: Yup.string()
        .required("Trường này không được bỏ trống")
        .min(6, "Tối thiẻu phải 6 kí tự")
        .max(20, "Tối đa 20 kí tự"),
      password: Yup.string()
        .required("Trường này không được bỏ trống")
        .min(6, "Tối thiẻu phải 6 kí tự")
        .max(20, "Tối đa 20 kí tự"),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Retyping password is incorrect"
      ),
    }),
  });
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: "400px",
          margin: "0 auto",
          backgroundColor: "var(--main-color)",
          padding: "20px",
          transform: "translateY(calc(50vh - 50%))",
        }}
      >
        <h1
          style={{
            textAlign: "center",
          }}
        >
          ĐĂNG KÝ
        </h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-sign-up-group">
            <label htmlFor="username">Tên đăng nhập</label>
            <input
              style={{
                padding: "4px 1px",
              }}
              type="text"
              name="username"
              id="username"
              value={formik.values.username}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <p
              style={{
                color: "var(--error-color)",
                margin: 0,
                fontSize: "12px",
              }}
            >
              {formik.touched.username && formik.errors.username}
            </p>
          </div>
          <div className="form-sign-up-group">
            <label htmlFor="password">Mật khẩu</label>
            <input
              style={{
                padding: "4px 1px",
              }}
              type="password"
              name="password"
              id="password"
              value={formik.values.password}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <p
              style={{
                color: "var(--error-color)",
                margin: 0,
                fontSize: "12px",
              }}
            >
              {formik.touched.password && formik.errors.password}
            </p>
          </div>
          <div className="form-sign-up-group">
            <label htmlFor="confirmPassword">Nhập lại mật khẩu</label>
            <input
              style={{
                padding: "4px 1px",
              }}
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={formik.values.confirmPassword}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <p
              style={{
                color: "var(--error-color)",
                margin: 0,
                fontSize: "12px",
              }}
            >
              {formik.touched.confirmPassword && formik.errors.confirmPassword}
            </p>
          </div>
          <div className="form-sign-up-group" style={{ textAlign: "center" }}>
            <button
              type="submit"
              style={{
                border: "none",
                color: "var(--main-color)",
                backgroundColor: "white",
                padding: "10px 20px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Đăng ký
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
