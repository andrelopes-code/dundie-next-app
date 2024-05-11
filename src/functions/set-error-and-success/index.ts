const setErrorWithTimeout = (
    errorMessage: string,
    setError: any,
    delay = 2000
) => {
    setError(errorMessage);
    setTimeout(() => {
        setError("");
    }, delay);
};

const setSuccessWithTimeout = (
    successMessage: string,
    setSuccess: any,
    delay = 2000
) => {
    setSuccess(successMessage);
    setTimeout(() => {
        setSuccess("");
    }, delay);
};

export { setErrorWithTimeout, setSuccessWithTimeout };
