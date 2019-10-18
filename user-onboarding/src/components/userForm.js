import React, { useState,useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";


const UserForm = ({values, errors, touched,status}) => {
    const [users, setUsers] = useState([]);
    useEffect(()=>{
        if (status) {
            setUsers([...users, status]);
        }
    }, [status])

    return (
        <div>
            <Form>
                <Field
                type="text"
                name="name"
                placeholder="Name"
                />
                {touched.name&&errors.name&&(<p>{errors.name}</p>)}
                 <Field
                type="text"
                name="email"
                placeholder="Email"
                />
                {touched.email&&errors.email&&(<p>{errors.email}</p>)}
                 <Field
                type="password"
                name="password"
                placeholder="Password"
                />
                 {touched.password&&errors.password&&(<p>{errors.password}</p>)}
                <label>
                    Terms of Service
                <Field 
                type="checkbox" 
                name="tos" checked={values.tos} 
                />
                </label>
                <button type="submit">Submit</button>
            </Form>
            {users.map(event => (
                <ul key={event.id}>
                    <li>Name: {event.name}</li>
                    <li>Email: {event.email}</li>
                    <li>Password: {event.password}</li>
                </ul>
            ))}
        </div>
    )
}
const FormikForm = withFormik({
    mapPropsToValues({name,email,password,tos}){
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            tos: tos || false
        }
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required("Please enter your name"),
        email: Yup.string().required("Please enter your email"),
        password: Yup.string().required("Please enter your password"),
    }),
    handleSubmit(values, {setStatus}){
        axios.post("https://reqres.in/api/users", values)
        .then(response => {
            setStatus(response.data)
            console.log("post test",response.data)
        })
        .catch(error=>console.log(error.response));
    }
    
})(UserForm) 


export default FormikForm;

