import React, { useEffect, useState } from "react";
import { Button } from "@react-md/button";
import { FontIcon, TextIconSpacing } from "@react-md/icon";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogFooter,
} from "@react-md/dialog";
import PatientTable from "../PatientTable";

function PatientModal({ show, onRequestClose, patients, setPatients }) {
  return (
    <Dialog
      visible={show}
      onRequestClose={() => onRequestClose()}
      style={{ minWidth: "30vw" }}
    >
      <DialogHeader>
        <DialogTitle>Pacientes</DialogTitle>
      </DialogHeader>
      <DialogContent
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <PatientTable patients={patients} />
      </DialogContent>
      <DialogFooter
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        {/* TODO: Botão de adicionar, usar setPatients */}
        <Button onClick={null}>
          <TextIconSpacing icon={<FontIcon>add</FontIcon>}>
            Adicionar Paciente
          </TextIconSpacing>
        </Button>
        <Button onClick={onRequestClose}>Fechar</Button>
      </DialogFooter>
    </Dialog>
  );
}

export default PatientModal;
