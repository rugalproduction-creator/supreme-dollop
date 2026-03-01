import { A, useAction } from '@solidjs/router'
import { CircleUserRoundIcon, KeyRoundIcon } from 'lucide-solid'
import Input from '#ui/Input.jsx'
import GoogleSignInButton from '#ui/GoogleSignInButton.jsx'
import DiscordSignInButton from '#ui/DiscordSignInButton.jsx'
import { signInUserAction, signInWithDiscord, signInWithGoogle } from "#utils/actions"

export default function Login(){
    const signInWithDiscordAction = useAction(signInWithDiscord);
    const signInWithGoogleAction = useAction(signInWithGoogle);

    return(
        <div className="flex justify-between w-full h-screen overflow-hidden">
            <div className="relative top-1/2 -translate-y-[40%] left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 w-full max-w-150 lg:w-1/3 px-6">
                <h1 className="text-4xl font-bold text-center text-white-300">Welcome Back!</h1>
                <p className="text-xs text-white-200 text-center pt-4">Don't have an account? <A href="register" className="text-orange-400">Sign up</A></p>
                <GoogleSignInButton onClick={() => signInWithGoogleAction()} />
                <DiscordSignInButton onClick={() => signInWithDiscordAction()} />
                <form action={signInUserAction} method="post" className="flex flex-col gap-4 w-full pt-4">
                    <div className="w-full border border-b border-white-200/40"></div>
                    <small className="text-xs text-white-300 text-center">or</small>
                    <Input type="email" name="email" id="email" label="Email / Username" icon={CircleUserRoundIcon}/>
                    <div className="relative">
                        <Input type="text" name="password" id="password" label="Password" icon={KeyRoundIcon} password/>
                        <p className="py-1 text-orange-200 text-xs absolute -bottom-1/2 right-0 font-roboto font-medium">Forgot password?</p>
                    </div>
                    <button className="w-full py-2 rounded-md mt-4 border border-solid border-orange-400 bg-orange-300/40 text-orange-400 cursor-pointer hover:bg-orange-200">Login</button>
                </form>
            </div>
            <img src="/auth.png" alt="Authentication visual backdrop featuring a professional or welcoming environment for user login" className="w-0 h-0 lg:w-2/3 lg:h-full object-cover" />
        </div>
    )
}