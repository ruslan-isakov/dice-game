"use client"

import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import ControlPanel from "@/app/ui/ControlPanel";
import { useState } from "react";
import AlertBox from "@/app/ui/Alert";
import HistoryTable from "@/app/ui/historyTable";

export default function Page() {
  const [alert, showAlert] = useState<boolean | undefined>(undefined);
  function alertHandle(state: boolean | undefined) {
    showAlert(state)
  }
  return (
      <Container maxWidth={"sm"} style={{padding:"0", position:"relative"}}>
        {alert !== undefined && <AlertBox alert={alert}/>}
        <Box sx={{ paddingTop: '13vh', marginBottom: '1rem'}}>
          <ControlPanel alertHandle={alertHandle}/>
        </Box>
        <HistoryTable />
      </Container>
  )
}