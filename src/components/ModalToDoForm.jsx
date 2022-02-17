import { useFormik } from "formik";
import * as Yup from "yup";
const convertToDateTimeLocal = (datetime) => {
  const date = new Date(datetime);
  return `${date.getFullYear()}-${
    date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
  }-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}T${
    date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
  }:${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}`;
};
const ModalToDoForm = ({ form, setForm }) => {
  const formik = useFormik({
    initialValues: {
      name: form.item ? form.item.name : "",
      date: form.item
        ? convertToDateTimeLocal(form.item.date)
        : convertToDateTimeLocal(new Date()),
      userId: form.item ? form.item.userId : "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Trường này trong được để trống"),
      date: Yup.date().min(
        new Date(new Date().setSeconds(0, 0)),
        "Thời gian không được nhỏ hơn hiện tại"
      ),
    }),
    onSubmit: (values) => {
      form.onSubmit(values);
    },
  });
  return (
    <div className="modal">
      <div
        className="overlay"
        onClick={() =>
          setForm({
            ...form,
            isOpen: false,
          })
        }
      ></div>
      <div className="modal-form">
        <h3 style={{ textAlign: "center" }}>
          {form.isEditing ? "CẬP NHẬT CÔNG VIỆC" : "THÊM CÔNG VIỆC"}
        </h3>
        <form onSubmit={formik.handleSubmit}>
          <div className="modal-form-group">
            <label htmlFor="date">Thời gian</label>
            <input
              type="datetime-local"
              name="date"
              id="date"
              value={formik.values.date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="modal-form-group">
            <label htmlFor="name">Công việc</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="modal-form-group" style={{ textAlign: "center" }}>
            <button type="submit">
              {form.isEditing ? "Cập nhật" : "Thêm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalToDoForm;
