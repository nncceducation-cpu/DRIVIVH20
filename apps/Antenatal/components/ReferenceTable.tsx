import React from 'react';
import { ReferenceTableData } from '../types';

interface ReferenceTableProps {
  data: ReferenceTableData;
  colorClass: string;
  onRowSelect?: (topic: string, content: string) => void;
}

const ReferenceTable: React.FC<ReferenceTableProps> = ({ data, colorClass, onRowSelect }) => {
  const handleRowClick = (row: { [key: string]: string }) => {
    if (!onRowSelect) return;
    
    // Attempt to find the "main" topic from the first header (usually Diagnosis, Gestation, or Infection)
    const mainKey = data.headers[0];
    const topic = row[mainKey];
    
    // Construct a context string from all columns
    const contextParts = data.headers.map(header => `${header}: ${row[header]}`);
    const context = contextParts.join('. ');
    
    onRowSelect(topic, context);
  };

  return (
    <div className="relative overflow-x-auto rounded-lg border border-slate-200 shadow-sm bg-white">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className={`${colorClass} text-white`}>
          <tr>
            {data.headers.map((header, idx) => (
              <th
                key={idx}
                scope="col"
                className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-slate-200">
          {data.rows.map((row, rowIdx) => (
            <tr 
              key={rowIdx} 
              onClick={() => handleRowClick(row)}
              className={`transition-colors ${onRowSelect ? 'cursor-pointer hover:bg-blue-50 active:bg-blue-100' : 'hover:bg-slate-50'}`}
              title={onRowSelect ? "Add this reference to the consult draft" : ""}
            >
              {data.headers.map((header, colIdx) => (
                <td
                  key={`${rowIdx}-${colIdx}`}
                  className="px-6 py-4 text-sm text-slate-700 align-top whitespace-pre-wrap leading-relaxed"
                >
                  {row[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReferenceTable;