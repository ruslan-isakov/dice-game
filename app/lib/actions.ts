"use server";

//import { validationSchema } from "@/app/lib/schema";
//import { z } from "zod";
import {StateInterface } from "@/app/lib/definitions";
import { headers } from "next/headers";

export async function playAction(State: StateInterface, formData: FormData): Promise<StateInterface> {
  /********************************************************************************************/
  // Commented logic below uses Server Actions only for data handling                         //
  // Just for demonstrating of usage of both: classic REST API and SA there is another logic: //
  // For getting data from Client the Server Actions is used                                  //
  // For result processing the REST API was created and connected with SA function            //
  // In real project the usage of one of these approaches is preferable                       //
  /********************************************************************************************/

  /* const validatedData = validationSchema.safeParse({
     num: formData.get("inputNumber"),
     type: formData.get("inputType"),
   });
   if (!validatedData.success) {
     return {
       errors: z.flattenError(validatedData.error).fieldErrors,
       message: "Error: Failed to provide comparison!",
       result: undefined,
       playNumber: undefined,
       type: formData.get("inputType") as GameType,
       num: undefined,
     };
   }
   const { num, type } = validatedData.data;
   const playNumber: number = getRandomInteger(1, 100);

   let result = false;
   if (type === "under") result = playNumber < num;
   if (type === "over") result = playNumber > num;

   return {
     errors: undefined,
     message: undefined,
     result: result,
     playNumber: playNumber,
     type: type,
     num: num,
   };

 function getRandomInteger(min: number, max: number): number {
   return Math.floor(Math.random() * ( max - min + 1 )) + min;
 }
   */


  try {
    const headersList = await headers();
    const host = headersList.get("host");
    const protocol = headersList.get("x-forwarded-proto") ?? "http";

    const baseUrl = `${ protocol }://${ host }`;

    const res = await fetch(`${ baseUrl }/api/play`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputType: formData.get("inputType"),
        inputNumber: Number(formData.get("inputNumber")),
      }),
      cache: "no-store",
    });

    const data = await res.json();

    return data;
  } catch (error) {
    return {
      errors: undefined,
      message: "Network error. Please try again.",
      result: undefined,
      playNumber: undefined,
      type: formData.get("inputType") as any,
      num: undefined,
    };
  }
}