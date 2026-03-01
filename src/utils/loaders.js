import { query } from "@solidjs/router";
import { supabase } from "#utils/supabase";
import { redirect } from "@solidjs/router";

export const checkAuthLoader = query(async () => {
    const { data: { session } } = await supabase.auth.getSession();
	if (!session) {
        throw redirect("/auth");
	}
}, "checkAuthLoader");


export const contentLoader = query(async () => {
    const { data, error } = await supabase.from('content').select('*')
    if (error) {
        console.error("Error fetching content:", error);
        return null;
    }
    return data;
}, "contentLoader");

