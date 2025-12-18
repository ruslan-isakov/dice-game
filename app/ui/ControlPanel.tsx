"use client";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Button, CircularProgress, FormControlLabel, Radio, RadioGroup, Slider } from "@mui/material";
import * as React from "react";
import { useActionState, useEffect, useState } from "react";
import { playAction } from "@/app/lib/actions";
import { StateInterface } from "@/app/lib/definitions";
import { useDiceStore } from "@/app/lib/useDiceStore";


export default function ControlPanel() {
  const [typeValue, setTypeValue] = useState<"under" | "over">("under");
  const [sliderValue, setSliderValue] = useState<number>(1);
  const [lastProcessedState, setLastProcessedState] = useState<StateInterface | null>(null);
  const initialState: StateInterface = {
    errors: undefined,
    message: undefined,
    result: undefined,
    playNumber: undefined,
    type: typeValue,
    num: undefined
  };
  const [state, formAction, isPending] = useActionState(playAction, initialState);
  const addGameResult = useDiceStore((s) => s.addGameResult);
  const play = useDiceStore((s) => s.play);
  const resetPlay = useDiceStore((s) => s.resetPlay);

  useEffect(() => {
    resetPlay();
  }, []);

  useEffect(() => {
    if (state.playNumber !== undefined && state !== lastProcessedState) {
      if (state.result !== undefined) {
      }
      addGameResult(state);
      setLastProcessedState(state);
    }
  }, [state, addGameResult]);

  return (
    <Container
      maxWidth="xs"
      style={ {
        boxSizing: "border-box",
        padding: "0"
      } }
      sx={ {
        "&.MuiContainer-maxWidthXs": {
          maxWidth: "320px",
        },
      } }
    >
      <Box>
        <Box sx={ {
          height: "200px",
          width: "100%",
          bgcolor: "rgba(0, 0, 0, 0.04)",
          fontWeight: "300",
          fontSize: "96px",
          lineHeight: "116.7%",
          letterSpacing: "-1.5px",
          color: "rgba(0, 0, 0, 0.87)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        } }>
          {
            isPending
              ?  <CircularProgress />
              : state.playNumber !== undefined
                ? state.playNumber
                : "🤔"
          }
        </Box>
        <form action={ formAction }>
          <input type="hidden" name="inputType" value={typeValue} />
          <input type="hidden" name="inputNumber" value={sliderValue} />
          <RadioGroup
            row
            value={typeValue}
            onChange={(e) => setTypeValue(e.target.value as "under" | "over")}
            aria-labelledby="demo-row-radio-buttons-group-label"
            sx={ {
              margin: "1rem auto 2rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
            } }
          >
            <FormControlLabel value="under" control={ <Radio size={ "small" }/> } label="Under" />
            <FormControlLabel value="over" control={ <Radio size={ "small" }/> } label="Over" />
          </RadioGroup>
          <Slider
            aria-label="Always visible"
            size="small"
            value={sliderValue}
            onChange={(_, value) => setSliderValue(value as number)}
            getAriaValueText={ valuetext }
            valueLabelDisplay="auto"
            shiftStep={ 1 }
            step={ 1 }
            marks={ marks }
            min={ 1 }
            max={ 100 }
            sx={ { marginBottom: "2rem" } }
            disabled={ isPending }
          />
          <Button
            variant="contained"
            sx={ { width: "100%" } }
            type="submit"
            loading={ isPending }
            onClick={play}
          >
            PLAY
          </Button>
        </form>
        <Box>
          { state.message
            ? <div style={ { color: "#fc0606", fontSize: "14px" } }>{ state.message }</div>
            : <div/>
          }
        </Box>
      </Box>
    </Container>
  );
}

const marks = [
  { value: 1, label: "1" },
  { value: 20, label: "" },
  { value: 40, label: "" },
  { value: 60, label: "" },
  { value: 80, label: "" },
  { value: 100, label: "100" },
];

function valuetext(value: number) {
  return `Selected number is ${ value }`;
}