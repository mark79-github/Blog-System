import {useFormik} from 'formik';
import * as Yup from 'yup';

import styles from './FormPost.module.css';

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
        <form className={styles.form} onSubmit={formik.handleSubmit}>
            <div className={styles.row}>
                <input
                    type="text"
                    name="title"
                    className={styles.input}
                    placeholder="Title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                />
                {formik.errors.title && formik.touched.title && (
                    <span className={styles.error}>{formik.errors.title}</span>
                )}
            </div>
            <div className={styles.row}>
                <textarea
                    name="content"
                    className={styles.textarea}
                    placeholder="Content"
                    value={formik.values.content}
                    onChange={formik.handleChange}
                />
                {formik.errors.content && formik.touched.content && (
                    <span className={styles['textarea-error']}>{formik.errors.content}</span>
                )}
            </div>
            <div className={styles.row}>
                <input
                    type="text"
                    name="urlToImage"
                    className={styles.input}
                    placeholder="Image URL"
                    value={formik.values.urlToImage}
                    onChange={formik.handleChange}
                />
                {formik.errors.urlToImage && formik.touched.urlToImage && (
                    <span className={styles.error}>{formik.errors.urlToImage}</span>
                )}
            </div>
            {/*disabled={!(formik.dirty && formik.isValid)}*/}
            <button type="submit" className={styles.button}>Save</button>
        </form>
    );
}

export default FormPost;