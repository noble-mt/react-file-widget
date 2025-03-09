// Copyright (c) 2017 PlanGrid, Inc.

import React, { useEffect, useState } from 'react';
import { RFW_FileRenderer } from '../../modals';
import { useGetConfig, useGetDocument } from '../../utils/context-helpers';
import styled from '@emotion/styled';
import ErrorPage from '../../shared/error-page';
import { WrapperContainer } from '../../shared/wrapper-contr';
import Loading from '../../shared/loading';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;

  * {
    box-sizing: border-box;
  }
  th,
  td {
    border: 1px solid gray;
    padding: 4px;
    text-align: left;
  }
  th {
    background-color: #f2f2f2;
  }
`;

const CSVRender: RFW_FileRenderer = () => {
  const file = useGetDocument();
  const config = useGetConfig();
  const [loading, setLoading] = useState<boolean>(false);
  const [cols, setColumns] = useState<string[]>([]);
  const [rowData, setRowData] = useState<string[][]>([]);
  const [error, SetError] = useState<boolean>(false);

  const parseData = (res: string) => {
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
  };

  useEffect(() => {
    if (file?.url) {
      setLoading(true);
      fetch(file?.url)
        .then((res) => res.text())
        .then((res) => {
          parseData(res);
        })
        .catch(() => SetError(true))
        .finally(() => setLoading(false));
    } else if (file?.file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        parseData(text);
      };
      reader.onerror = () => SetError(true);
      reader.readAsText(file.file);
    } else if (file?.data) {
      parseData(file.data);
    }
  }, [file?.url]);

  return (
    <WrapperContainer config={config} className={config?.classNames?.content}>
      {error ? (
        <ErrorPage />
      ) : (
        <>
          {loading ? <Loading /> : (
            <Table>
              <thead>
                <tr>
                  {cols.map((col) => (
                    <th key={col}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rowData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {cols.map((_cell, cellIndex) => (
                      <td key={cellIndex}>{row?.[cellIndex]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </>
      )}
    </WrapperContainer>
  );
};

CSVRender.supportedFileTypes = ['csv', 'text/csv'];

export default CSVRender;
