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

function PatientModal({ show, onRequestClose, patients, refreshPatients , user}) {
  const [showCreatePatientModal, setShowCreatePatientModal] = useState(false);
  const [patientToEdit, setPatientToEdit] = useState({});

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
          <PatientTable
            user={user}
            patients={patients}
            editPatient={(patientToEdit) => {
              setPatientToEdit(patientToEdit);
              setShowCreatePatientModal(true);
            }}
            refreshPatients={refreshPatients}
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
            Fechar
          </Button>
          <Button
            theme="primary"
            themeType="contained"
            onClick={() => setShowCreatePatientModal(true)}
          >
            <TextIconSpacing icon={<FontIcon>add</FontIcon>}>
              Adicionar Paciente
            </TextIconSpacing>
          </Button>
        </DialogFooter>
      </Dialog>

      {showCreatePatientModal && (
        <CreatePatientModal
          user={user}
          patientToEdit={patientToEdit}
          refreshPatients={refreshPatients}
          onRequestClose={() => {
            setPatientToEdit({});
            setShowCreatePatientModal(false);
          }}
        />
      )}
    </>
  );
}

export default PatientModal;
