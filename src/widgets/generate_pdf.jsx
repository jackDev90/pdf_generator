import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function GeneratePDF() {
  const doc = new jsPDF();

  // It can parse html:
  // <table id="pdf-table"><!-- ... --></table>
  autoTable(doc, { html: "#pdf-table" });

  // Or use javascript directly:
  // autoTable(doc, {
  //   head: [['Product Name', 'Category', 'Model Number']],
  //   body: [
  //     ['Engine Oil', 'OIL', 'M-7878'],
  //     ['VVTI ENGINE', 'Engine', 'P8997887'],
  //     // ...
  //   ],
  // })

  doc.save("table.pdf");
}
