import React, { useEffect } from 'react';
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useState } from 'react';
import { Button } from '@mui/material';

const ExportPDF = ({ dataTable, titleReport,  }) => {
  
  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = titleReport
    const headers = [["ID", "BARANG", "JUMLAH", "PETUGAS", "DIVISI"]];

    const data = dataTable.map(elt=> [elt.id, elt.Item.name, elt.total, elt.User.name, elt.Department.name]);

    let content = {
      startY: 50,
      head: headers,
      body: data
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save(`${title}.pdf`)
  }

  return (
    <div>
      <Button variant='contained' onClick={exportPDF}>Download PDF</Button>
    </div>
  );
}


export default ExportPDF;