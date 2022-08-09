import { displaySetting } from "config/style";
import styled from "@emotion/styled";

export const Input = styled.input`
  height: 30px;
  width: 200px;
  border: 1px black solid;
  border-radius: 10px;
  padding: 10px;
  margin: 20px;
`;

export const PasswordForm = styled.div`
  ${displaySetting}
  background-color: rgb(220, 220, 220);
  width: 100%;
  height: 100%;
`;

export const FormContainer = styled.form`
  ${displaySetting}
`;

export const Button = styled.button`
  height: 40px;
  width: 100px;
  border: none;
  border-radius: 10px;
  background: rgb(1, 185, 1);
  box-shadow: 0px 0px 10px;
  margin: 30px;
  &:hover {
    cursor: pointer;
    box-shadow: 0px 0px 5px;
  }
`;

export const ModalContainer = styled.div`
  ${displaySetting}
  position: absolute;
  bottom: 0;
  top: 0;
  right: 0;
  left: 0;
  background-color: transparent;
`;

export const Modal = styled.div`
  ${displaySetting}
  z-index: 10;
  width: 300px;
  height: 100px;
  border-radius: 30px;
  background-color: azure;
  padding: 30px;
  font-size: 15pt;
`;
