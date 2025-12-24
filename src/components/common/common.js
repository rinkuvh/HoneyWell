import moment from "moment";
import * as XLSX from "xlsx";

export const handleCommonExport = async ({ headers, rows, nameFile }) => {
  try {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(rows);
    XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: "A1" });
    XLSX.utils.book_append_sheet(workbook, worksheet, "User Data");
    XLSX.writeFile(
      workbook,
      `${nameFile}_${moment().format("DD-MM-YYYY")}.xlsx`,
      { compression: true }
    );
  } catch (error) {
    console.error("Error exporting user data:", error);
  }
};


export const truncateString = (str, maxLength) => {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + '...';
}

export const convertMinutesToHours = (minutes) => {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;

  return `${hrs} hr ${mins} min${mins !== 1 ? 's' : ''}`;
}

const defaultExcelOptions = {
  fileName: "Lenovoleap",
  columnWidths: [],
  heading: "",
};
export const downloadExcel = (
  column = [],
  rows = [],
  options = defaultExcelOptions
) => {
  const worksheet = XLSX.utils.json_to_sheet(rows);
  if (options.columnWidths?.length) {
    worksheet["!cols"] = options.columnWidths;
  } else {
    const colWidths = column.map(() => ({ wpx: 80 }));
    worksheet["!cols"] = colWidths;
  }
  if (options?.heading) {
    const mergeRange = { s: { r: 0, c: 0 }, e: { r: 0, c: column.length - 1 } };
    worksheet["!merges"] = [mergeRange];
    XLSX.utils.sheet_add_aoa(worksheet, [[options.heading]], {
      origin: "A1",
    });
  }
  XLSX.utils.sheet_add_aoa(worksheet, [column], {
    origin: options?.heading ? "A2" : "A1",
  });

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet);

  XLSX.writeFile(workbook, `${options.fileName}.xlsx`);
};