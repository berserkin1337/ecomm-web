import { useState } from "react";
import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from "../../utils/firebase/firebase.utils";
import  FormInput from "../form-input/form-input.component";
import "./sign-up-form.styles.scss";
import Button  from "../button/button.component";
const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });

  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const {user} = await createAuthUserWithEmailAndPassword(email, password);

      const userDocRef = await createUserDocumentFromAuth(user, {displayName});
      setFormFields(defaultFormFields);
    } catch (error) {
      if(error.code === "auth/email-already-in-use") {
        alert("Cannot create user email already in use");
      }
      if(error.code === "auth/weak-password") {
        alert("Password must be at least 6 characters");
      }
      console.log(JSON.stringify(error));
    }


  }

  return (
    <div className={"sign-up-container"}>
      <h2>Don't have an account</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label={"Display Name"}
          type={"text"}
          required={true}
          name={"displayName"}
          value={displayName}
          onChange={handleChange}
        />
        <FormInput
          label={"Email"}
          type={"email"}
          required={true}
          name={"email"}
          value={email}
          onChange={handleChange}
        />
        <FormInput
          label={"Password"}
          type={"password"}
          required={true}
          name={"password"}
          value={password}
          onChange={handleChange}
        />
        <FormInput
          label = "Confirm Password"
          type={"password"}
          required={true}
          name={"confirmPassword"}
          value={confirmPassword}
          onChange={handleChange}
        />
        <Button buttonType={"inverted"} type={"submit"} >Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
