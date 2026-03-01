import { A } from '@solidjs/router'
import { CircleUserRoundIcon, KeyRoundIcon, MailIcon, CakeIcon, FlagIcon } from 'lucide-solid'
import Input from '#ui/Input.jsx'
import GoogleSignInButton from '#ui/GoogleSignInButton.jsx'
import DiscordSignInButton from '#ui/DiscordSignInButton.jsx'
import { createUserAction } from "#utils/actions"

export default function Register(){
    return(
        <div className="flex justify-between w-full h-screen overflow-hidden">
            <div className="relative top-1/2 -translate-y-[40%] left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 w-full max-w-150 lg:w-1/3 px-6 pb-24 overflow-y-scroll">
                <h1 className="text-4xl font-bold text-center text-white-300">Welcome Newbie!</h1>
                <p className="text-xs text-white-200 text-center pt-4">Already have an account? <A href="/auth" className="text-orange-400">Sign in</A></p>
                <form action={createUserAction} method="post" className="flex flex-col gap-4 w-full pt-4">
                    <GoogleSignInButton onClick={() => console.log('Google Sign In clicked')} />
                    <DiscordSignInButton onClick={() => console.log('Discord Sign In clicked')} />
                    <div className="w-full border border-b border-white-200/40"></div>
                    <small className="text-xs text-white-300 text-center">or</small>
                    <Input type="text" name="username" id="username" label="Username" icon={CircleUserRoundIcon}/>
                    <Input type="date" name="birthday" id="birthday" label="" icon={CakeIcon}/>
                    <Input type="text" name="region" id="region" label="Region" icon={FlagIcon}/>
                    <Input type="email" name="email" id="email" label="Email" icon={MailIcon}/>
                    <Input type="text" name="password" id="password" label="Password" icon={KeyRoundIcon} password/>
                    <button className="w-full py-2 rounded-md mt-4 border border-solid border-orange-400 bg-orange-300/40 text-orange-400 cursor-pointer hover:bg-orange-200">Login</button>
                </form>
            </div>
            <img src={asset('/auth.jpg')} alt="Authentication visual backdrop featuring a professional or welcoming environment for user login" className="w-0 h-0 lg:w-2/3 lg:h-full object-cover" />
        </div>
    )
}