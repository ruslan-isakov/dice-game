import { NextRequest, NextResponse } from "next/server";
import { validationSchema } from "@/app/lib/schema";
import { z } from "zod";
import { GameType } from "@/app/lib/definitions";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const validationData = validationSchema.safeParse({
    num: body.inputNumber,
    type: body.inputType,
  });
  if (!validationData.success) {
    return NextResponse.json({
      errors: z.flattenError(validationData.error).fieldErrors,
      message: "Error: Failed to provide comparison!",
      result: undefined,
      playNumber: undefined,
      type: body.get("inputType") as GameType,
      num: undefined,
    }, { status: 400});
  }

  const { num, type } = validationData.data;
  const playNumber: number = getRandomInteger(1, 100);

  let result = false;
  if (type === "under") result = playNumber < num;
  if (type === "over") result = playNumber > num;

  return NextResponse.json({
    errors: undefined,
    message: undefined,
    result,
    playNumber,
    type,
    num,
  }, {status: 200});

}

function getRandomInteger(min: number, max: number): number {
  return Math.floor(Math.random() * ( max - min + 1 )) + min;
}