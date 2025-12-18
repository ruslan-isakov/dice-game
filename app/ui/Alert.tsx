import Box from "@mui/material/Box";
import { Alert } from "@mui/material";
import { StateInterface } from "@/app/lib/definitions";
import { useDiceStore } from "@/app/lib/useDiceStore"

export default function AlertBox() {
  const lastState: StateInterface | null = useDiceStore((s) => s.lastState);
  const hasPlayed = useDiceStore((s) => s.hasPlayed)

  if (!hasPlayed || lastState?.result === undefined) return null;

  return (
    <Box sx={{ position: 'absolute', top: '1rem', left: 0, width: '100%' }}>
      {lastState.result ? (
        <Alert variant="filled" severity="success" icon={<SuccessIcon />}>
          You won
        </Alert>
      ) : (
        <Alert variant="filled" severity="error">
          <div style={{ fontWeight: 500, fontSize: 16 }}>You lost</div>
          <div style={{ fontWeight: 500, fontSize: 14 }}>
            Number was higher
          </div>
        </Alert>
      )}
    </Box>
  );
}

const SuccessIcon = () => {
  return (
    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13.3742 5.115L7.33333 11.1558L4.0425 7.87417L2.75 9.16667L7.33333 13.75L14.6667 6.41667L13.3742 5.115ZM9.16667 0C4.10667 0 0 4.10667 0 9.16667C0 14.2267 4.10667 18.3333 9.16667 18.3333C14.2267 18.3333 18.3333 14.2267 18.3333 9.16667C18.3333 4.10667 14.2267 0 9.16667 0ZM9.16667 16.5C5.115 16.5 1.83333 13.2183 1.83333 9.16667C1.83333 5.115 5.115 1.83333 9.16667 1.83333C13.2183 1.83333 16.5 5.115 16.5 9.16667C16.5 13.2183 13.2183 16.5 9.16667 16.5Z"
        fill="white"/>
    </svg>
  );
}