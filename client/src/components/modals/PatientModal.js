import React, { useState } from "react";
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
import CreatePatientModal from "./CreatePatientModal";

function PatientModal({ show, onRequestClose, patients, refreshPatients }) {
  const [showCreatePatientModal, setShowCreatePatientModal] = useState(false);

  return (
    <>
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
          <PatientTable patients={patients} refreshPatients={refreshPatients} />
        </DialogContent>
        <DialogFooter
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Button onClick={() => setShowCreatePatientModal(true)}>
            <TextIconSpacing icon={<FontIcon>add</FontIcon>}>
              Adicionar Paciente
            </TextIconSpacing>
          </Button>
          <Button onClick={onRequestClose}>Fechar</Button>
        </DialogFooter>
      </Dialog>

      {showCreatePatientModal && (
        <CreatePatientModal
          refreshPatients={refreshPatients}
          onRequestClose={() => setShowCreatePatientModal(false)}
        />
      )}
    </>
  );
}

export default PatientModal;
