import {useFormik} from 'formik';
import * as Yup from 'yup';

const FormInputFile = () => {

    const validationSchema = Yup.object().shape({
        file: Yup.mixed()
            .required("You need to provide a file")
            .test("size", "The file is too large", (value) => {
                return value && value.size <= 2 * 1024 * 1024;
            })
            .test("type", "Only the following formats are accepted: .jpeg, .jpg, .bmp, .png", (value) => {
                return value && (
                    value.type === "image/jpeg" ||
                    value.type === "image/jpg" ||
                    value.type === "image/bmp" ||
                    value.type === "image/png"
                );
            }),
    });
    const formik = useFormik({
        initialValues: {file: null},
        validationSchema,
        validateOnChange: true,
        onSubmit: (values) => {

            const formData = new FormData();
            formData.append("file", values.file);
            formData.append('upload_preset', 'll7qfuac');

            try {
                const API_ENDPOINT = 'https://api.cloudinary.com/v1_1/mark79/upload';
                fetch(API_ENDPOINT, {
                    method: 'POST',
                    body: formData
                }).then(response => response.json())
                    .then(data => {
                        console.log('Success:', data)
                        console.log(data.url);
                    })
                    .catch(err => console.error('Error:', err));

            } catch (err) {
                console.log(err.message);
            }
        },

    });

    return (
        <form className="form-input" onSubmit={formik.handleSubmit}>
            <label htmlFor="file" style={{color:"white"}}>Прикачи файл</label>
            <input
                type="file"
                name="file"
                id="file"
                style={{color:"white"}}
                onChange={(event) => {
                    formik.setFieldValue("file", event.target.files[0]);
                }}
            />
            {formik.errors.file && formik.touched.file && (
                <span className="form-comment-textarea-error">{formik.errors.file}</span>
            )}
            <button type="submit">Post Image</button>
        </form>
    );

}

export default FormInputFile;


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

