import { useState, useCallback, useRef } from "react";
import { errorMessage } from "config/errors"
import { Input, PasswordForm, FormContainer, Button, Modal, ModalContainer } from "./Forms"

const PasswordEntry = ({ url }) => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [alerts, setAlerts] = useState(null);
  const [confirmAlert, setConfirmAlert] = useState("");
  const [success, setSuccess] = useState(false);

  const passwordRef = useRef();
  const confirmRef = useRef();

  const submitHandler = useCallback(() => {
    let error = [];

    if (password) {
      if (password.length < 6) error.push(`${errorMessage["short"]}\n`);
      if (password.match(/[A-Z]/g) === null)
        error.push(`${errorMessage["upper"]}\n`);
      if (password.match(/[a-z]/g) === null)
        error.push(`${errorMessage["lower"]}\n`);
      if (password.match(/\d/g) === null)
        error.push(`${errorMessage["number"]}\n`);
      if (password.match(/[^0-9a-zA-Z *]/g) === null)
        error.push(`${errorMessage["special"]}\n`);
    }
    setAlerts(error);

    if (!password) setAlerts(["Please type your password!"]);

    if (password !== confirm && error.length === 0)
      setConfirmAlert(errorMessage["confirm"]);
    else setConfirmAlert("");

    if (password && password === confirm && error.length === 0)
      setSuccess(true);
  }, [confirm, password]);

  const postHandler = useCallback(() => {
    setSuccess(false);
    passwordRef.current.value = "";
    confirmRef.current.value = "";
    setPassword(null);
    setConfirm(null);
  });

  return (
    <>
      <PasswordForm id="passwordForm">
        <h1>Set your password</h1>
        <FormContainer action={url} method="post" id="passwordSubmit">
          <div>
            <label for="password">Password : </label>
            <Input
              ref={passwordRef}
              placeholder="Type your password"
              id="password"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></Input>
          </div>
          <div>
            <label for="confirm">&nbsp;&nbsp;&nbsp;Confirm : </label>
            <Input
              ref={confirmRef}
              placeholder="Confirm your password"
              id="confirm"
              type="password"
              onChange={(e) => {
                setConfirm(e.target.value);
              }}
            ></Input>
          </div>
        </FormContainer>
        {alerts && alerts.length > 0 && (
          <ul id="alert">
            {alerts.map((alert, index) => (
              <li key={index}>{alert}</li>
            ))}
          </ul>
        )}

        <p id="confirmAlert">{confirmAlert || null}</p>

        <Button
          type="submit"
          onClick={() => submitHandler()}
          form="passowrdSubmit"
          value="submit"
        >
          Submit
        </Button>
      </PasswordForm>
      {success && (
        <ModalContainer>
          <Modal id="modal">
            Your password has set successfully!
            <Button onClick={() => postHandler()}>OK</Button>
          </Modal>
        </ModalContainer>
      )}
    </>
  );
};

export default PasswordEntry;
