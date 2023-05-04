export const validateId = (id) => {
  const idRegex = /^[A-Za-z0-9+]{5,15}$/;
  return !id || idRegex.test(id);
}; //id가 5자 이상, 15자 이하의 문자열이며 대소문자/숫자인지

export const validatePassword = (password, confirmPassword) => {
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  const isValidPassword = !password || passwordRegex.test(password);
  const isConfirmedPassword = !confirmPassword || password === confirmPassword;
  return [isValidPassword, isConfirmedPassword];
};
//입력된 비밀번호 값이 8자 이상이며, 영문 대/소문자와 숫자, 그리고 특수문자가 각각 하나 이상 포함되어 있는지,
//그리고 비밀번호와 확인 비밀번호가 일치하는지

export const validateName = (name) => {
  const koreanNameRegex = /^[가-힣]{2,4}$/; // 2~4자의 한글 이름
  return !name || koreanNameRegex.test(name);
};
//입력된 이름 값이 비어있지 않은 문자열이며 2-4글자의 한글이름인지

export const validateEmail = (email) => {
  const emailRegex =
    /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  return !email || emailRegex.test(email);
};
//입력된 이메일 값이 이메일 주소의 형식에 맞는지
export const validatePhone = (phone) => {
  const phoneRegex = /^[0-9]{11}$/; // 11자리 숫자인지 검증
  return !phone || phoneRegex.test(phone);
};

export const validateForm = (formData) => {
  const { id, password, confirmPassword, name, email, phone, infoAgree } =
    formData;

  const idError = !validateId(id);
  const [isValidPassword, isConfirmedPassword] = validatePassword(
    password,
    confirmPassword
  );
  const nameError = !validateName(name);
  const emailError = !validateEmail(email);
  const phoneError = !validatePhone(phone); // 휴대폰 번호 검증 추가
  const isAllValid =
    !idError &&
    !isValidPassword &&
    !isConfirmedPassword &&
    !nameError &&
    !emailError &&
    !phoneError;

  return {
    idError: idError,
    passwordError: isValidPassword ? false : true,
    confirmPasswordError: isConfirmedPassword ? false : true,
    nameError: nameError,
    emailError: emailError,
    phoneError: phoneError, // 휴대폰 번호 에러 추가
    isAllValid: isAllValid,
  };
};
