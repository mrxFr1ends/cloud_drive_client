import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useAppSelector } from '../store';

interface IFormProps<T> {
  inputsConfig: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>[],
  submitBtnText: string,
  defaultState: T,
  onSubmit: (state: T) => void
}

const Form = <T extends object>({
  inputsConfig,
  submitBtnText,
  defaultState,
  onSubmit
}: IFormProps<T>) => {
  const error = useAppSelector(state => state.auth.error);
  const [state, setState] = useState<T>(defaultState);

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(state);
  }

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      {inputsConfig.map((config, index) =>
        <React.Fragment key={index}>
          <input
            {...config}
            value={state[config.name as keyof typeof state] as string}
            onChange={handleChangeInput}
            required
          />
          {error && error.errors && config.name && error.errors.hasOwnProperty(config.name) &&
            <span className="error-message">{error.errors[config.name]}</span>
          }
        </React.Fragment>
      )}
      <span className="error-message">{!!error && error.message}</span>
      <button className="auth-form-btn">{submitBtnText}</button>
    </form>
  );
}

export default Form;