import {useFormik} from 'formik';
import * as Yup from 'yup';

import {globalConstants, notificationMsg} from '../../utils/globals';

const validationSchema = Yup.object({
    title: Yup.string().trim()
        .min(globalConstants.TITLE_MIN_LENGTH, notificationMsg.titleMinLength)
        .required(notificationMsg.requiredField),
    content: Yup.string().trim()
        .min(globalConstants.CONTENT_MIN_LENGTH, notificationMsg.contentMinLength)
        .required(notificationMsg.requiredField),
    urlToImage: Yup.string().trim()
        .matches(globalConstants.URL_TO_IMAGE, notificationMsg.urlToImageValidate)
        .required(notificationMsg.requiredField),
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
                    <span className="form-post-textarea-error">{formik.errors.content}</span>
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