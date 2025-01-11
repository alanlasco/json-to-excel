import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const ExportarExcel = () => {
  const exportarJSONComoExcel = async () => {
    // Cargar datos desde el archivo JSON
    const response = await fetch("/reclamos.json");
    const data = await response.json();

    // Convertir JSON a formato Excel
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Reclamos");

    // Generar archivo Excel
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });

    // Descargar el archivo Excel
    saveAs(blob, "datos_exportados.xlsx");
  };

  return <button onClick={exportarJSONComoExcel}>Exportar a Excel</button>;
};

export default ExportarExcel;
