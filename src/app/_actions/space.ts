"use server";

import createSupabaseServerClient from "@/supabase/server";
import { SpaceType } from "@utils/types/index";

export async function createProduct({ space }: { space: SpaceType }) {
  try {
    const supabase = await createSupabaseServerClient();

    const result = await supabase.from("space").insert(space);

    return {
      status: result.status,
      statusText: result.statusText,
      data: result.data,
      error: result.error,
    };
  } catch (error: any) {
    return {
      status: 500,
      statusText: "Server Error",
      data: null,
      error: error.message,
    };
  }
}


export async function getSpaceById({ id }: { id: string }) {
  try {
    const supabase = await createSupabaseServerClient();

    const result = await supabase.from("space").select("*").eq("id", id);

    return {
      status: result.status,
      statusText: result.statusText,
      data: result.data,
      error: result.error,
    };
  } catch (error: any) {
    return {
      status: 500,
      statusText: "Server Error",
      data: null,
      error: error.message,
    };
  }
}
