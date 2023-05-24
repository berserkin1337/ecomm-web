import { useState } from "react";
import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import "./sign-in-form.styles.scss";
import Button from "../button/button.component";

const defaultFormFields = {
  email: "",
  password: "",
};

const signInWithGooogle = async () => {
  try {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  } catch (error) {
    console.log(JSON.stringify(error));
  }
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response  =  await signInAuthUserWithEmailAndPassword(email, password);
      console.log(response);
      setFormFields(defaultFormFields);
    } catch (error) {
      switch (error.code) {
        case (error.code === "auth/wrong-password"):
          alert("Wrong password for email");
          break;
        case (error.code === "auth/user-not-found"):
          alert("User not found");
          break;
        default:
          console.log(error);

      }
    }
  };

  return (
    <div className={"sign-up-container"}>
      <h2>Already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
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
        <div className={"buttons-container"}>
          <Button buttonType={"inverted"} type={"submit"}>
            Sign In
          </Button>
          <Button type={"button"} buttonType={"google"} onClick={signInWithGooogle}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;