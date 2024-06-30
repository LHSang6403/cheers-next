"use server";

import createSupabaseServerClient from "@/supabase/server";
import { DrinkerType } from "@utils/types/index";

export async function getProductById({ id }: { id: string }) {
  try {
    const supabase = await createSupabaseServerClient();

    const result = await supabase.from("drinker").select("*").eq("id", id);

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
