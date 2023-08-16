import { useState } from 'react';
import LoginForm from "../../components/LoginForm";
import RegisterForm from "../../components/RegisterForm";
import { useActions } from '../../hooks/useActions';
import "./Auth.css";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { clearError } = useActions();

  const handleSwapForms = (isLogin: boolean) => {
    setIsLogin(isLogin);
    clearError();
  }

  return (
    <div className="auth-form-wrapper">
      <div className="auth-form-container">
        <div className="auth-form-header">
          <div
            className={"sign-in " + (isLogin ? "selected" : "")}
            onClick={_ => handleSwapForms(true)}
          >
            Авторизация
          </div>
          <div
            className={"sign-up " + (!isLogin ? "selected" : "")}
            onClick={_ => handleSwapForms(false)}
          >
            Регистрация
          </div>
        </div>
        {isLogin ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
};

export default Auth;