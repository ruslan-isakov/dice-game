import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useDiceStore } from "@/app/lib/useDiceStore";
import { DiceGameRow } from "@/app/lib/definitions";

export default function HistoryTable() {
  const history: DiceGameRow[] = useDiceStore((s) => s.history);
console.log(history.length);
  return (
    <TableContainer component={Paper} elevation={0} sx={{ border: "none" }}>
      <Table sx={{ maxWidth: 600 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Time</TableCell>
            <TableCell align="left">Guess</TableCell>
            <TableCell align="left">Result</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {history.length > 0 ? (
            history.map((row) => (
              <TableRow
                key={row.date}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {new Date(row.date).toLocaleTimeString()}
                </TableCell>
                <TableCell align="left">{row.guess}</TableCell>
                <TableCell align="left" sx={{ color: row.result ? 'success.main' : 'error.main', fontWeight: 'bold' }}>{row.playNumber}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} align="center">
                No games played yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}