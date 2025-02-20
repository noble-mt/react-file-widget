// Copyright (c) 2017 PlanGrid, Inc.

import React, { useEffect, useState } from 'react';
import { RFW_FileRenderer } from '../../modals';
import { useGetConfig, useGetDocument } from '../../utils/context-helpers';
import styled from '@emotion/styled';

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    background-color: white;

    * {
      box-sizing: border-box;
    }

    tbody{
      display: block;
      overflow-y: scroll;
      scrollbar-width: thin;
      scrollbar-color: gray white;
      margin-right: -17px;

      &::-webkit-scrollbar {
        width: 8px;
      }

      &::-webkit-scrollbar-track {
        background: white;
      }

      &::-webkit-scrollbar-thumb {
        background-color: gray;
        border-radius: 10px;
        border: 2px solid white;
      }
    }
    tr {
      display: table;
      width: 100%;
      table-layout: fixed;
    }
    th, td {
        border: 1px solid gray;
        padding: 8px;
        text-align: left;
    }
    thead tr {
      // width: calc( 100% - 17px );
    }
    th {
        background-color: #f2f2f2;
    }
`;

const CSVRender: RFW_FileRenderer = () => {
  const file = useGetDocument();
  const config = useGetConfig();
  const [cols, setColumns] = useState<string[]>([]);
  const [rowData , setRowData] = useState<string[][]>([]);
  const [error , SetError] = useState<boolean>(false);


    useEffect(() => {
        if (file?.url) {
            fetch(file?.url)
                .then(res => res.text())
                .then(res => {
                    const rows: string[][] = [];
                    let cols: string[] = [];
                    res.split('\n').map((row, rowIndex) => {
                        const values = row.split(',');
                        if (rowIndex === 0) {
                            cols = values;
                        } else {
                            const extra = values.length - cols.length;
                            if (extra > 0) {
                                cols.concat(Array(extra));
                            }
                            rows.push(values);
                        }
                    });
                    setColumns(cols);
                    setRowData(rows);
                }).catch(() => SetError(true));
        }
    }, [file?.url]);
    
    return (
    <>
      {error ? (
        <div>Error loading CSV file.</div>
      ) : (
        <Table>
            <thead>
              <tr>
                {cols.map(col => (
                    <th key={col}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody style={{ height: config?.height ?? "100%" }}>
              {rowData.map((row, rowIndex) => (
                <tr key={rowIndex} >
                    {cols.map((_cell, cellIndex) => (
                      <td key={cellIndex}>{row?.[cellIndex]}</td>
                    ))}
                </tr>
              ))}
            </tbody>
        </Table>
      )}
    </>
    );
}

CSVRender.supportedFileTypes = ["csv"];

export default CSVRender;

