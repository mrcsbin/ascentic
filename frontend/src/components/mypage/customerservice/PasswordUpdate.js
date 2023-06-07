import { useDispatch } from "react-redux";
import { setActiveTab } from "../../../store/modules/mypage";
import styled from "styled-components";
import { getCookie } from "../../../utils/Cookies";
import { useEffect, useState } from "react";
import { updateMember } from "../../../api/MemberApi";
import classNames from "classnames";

export const PasswordUpdate = () => {
  const dispatch = useDispatch();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPasswordValid, setNewPasswordValid] = useState("");
  const [confirmPasswordValid, setConfirmPasswordValid] = useState("");
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

  useEffect(() => {
    const fetchMemberInfo = async () => {
      const accessToken = getCookie("accessToken");
      await dispatch(setActiveTab("비밀번호변경"));
    };
    fetchMemberInfo();
  }, []);

  useEffect(() => {
    const validateNewPassword = () => {
      if (newPassword === "") return;
      const passwordRegex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!?@#$%^&*]{8,}$/;
      setNewPasswordValid(passwordRegex.test(newPassword));
    };

    validateNewPassword();
  }, [newPassword]);

  useEffect(() => {
    if (confirmPassword === "") return;
    setConfirmPasswordValid(newPassword === confirmPassword);
  }, [newPassword, confirmPassword]);

  useEffect(() => {
    const isValid =
      currentPassword &&
      newPassword === confirmPassword &&
      currentPassword !== "" &&
      newPassword !== "" &&
      confirmPassword !== "" &&
      newPasswordValid &&
      confirmPasswordValid;
    setIsSubmitEnabled(isValid);
    console.log(isSubmitEnabled);
  }, [
    currentPassword,
    newPassword,
    confirmPassword,
    newPasswordValid,
    confirmPasswordValid,
    isSubmitEnabled,
  ]);

  const submitHandle = async () => {
    if (currentPassword) {
      if (newPassword === confirmPassword) {
        try {
          const response = await updateMember(
            getCookie("accessToken"),
            currentPassword,
            newPassword
          );

          if (response.data === "success") {
            alert("성공적으로 변경되었습니다!");
            window.location.reload();
          } else if (response === "fail") {
            alert(
              "변경에 실패하였습니다. 입력하신 비밀번호를 다시확인 바랍니다."
            );
            setNewPassword("");
            setCurrentPassword("");
            setConfirmPassword("");
            setNewPasswordValid("");
            setConfirmPasswordValid("");
            setIsSubmitEnabled(false);
          }
        } catch (error) {
          alert("쿠뿌로삥뽕~");
        }
      }
    }
  };

  const newPasswordInputClassName = classNames({
    "": !newPassword,
    "is-valid": newPasswordValid,
    "is-invalid": newPasswordValid === false,
  });

  const confirmPasswordInputClassName = classNames({
    "": !confirmPassword,
    "is-valid": confirmPasswordValid,
    "is-invalid": confirmPasswordValid === false,
  });

  return (
    <Wrap>
      <ContentHeader>비밀번호변경</ContentHeader>
      <PasswordUpdateBox>
        <CurrentPasswordBox>
          <Label>현재 비밀번호</Label>
          <CurrentPasswordInput
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          ></CurrentPasswordInput>
        </CurrentPasswordBox>

        <NewPasswordBox>
          <Label>새 비밀번호</Label>
          <div>
            영문, 숫자, 특수문자를 포함한 8자 이상의 비밀번호를 입력해주세요.
          </div>
          <NewPasswordInput
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={newPasswordInputClassName}
          />
        </NewPasswordBox>
        <NewPasswordConfirmBox>
          <Label>비밀번호 확인</Label>
          <NewPasswordConfirmInput
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={confirmPasswordInputClassName}
          />
        </NewPasswordConfirmBox>
        <ButtonBox>
          <SubmitButton
            className={`submit-button ${
              isSubmitEnabled ? "enabled" : "disabled"
            }`}
            disabled={!isSubmitEnabled}
            onClick={submitHandle}
          >
            비밀번호변경
          </SubmitButton>
        </ButtonBox>
      </PasswordUpdateBox>
    </Wrap>
  );
};

const Wrap = styled.div``;

const ContentHeader = styled.div`
  padding: 0px 0px 20px 0;
  font-size: 1.8rem;
  font-weight: 700;
  border-bottom: 1px solid grey;
`;

const PasswordUpdateBox = styled.div`
  width: 500px;
  padding: 40px;
  color: #292929;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
  margin: 100px auto;
`;

const CurrentPasswordBox = styled.div`
  margin: 20px 0 40px 0;
`;

const NewPasswordBox = styled.div`
  margin: 20px 0;
`;

const NewPasswordConfirmBox = styled.div`
  margin: 20px 0;
`;

const CurrentPasswordInput = styled.input`
  margin-top: 10px;
  width: 100%;
  height: 50px;
  border: none;
  border-bottom: 0.5px solid grey;
  box-sizing: border-box;
  padding: 10px 11px;
  font-size: 1.5rem;
  outline: none;
  :focus {
    border-bottom: 2px solid black;
  }
`;

const NewPasswordInput = styled.input`
  margin-top: 10px;
  width: 100%;
  height: 50px;
  border: none;
  box-sizing: border-box;
  padding: 10px 11px;
  font-size: 1.5rem;
  outline: none;
  border-bottom: 0.5px solid grey;
  :focus {
    border-bottom: 2px solid black;
  }
  &.is-valid {
    border-bottom: 0.5px solid green;
  }

  &.is-invalid {
    border-bottom: 0.5px solid red;
  }

  }
`;

const NewPasswordConfirmInput = styled.input`
  margin-top: 10px;
  width: 100%;
  height: 50px;
  border: none;
  box-sizing: border-box;
  padding: 10px 11px;
  font-size: 1.5rem;
  outline: none;
  border-bottom: 0.5px solid grey;
  :focus {
    border-bottom: 2px solid black;
  }
  &.is-valid {
    border-bottom: 0.5px solid green;
  }

  &.is-invalid {
    border-bottom: 0.5px solid red;
  }
`;

const Label = styled.div`
  font-size: 1.7rem;
  font-weight: 600;
  margin-bottom: 10px;
`;

const SubmitButton = styled.button`
  color: rgba(0, 0, 0, 0.5);
  font-size: 1.2rem;
  margin-top: 10px;
  border: 1px solid rgba(34, 34, 34, 0.5);
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;

  &.enabled {
    color: black;
    border: 1px solid black;
  }

  &.disabled {
    color: rgba(0, 0, 0, 0.2);
    border: none;
    cursor: not-allowed;
  }
`;

const ButtonBox = styled.div`
  text-align: center;
  margin: 3rem auto 0 auto;
`;
