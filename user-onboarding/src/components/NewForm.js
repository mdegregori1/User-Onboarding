import React, {useState, useEffect} from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";


const NewForm = ({values, errors, touched, status}) => {
    const [people,setPeople] = useState([]);
    useEffect(() => {
        if (status){
            setPeople([...people, status]);
        }
    },[status]);

    return(

    <div>
        <Form>
            <Field type= "text" name="name" placeholder="name"/>
            {touched.name && errors.name && (
                <p>{errors.name}</p>
            )}
            <Field type="text" name="email" placeholder="email"/>
            {touched.email && errors.email && (
                <p>{errors.email}</p>
            )}
            <Field type="password" name="password" placeholder="password"/>
            {touched.password && errors.password && (
                <p>{errors.password}</p>
            )}
            <label>
                <Field type ="checkbox" name="termsOfService" checked={values.termsOfService}/>
            </label>
            <button>Submit</button>
        </Form>
        {people.map(e => (
        <ul key={e.id}>
          <li>Name:{e.name}</li>
          <li>Email: {e.email}</li>
          <li>Password: private info! </li>
        </ul>
      ))}
    </div>
    );
};
const FormikNewForm = withFormik({
    mapPropsToValues({name,email,password,termsOfService}){
        return {
            name: name || "",
            email: email ||"",
            password: password || "",
            termsOfService: termsOfService || false
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required("You must enter your name before contuining"),
        email: Yup.string().required("Email must be entered"),
        password: Yup.string().required("Password must be entered"),
        termsOfService: Yup.string(true).required('')
    }),
    handleSubmit(values, { setStatus }){
    axios
    .post("https://reqres.in/api/users/", values)
    .then(e => {
        setStatus(e.data);
        console.log(e.data)
    })
    .catch(err => console.log(err.e));


}

})(NewForm);

export default FormikNewForm;







