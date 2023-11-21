import jsPDF from "jspdf";

export default function GeneratePdf({ data, headers, filename }) {
  const doc = new jsPDF({
    orientation: "l",
    unit: "pt",
    format: "a4",
  });

  const pageDimensions = {
    height: 595.28,
    width: 841.89,
  };

  const pageMargin = 50;
  const liveArea = {
    width: pageDimensions.width - pageMargin,
    height: pageDimensions.height - pageMargin,
  };
  const padding = 15;

  doc.setFontSize(8);

  const xPositions = [];

  headers.forEach((heading, index) => {
    if (heading.hasOwnProperty("xPos")) {
      doc.text(heading.label, heading.xPos, pageMargin);
      xPositions.push(heading.xPos);
    } else {
      const xPositionForCurrentHeader =
        pageMargin + index * (liveArea.width / headers.length);
      const yPositionForHeaders = pageMargin;
      doc.text(
        heading.label,
        index === 0
          ? xPositionForCurrentHeader
          : xPositionForCurrentHeader + padding,
        yPositionForHeaders
      );

      xPositions.push(
        index === 0
          ? xPositionForCurrentHeader
          : xPositionForCurrentHeader + padding
      );
    }
  });

  doc.line(pageMargin, pageMargin + 3.5, liveArea.width, pageMargin + 3.5);

  const baseYPosForRows = pageMargin + padding;
  let nextYPos = baseYPosForRows;

  // ROWS
  data.forEach((row, rIndex) => {
    const rowHeights = [];

    headers.forEach((column, cIndex) => {
      const longText = doc.splitTextToSize(
        String(row[column.key]),
        xPositions[cIndex] - xPositions[cIndex !== 0 && cIndex - 1]
      );
      console.log("PDF TEXT: " + longText);
      const rowHeight = longText.length * doc.getLineHeight();
      rowHeights.push(rowHeight);

      /*
       *
       *  Column styles go here
       *
       * */

      doc.text(longText, xPositions[cIndex], nextYPos);
    });

    nextYPos = nextYPos + padding + Math.max(...rowHeights, 30);

    if (nextYPos > liveArea.height) {
      doc.addPage();
      nextYPos = baseYPosForRows;
    }
  });

  doc.save(filename);
}
