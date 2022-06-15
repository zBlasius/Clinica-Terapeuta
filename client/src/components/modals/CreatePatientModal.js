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
import api from "../../api/api";

function CreatePatientModal({
  onRequestClose,
  refreshPatients,
  patientToEdit,
  user
}) {
  const [errors, setErrors] = useState({});
  const errored = useMemo(() => Object.values(errors).some(Boolean), [errors]);
  const onErrorChange = useCallback(
    (id, error) => setErrors((prevErrors) => ({ ...prevErrors, [id]: error })),
    []
  );
  const [_name, nameFieldProps] = useTextField({
    id: "name",
    defaultValue: patientToEdit?.name,
    required: true,
    maxLength: 50,
    onErrorChange,
  });
  const [_email, emailFieldProps] = useTextField({
    id: "email",
    defaultValue: patientToEdit?.email,
    required: true,
    helpText: "exemplo@email.com",
    pattern: "^[a-z0-9.]+@[a-z0-9]+.[a-z]+.([a-z]+)?$",
    onErrorChange,
  });

  function upcreatePatient(name, email) {
    if (errored || email == "") {
      return;
    }

    const patient = patientToEdit?.id
      ? { ...patientToEdit, name, email }
      : { name, email };

    api.post("upcreate", {user: user?.email, kind: "Patient", params: patient})
      .then((resp) => {
        refreshPatients();
        onRequestClose();
      })
      .catch((err) => {
        alert("DEU ZIKA BOY");
      });
  }

  return (
    <Dialog
      visible
      onRequestClose={() => onRequestClose()}
      style={{ minWidth: "30vw" }}
    >
      <Form>
        <DialogHeader>
          <DialogTitle>{ patientToEdit?.id ? 'Editar Paciente' : 'Adicionar Paciente'}</DialogTitle>
        </DialogHeader>
        <DialogContent>
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
        </DialogContent>
        <DialogFooter
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Button theme="clear" themeType="outline" onClick={onRequestClose}>
            Cancelar
          </Button>
          <Button
            disabled={errored}
            type="submit"
            theme="primary"
            themeType="contained"
            onClick={() => upcreatePatient(_name, _email)}
          >
            Confirmar
          </Button>
        </DialogFooter>
      </Form>
    </Dialog>
  );
}

export default CreatePatientModal;
