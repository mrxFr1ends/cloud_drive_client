import { useActions } from '../hooks/useActions';
import { LoginPayload } from '../types/auth';
import Form from './AuthForm';

const loginInputs = [
  {
    placeholder: "Имя пользователя или почта",
    type: "text",
    name: "login",
  },
  {
    placeholder: "Пароль",
    type: "password",
    name: "password",
  }
];

const LoginForm = () => {
  const { login } = useActions();
  const defaultState: LoginPayload = {
    login: "normalUsername",
    password: "Password123!"
  };

  return (
    <Form<LoginPayload>
      inputsConfig={loginInputs}
      submitBtnText="Войти"
      defaultState={defaultState}
      onSubmit={login}
    />
  );
}

export default LoginForm;