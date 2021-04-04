import {useFormik} from 'formik';
import * as Yup from 'yup';

import {globalConstants, notificationMsg} from "../../utils/globals";

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
            console.log('values', values);
            onNewComment({comment: values.comment})
            formik.resetForm();
        }),
    });

    return (
        <form className="form-comment" onSubmit={formik.handleSubmit}>
            {/*<div className="form-row">*/}
            <textarea
                name="comment"
                id="comment"
                placeholder="Leave your comment..."
                value={formik.values.comment}
                onChange={formik.handleChange}
            />
            {formik.errors.comment && formik.touched.comment && (
                <span className="form-comment-textarea-error">{formik.errors.comment}</span>
            )}
            {/*</div>*/}
            <button type="submit">Post Comment</button>
        </form>
    );
}

export default FormComment;
