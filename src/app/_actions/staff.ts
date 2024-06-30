"use server";

import createSupabaseServerClient from "@/supabase/server";
import { StaffType } from "@utils/types/index";

export async function createStaff({ staff }: { staff: StaffType }) {
  try {
    const supabase = await createSupabaseServerClient();

    const result = await supabase.from("staff").insert(staff);

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

export async function getProductById({ id }: { id: string }) {
  try {
    const supabase = await createSupabaseServerClient();

    const result = await supabase.from("staff").select("*").eq("id", id);

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
