import { validationSchema } from "@/app/lib/schema";
import { z } from "zod";
import { GameType, StateInterface } from "@/app/lib/definitions";

export function playAction(State: StateInterface, data: FormData) {
  const validatedData = validationSchema.safeParse({
    num: data.get("inputNumber"),
    type: data.get("inputType"),
  });
  if (!validatedData.success) {
    return {
      errors: z.flattenError(validatedData.error).fieldErrors,
      message: "Error: Failed to provide comparison!",
      result: undefined,
      playNumber: undefined,
      type: data.get("inputType") as GameType,
      num: undefined,
    };
  }
  const { num, type} = validatedData.data;
  const playNumber: number = getRandomInteger(1, 100);
  let result = false
  switch (type) {
    case "under": if(playNumber < num) result = true;
    break;
    case "over": if(playNumber > num) result = true;
    break;
    default: result = false;
  }
return {
  errors: undefined,
  message: undefined,
  result: result,
  playNumber: playNumber,
  type: type,
  num: num,
}
}

function getRandomInteger(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}