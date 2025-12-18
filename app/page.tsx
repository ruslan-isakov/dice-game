"use client"

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import ControlPanel from "@/app/ui/ControlPanel";
import AlertBox from "@/app/ui/Alert";
import HistoryTable from "@/app/ui/historyTable";

export default function Page() {
  return (
      <Container maxWidth={"sm"} style={{padding:"0", position:"relative"}}>
        <AlertBox />
        <Box sx={{ paddingTop: '13vh', marginBottom: '1rem'}}>
          <ControlPanel />
        </Box>
        <HistoryTable />
      </Container>
  )
}