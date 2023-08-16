import { useActions } from '../hooks/useActions';
import { RegisterPayload } from '../types/auth';
import Form from './AuthForm';

const registerInputs = [
  {
    placeholder: "Имя пользователя",
    type: "text",
    name: "username",
  },
  {
    placeholder: "Почта",
    type: "text",
    name: "email",
  },
  {
    placeholder: "Пароль",
    type: "password",
    name: "password",
  },
  {
    placeholder: "Подвтердите пароль",
    type: "password",
    name: "confirmPassword",
  }
];

const RegisterForm = () => {
  const { register, setErrorMessage } = useActions();
  type RegisterFormState = RegisterPayload & { confirmPassword: string };
  const defaultState: RegisterFormState = {
    username: "",
    email: "",
    confirmPassword: "",
    password: ""
  };

  const handleSubmit = (state: RegisterFormState) => {
    if (state.password !== state.confirmPassword)
      setErrorMessage("Passwords do not match");
    else register(state);
  }

  return (
    <Form<RegisterFormState>
      inputsConfig={registerInputs}
      submitBtnText="Зарегистрироваться"
      defaultState={defaultState}
      onSubmit={handleSubmit}
    />
  );
}

export default RegisterForm;