import * as Yup from "yup";
import {useFormik} from "formik";

const validationSchema = Yup.object({
    title: Yup.string().trim()
        .min(5, "Title must be at least 5 characters long")
        .required("Required field!"),
    content: Yup.string().trim()
        .min(20, "Content must be at least 20 characters long")
        .required("Required field!"),
    urlToImage: Yup.string().trim()
        .matches(/^(http[s]?:\/\/.*.(?:png|jpg|gif|svg|jpeg))$/i, "Provide valid url with image")
        .required("Required field!"),
})

const FormPost = ({data, onSubmitFormHandler}) => {

    const initialValues = {
        title: data.title,
        content: data.content,
        urlToImage: data.urlToImage,
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        validateOnMount: true,
        onSubmit: onSubmitFormHandler,
    });

    return (
        <form className="form" onSubmit={formik.handleSubmit}>
            <div className="form-row">
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                />
                {formik.errors.title && formik.touched.title && (
                    <span className="form-input-error">{formik.errors.title}</span>
                )}
            </div>
            <div className="form-row">
                <textarea
                    name="content"
                    placeholder="Content"
                    value={formik.values.content}
                    onChange={formik.handleChange}
                />
                {formik.errors.content && formik.touched.content && (
                    <span className="form-textarea-error">{formik.errors.content}</span>
                )}
            </div>
            <div className="form-row">
                <input
                    type="text"
                    name="urlToImage"
                    placeholder="Image URL"
                    value={formik.values.urlToImage}
                    onChange={formik.handleChange}
                />
                {formik.errors.urlToImage && formik.touched.urlToImage && (
                    <span className="form-input-error">{formik.errors.urlToImage}</span>
                )}
            </div>
            {/*disabled={!(formik.dirty && formik.isValid)}*/}
            <button type="submit">Save</button>
        </form>
    );
}

export default FormPost;