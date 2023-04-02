import type { definitions } from "@/types/generated-types";

import { PostgrestClient } from "@supabase/postgrest-js";

// Create a single postgrest client for interacting with database
const postgrest = new PostgrestClient<definitions>("https://api.lenscan.io");

export const db = {
  Events: (start: number, end: number) =>
    postgrest
      .from("Event")
      .select("*", { count: "planned" })
      .order("id", { ascending: false })
      .range(start, end),
  Event: (id: number) =>
    postgrest.from("Event").select("*").eq("id", id).single(),
};

export default postgrest;