import {useFormik} from 'formik';
import * as Yup from 'yup';

import styles from './FormComment.module.css';

import {globalConstants, notificationMsg} from '../../utils/globals';
import PropTypes from "prop-types";

const initialValues = {
    comment: '',
}

const validationSchema = Yup.object({
    comment: Yup.string().trim()
        .min(globalConstants.COMMENT_MIN_LENGTH, notificationMsg.commentMinLength)
        .required(notificationMsg.requiredField),
})

const FormComment = ({onNewComment}) => {

    const formik = useFormik({
        initialValues,
        validationSchema,
        validateOnMount: true,
        onSubmit: (values => {
            onNewComment({comment: values.comment})
            formik.resetForm();
        }),
    });

    return (
        <form className={styles.form} onSubmit={formik.handleSubmit}>
            {/*<div className="form-row">*/}
            <textarea
                name="comment"
                // id="comment"
                className={styles.textarea}
                placeholder="Leave your comment..."
                value={formik.values.comment}
                onChange={formik.handleChange}
            />
            {formik.errors.comment && formik.touched.comment && (
                <span className={styles.error}>{formik.errors.comment}</span>
            )}
            {/*</div>*/}
            <button type="submit" className={styles.button}>Post Comment</button>
        </form>
    );
}

FormComment.propTypes = {
    onNewComment: PropTypes.func.isRequired,
}

export default FormComment;
