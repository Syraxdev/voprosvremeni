import React from "react";
import Papa from "papaparse";

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

import GlobalStyle from "./reset";
import { Container } from "./styled";

import CSVData from './data.csv'

const columns = [
  {
    width: 250,
    headerName: 'Encounter name',
    field: 'encounterName',
  },
  // {
  //   width: 250,
  //   headerName: 'Difficulty',
  //   field: 'difficulty',
  // },
  // {
  //   width: 250,
  //   headerName: 'Size',
  //   field: 'size',
  // },
  // {
  //   width: 250,
  //   headerName: 'Kill',
  //   field: 'kill',
  // },
  {
    width: 250,
    headerName: 'Average item level',
    field: 'averageItemLevel',
  },
  {
    width: 250,
    headerName: 'Duration',
    field: 'duration',
  },
  {
    width: 250,
    headerName: 'Log ID',
    field: 'logID',
    renderCell: (params) => {
      const link = `https://classic.warcraftlogs.com/reports/${params.value}`
      return (
        <a href={link} target="_blank">{params.value}</a>
      )
    }
  },
];

const App = () => {
  const [parsedData, setParsedData] = React.useState([]);

  React.useEffect(() => {
    const fetchParseData = async () => {
      Papa.parse(CSVData, {
        download: true,
        delimiter: ",",
        complete: ((results) => {
          setParsedData(results.data);
        })
      })
    }

    fetchParseData()
  }, [])

  // const shortData = parsedData.slice(1, 10)
  const fullData = parsedData.slice(1)

  const formatedData = fullData.map((row) => {
    return ({
      id: row[1],
      encounterName: row[18],
      difficulty: row[3],
      size: row[6],
      kill: row[7],
      averageItemLevel: row[5],
      duration: row[16],
      logID: row[17]
    })
  })

  const rows = formatedData.filter((item) => {
    if (item.size === '25' && item.difficulty === 'Hard' && item.kill === 'TRUE') {
      return item;
    }
  })

  return (
    <>
      <GlobalStyle />
      <Container>
        <Box sx={{ height: '100%', width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            disableRowSelectionOnClick
          />
        </Box>
      </Container>
    </>
  );

}

export default React.memo(App);