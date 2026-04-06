import { query } from "@solidjs/router";
import { supabase } from "#utils/supabase";
import { redirect } from "@solidjs/router";
import { getUser } from "./actions.js";

export const checkAuthLoader = query(async () => {
    const { data: { session } } = await supabase.auth.getSession();
	if (!session) {
        throw redirect("/auth");
	}
}, "checkAuthLoader");


export const contentLoader = query(async () => {
    const { data, error } = await supabase.from('content').select('*, profiles(username)');
    if (error) {
        console.error("Error fetching content:", error);
        return null;
    }
    console.log("Fetched content:", data);
    
    return data;
}, "contentLoader");


export const chapterLoader = query(async ({ params: { title } }) => {
    const { data, error } = await supabase
        .from('chapters')
        .select('*')
        .eq('title', title);

    if (error) {
        console.error("Error fetching chapters:", error);
        return null;
    }

    return data;
}, "chapterLoader");

export const storyLoader = query(async ({ params: { id } }) => {
    const { data, error } = await supabase
        .from('content')
        .select('*')
        .eq('id', id)
        .single();
    if (error) {
        console.error("Error fetching story:", error);
        return null;
    }

    const { data: chapters, error: chapterError } = await supabase
        .from('chapters')
        .select('*')
        .eq('story_id', id)
        .order('chapter_number', { ascending: true });

    if (chapterError) {
        console.error("Error fetching chapters:", chapterError);
        return null;
    }

    return { manga: data, chapters: chapters };
}, "storyLoader");

export const booksLoader = query(async () => {
    const id = await getUser().then(user => user.id);
    const { data, error } = await supabase
        .from('content')
        .select('*, profiles(user_id, username)')
        .eq('author_id', id)
        .order('updated_at', { ascending: false });

    if (error) {
        console.error("Error fetching books:", error);
        return null;
    }

    return data;
}, "booksLoader");