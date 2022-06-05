import React, { useEffect, useState } from "react";
import { Button } from "@react-md/button";
import { FontIcon, TextIconSpacing } from "@react-md/icon";
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@react-md/table";

function PatientTable({ patients }) {
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
                {/* TODO: Excluir paciente */}
                <Button onClick={null}>
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
