import {useFormik} from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    file: Yup
        .mixed()
        .required("You need to provide a file")
        .test("fileSize", "The file is too large", (value) => {
            return value && value[0].length <= 2000000;
        })
        .test("type", "Only the following formats are accepted: .jpeg, .jpg, .bmp, .png", (value) => {
            return value && (
                value[0].type === "image/jpeg" ||
                value[0].type === "image/jpg" ||
                value[0].type === "image/bmp" ||
                value[0].type === "image/png"
            );
        }),
});

const formik = useFormik({
    initialValues: {},
    validationSchema,
    validateOnMount: true,
    onSubmit: (values => {
        formik.resetForm();
    }),
});

return (
    <form className="form-input" onSubmit={formik.handleSubmit}>
        {/*<div className="form-row">*/}
        <input
            type="file"
            id="customFile"
            name="customFile"
            value={formik.values.customFile}
            onChange={formik.handleChange}
        />
        {formik.errors.customFile && formik.touched.customFile && (
            <span className="form-comment-textarea-error">{formik.errors.customFile}</span>
        )}
        {/*</div>*/}
        <button type="submit">Post Comment</button>
    </form>
);


// export default function FormInputFile() {
//     const [file, setFile] = useState("");
//     const [fileName, setFileName] = useState("Choose File");
//     const [uploadedFile, setUploadedFile] = useState({});
//
//     const onChange = e => {
//         setFile(e.target.files[0]);
//         setFileName(e.target.files[0].name);
//     };
//
//     const onSubmit = async e => {
//         e.preventDefault();
//
//         const formData = new FormData();
//         formData.append("file", file);
//         formData.append('upload_preset', 'll7qfuac');
//
//         try {
//             const API_ENDPOINT = 'https://api.cloudinary.com/v1_1/mark79/upload';
//             fetch(API_ENDPOINT, {
//                 method: 'POST',
//                 body: formData
//             }).then(response => response.json())
//                 .then(data => {
//                     console.log('Success:', data)
//                     setUploadedFile(data.url);
//                 })
//                 .catch(err => console.error('Error:', err));
//
//         } catch (err) {
//             console.log(err.message);
//         }
//     };
//     return (
//         <div className="main-container">
//             <form onSubmit={onSubmit}>
//                 <label htmlFor="customFile">
//                     {fileName}
//                     <input type="file" id="customFile" onChange={onChange}/>
//                     {
//                         uploadedFile
//                             ? <img className="uploaded-img" src={uploadedFile} alt=""/>
//                             : null
//                     }
//                 </label>
//                 <input type="submit" value="Upload"/>
//             </form>
//         </div>
//     );
// }

