import { action, redirect } from "@solidjs/router"
import { supabase } from "./supabase"

export const createUserAction = action(async (formData) => {
	const email = formData.get("email")?.toString();
	const username = formData.get("username")?.toString();
	const password = formData.get("password")?.toString();
	const region = formData.get("region")?.toString();
	const birthday = formData.get("birthday")?.toString();

	const { data, error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			data: {
				username,
				region,
				birthday,
			},
		},
	});

	if (error) {
    	return error.message;
	}
	
	const user = data.user;
	if (!user) {
    	return "User creation failed";
	}

	throw redirect("/");
}, "createAction");

export const signInUserAction = action(async (formData) => {
	const email = formData.get("email")?.toString();
	const password = formData.get("password")?.toString();
	const { error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});
	
	if (error) {
    	return error.message;
	}
	
	throw redirect("/");
}, "signInAction");

export const signOutUserAction = action(async () => {
	const { error } = await supabase.auth.signOut();
	if (error) {
		return error.message;
	}
	throw redirect("/auth");
}, "signOutAction");

export const deleteUserAction = action(async () => {
	const { error } = await supabase.auth.deleteUser();
	if (error) {
		return error.message;
	}
	throw redirect("/auth");
}, "deleteUserAction");

export const updateUserAction = action(async (formData) => {
	const username = formData.get("username")?.toString();
	const region = formData.get("region")?.toString();
	const birthday = formData.get("birthday")?.toString();
	const { error } = await supabase.auth.updateUser({
		data: {
			username,
			region,
			birthday,
		},
	});

	if (error) {
		return error.message;
	}
	throw redirect("/");
}, "updateUserAction");

export const resetPasswordAction = action(async (formData) => {
	const email = formData.get("email")?.toString();
	const { error } = await supabase.auth.resetPasswordForEmail(email, {
		options: {
			redirectTo: `${window.location.origin}/auth`,
		},
	});
	if (error) {
		return error.message;
	}
	throw redirect("/auth");
}, "resetPasswordAction");

export const signInWithDiscord = action(async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'discord',
    options: {
      redirectTo: 'http://localhost:5173',
    },
  })
  if (error) console.error(error)
}, "signInWithDiscordAction");

export const signInWithGoogle = action(async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'http://localhost:5173',
    },
  })
  if (error) console.error(error)
}, "signInWithGoogleAction");


export const fetchResults = async ({ q, genres, sort_by, sort_order }) => {
    const { data, error } = await supabase.rpc('search_content', {
      search_query: q || null,
      filter_genres: genres.length ? genres : null,
      sort_by,
      sort_order
    })
    if (error) throw error
	console.log(data)
    return data
}

export const fetchGenres = async () => {
    const { data, error } = await supabase.rpc('get_genres')
    if (error) throw error
    return data
}

export const addBookmark = async (comic, group = 'Saved') => {
	const id = comic.id;
	const { data: { user } } = await supabase.auth.getUser()
	const bookmark = { id, group, user_id: user.id }
	const { data, error } = await supabase.from('albums').upsert(bookmark).select();
	if (error) throw error
	return data
}

export const removeBookmark = async (id) => {
	const { data: { user } } = await supabase.auth.getUser()
	const { error } = await supabase.from('albums').delete().eq('id', id).eq('user_id', user.id)
	if (error) throw error
}