import React, { useState, useCallback, useMemo } from "react";
import { Button } from "@react-md/button";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogFooter,
} from "@react-md/dialog";
import { Form, TextFieldWithMessage, useTextField } from "@react-md/form";

function CreatePatientModal({ onRequestClose, refreshPatients }) {
  const [errors, setErrors] = useState({});
  const errored = useMemo(() => Object.values(errors).some(Boolean), [errors]);
  const onErrorChange = useCallback(
    (id, error) => setErrors((prevErrors) => ({ ...prevErrors, [id]: error })),
    []
  );
  const [_name, nameFieldProps] = useTextField({
    id: "name",
    required: true,
    maxLength: 50,
    onErrorChange,
  });
  const [_email, emailFieldProps] = useTextField({
    id: "email",
    required: true,
    helpText: "exemplo@email.com",
    pattern: "^[a-z0-9.]+@[a-z0-9]+.[a-z]+.([a-z]+)?$",
    onErrorChange,
  });

  function createPatient(name, email) {
    if (errored) {
      return;
    }

    refreshPatients();
    onRequestClose();
  }

  return (
    <Dialog
      visible
      onRequestClose={() => onRequestClose()}
      style={{ minWidth: "30vw" }}
    >
      <Form>
        <DialogHeader>
          <DialogTitle>Adicionar Paciente</DialogTitle>
        </DialogHeader>
        <DialogContent
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        ></DialogContent>
        <TextFieldWithMessage
          {...nameFieldProps}
          name="name"
          label="Nome"
          placeholder="Insira o nome do Paciente"
        />
        <TextFieldWithMessage
          {...emailFieldProps}
          name="email"
          label="E-Mail"
          placeholder="Insira o e-mail do Paciente"
        />
        <DialogFooter
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Button onClick={onRequestClose}>Cancelar</Button>
          <Button
            onClick={() => createPatient(_name, _email)}
            type="submit"
            disabled={errored}
          >
            Confirmar
          </Button>
        </DialogFooter>
      </Form>
    </Dialog>
  );
}

export default CreatePatientModal;
