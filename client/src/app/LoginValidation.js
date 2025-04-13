function loginValidation(values) {
    let error = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/; // At least 8 characters, 1 digit, 1 lowercase, 1 uppercase

    if (values.email === "") {
        error.email = "Email is required";
    } else if (!emailRegex.test(values.email)) {
        error.email = "Invalid email format";
    } else {
        error.email = "";
    }

    if (values.password === "") {
        error.password = "Password is required";
    } else if (!passwordRegex.test(values.password)) {
        error.password = "Password must be at least 8 characters long, contain at least one digit, one lowercase letter, and one uppercase letter";
    } else {
        error.password = "";
    }

    return error;
}

export default loginValidation;