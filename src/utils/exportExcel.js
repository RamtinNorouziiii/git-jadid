// utils/exportToExcel.js
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

export const exportToExcel = (columns, data, filename = 'data.xlsx') => {
    const formattedData = data.map(item => {
        const row = {};
        columns.forEach(col => {
            row[col.title] = item[col.dataIndex];
        });
        return row;
    });

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, filename);
};
