import { emailRegEx, passwordRegEX } from "../constants/regularExpression";
import {
    LoginFormData,
    LoginFormError,
    RegistrationFormData,
    RegistrationFormError,
    StoryForm,
    StoryFormError,
} from "../types/types";

export const validateUserRegistrationForm = (values: RegistrationFormData) => {
    const errors = {} as RegistrationFormError;
    if (!values.email) {
        errors.emailError = "Email is required!";
    } else if (!emailRegEx.test(values.email.toLowerCase())) {
        errors.emailError = "Enter a valid email!";
    }

    if (!values.name) {
        errors.nameError = "Name is required!";
    } else if (values.name.length < 3 || values.name.length > 100) {
        errors.nameError = "Name must be between 3-100 chars!";
    }
    if (!values.about) {
        errors.aboutError = "About is required!";
    } else if (values.about.length < 4 || values.about.length > 500) {
        errors.aboutError = "About must be between 4 to 500 chars";
    }
    if (!values.password) {
        errors.passwordError = "Password is required!";
    } else if (!passwordRegEX.test(values.password)) {
        errors.passwordError =
            "Password should be 4-10 chars, with at least 1  special char, 1 letter and a number!";
    }
    if (!values.confirmPassword) {
        errors.confirmPasswordError = "Confirm password is required!";
    } else if (
        values.confirmPassword &&
        values.confirmPassword !== values.password
    ) {
        errors.confirmPasswordError = "Password doesn't matched!";
    }
    return errors;
};

export const validateUserLoginForm = (values: LoginFormData) => {
    const errors = {} as LoginFormError;
    if (!values.email) {
        errors.emailError = "Email is required!";
    } else if (!emailRegEx.test(values.email.toLowerCase())) {
        errors.emailError = "Enter a valid email!";
    }
    if (!values.password) {
        errors.passwordError = "Password is required!";
    }

    return errors;
};
export const validateStoryUploadForm = (values: StoryForm) => {
    const errors = {} as StoryFormError;
    if (!values.title) {
        errors.titleError = "Title is required!";
    } else if (values.title.length < 5 || values.title.length > 150) {
        errors.titleError =
            "Title size must be min 5 chars and max is 150 chars";
    }
    if (!values.content) {
        errors.contentError = "Description is required!";
    } else if (values.content.length < 5 || values.content.length > 10000) {
        errors.contentError =
            "Content size must be min 5 chars and max is 10000 chars";
    }

    return errors;
};
