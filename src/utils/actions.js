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
