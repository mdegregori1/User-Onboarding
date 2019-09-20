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

    <div className = "container">
        <Form>
            <div className = "maincontainer">
                <Field className = "container1" type= "text" name="name" placeholder="name"/>
                {touched.name && errors.name && (
                    <p>{errors.name}</p>
                )}
                <Field className="container2" type="text" name="email" placeholder="email"/>
                {touched.email && errors.email && (
                    <p>{errors.email}</p>
                )}
                <Field className="container3" type="password" name="password" placeholder="password"/>
                {touched.password && errors.password && (
                    <p>{errors.password}</p>
                )}
            </div>
            <div className="terms">
            <p>Terms and Conditions</p>
                <label>
                    <Field type ="checkbox" name="termsOfService" checked={values.termsOfService}/>
                </label>
            </div>
            <button>Submit</button>
        </Form>
        {people.map(e => (
        <ul className = "list"key={e.id}>
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
        termsOfService: Yup
        .boolean()
        .oneOf([true],'You must agree to the terms of service!')
       
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
console.log(FormikNewForm)
export default FormikNewForm;







