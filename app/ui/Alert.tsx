import Box from "@mui/material/Box";
import { Alert } from "@mui/material";

export default function AlertBox({alert}: {alert: boolean}) {
  return (
    <Box sx={{position: 'absolute', top: '1rem', left: 0, width: '100%'}}>
      {alert ? (
      <Alert variant="filled" severity="success">
        You won
      </Alert>
      ) : (
      <Alert variant="filled" severity="error">
        <div style={{
          fontWeight: '500',
          fontSize: '16px',
          lineHeight: '150%',
          letterSpacing: '0.15px'
        }}>You lost</div>
        <div style={{
          fontWeight: '500',
          fontSize: '14px',
          lineHeight: '143%',
          letterSpacing: '0.15px'
        }}>Number was higher</div>
      </Alert>
      )}
    </Box>
  );
}