import React from "react";
import { Button } from "@react-md/button";
import { FontIcon } from "@react-md/icon";
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@react-md/table";

function PatientTable({ patients, refreshPatients }) {
  function deletePatient(patientId) {
    // TODO: Deletar paciente por id
    refreshPatients();
  }

  return (
    <TableContainer style={{ maxHeight: "60vh" }}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell />
            <TableCell>Nome</TableCell>
            <TableCell>Email</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.map((patient) => (
            <TableRow key={patient.id}>
              <TableCell>
                <Button onClick={() => deletePatient(patient.id)}>
                  <FontIcon>delete</FontIcon>
                </Button>
              </TableCell>
              <TableCell>{patient.name}</TableCell>
              <TableCell>{patient.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PatientTable;
