/// <reference lib="webworker" />

import * as ExcelJS from 'exceljs';
import { CellErrorValue, CellValue } from 'exceljs';

// Define an interface for the message event data
interface MessageEventData {
  cmd?: string; // Optional property
  action: string;
  data: ArrayBuffer;
}

// Event listener for handling messages
addEventListener('message', async (event: MessageEvent<MessageEventData>) => {
  const { action, data } = event.data;
  switch (action) {
    case 'readXlsx':
      const extractedData = await extractXlsxData(data);
      const transformedData = transformData(extractedData);
      console.log('Transformed data: ', transformedData);
      postMessage({
        action: 'transformedData',
        data: transformedData,
      });
      break;
    default:
      console.warn(`Unknown action: ${action}`);
      break;
  }
});

// Function to extract data from the XLSX file
async function extractXlsxData(data: ArrayBuffer) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(data);
  const worksheet = workbook.getWorksheet(1); // Get the first worksheet
  if (!worksheet) return { displayedColumns: [], rows: [] }; // Early return if worksheet is null

  const displayedColumns = worksheet.getRow(1).values as
    | CellValue[]
    | { [key: string]: CellValue };
  const rows: (CellValue[] | { [key: string]: CellValue })[] = [];

  // Iterate over each row starting from the second row
  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber > 1) {
      rows.push(row.values); // Add row values to the rows array
    }
  });

  return { displayedColumns, rows };
}

// Function to transform the extracted data
function transformData(data: {
  displayedColumns: CellValue[] | { [key: string]: CellValue };
  rows: (CellValue[] | { [key: string]: CellValue })[];
}) {
  const transformedData: { [key: string]: CellValue }[] = [];
  if (!Array.isArray(data.displayedColumns) || !Array.isArray(data.rows))
    return transformedData;

  for (const row of data.rows) {
    const transformedRow = transformRow(data.displayedColumns, row);
    transformedData.push(transformedRow);
  }
  return transformedData;
}

// Function to transform a single row
function transformRow(
  displayedColumns: CellValue[],
  row: CellValue[] | { [key: string]: CellValue }
) {
  const transformedRow: { [key: string]: CellValue } = {};
  if (Array.isArray(row)) {
    for (let i = 0; i < row.length; i++) {
      const key = displayedColumns[i] as string;
      if (key) {
        const value = handleExcelRow(row[i]?.toString() || '');
        transformedRow[key] = value;
      }
    }
  }
  return transformedRow;
}

// Function to handle specific Excel row values
function handleExcelRow(value: string) {
  if (value.startsWith('http://') || value.startsWith('https://')) {
    return { text: value, hyperlink: value };
  }
  return value;
}
