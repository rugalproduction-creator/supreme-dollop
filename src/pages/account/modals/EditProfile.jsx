import { createSignal, onMount } from "solid-js";
import Input from "#ui/Input";
import { UserIcon } from "lucide-solid";
import TextArea from "#ui/TextArea";

export default function EditProfile({user, onClose, onSave}){
    const [username, setUsername] = createSignal(user.username || '')
    const [name, setName] = createSignal(user.name || '')
    const [bioText, setBioText] = createSignal((user.bio || []).join('\n'))

    onMount(()=>{
        const el = document.getElementById('edit-username')
        el && el.focus()
    })

    const save = ()=>{
        const updated = {
            ...user,
            username: username(),
            name: name(),
            bio: bioText().split('\n').map(l=>l.trim()).filter(Boolean)
        }
        onSave && onSave(updated)
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black-100/20" onClick={()=>onClose && onClose()}>
            <div className="w-full max-w-2xl bg-black-300 rounded-2xl shadow-2xl overflow-hidden" onClick={(e)=>e.stopPropagation()}>

                <header className="flex items-center justify-between px-6 py-4 bg-prussian-blue-600">
                    <div className="flex items-center gap-3">
                        <div className="w-1 h-8 bg-orange-500 rounded" />
                        <h3 className="text-white text-lg font-semibold">Edit profile</h3>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="text-white/80 hover:text-white bg-prussian-blue-500 px-2 py-1 cursor-pointer rounded-md" aria-label="Close" onClick={()=>onClose && onClose()}>✕</button>
                    </div>
                </header>

                <div className="px-6 py-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1 flex flex-col items-center gap-4">
                        <div className="p-1 rounded-full bg-linear-to-tr from-orange-500 to-prussian-blue-700">
                            <img src={user.avatar} alt="avatar" className="w-28 h-28 rounded-full object-cover border-2 border-white-400" />
                        </div>
                        <div className="text-sm text-prussian-blue-700 text-center">Profile photo (preview)</div>
                    </div>

                    <div className="md:col-span-2 space-y-4">
                        <label className="block text-sm">
                            <div className="mb-1 font-medium text-prussian-blue-700">Username</div>
                            <Input id="username" type="text" name="username" value={username()} onChange={setUsername} label="Username" icon={UserIcon} className=""/>
                        </label>

                        <label className="block text-sm">
                            <div className="mb-1 font-medium text-prussian-blue-700">Name</div>
                            <Input id="name" type="text" name="name" value={name()} onChange={setName} label="Name" icon={UserIcon} className=""/>
                        </label>

                        <label className="block text-sm">
                            <div className="mb-1 font-medium text-prussian-blue-700">Bio</div>
                            <TextArea id="bio" value={bioText()} onChange={setBioText} label="Bio" icon={UserIcon} className=""/>
                            <div className="text-xs text-alabaster-grey-300">Separate lines are preserved as individual bio items.</div>
                        </label>
                    </div>
                </div>

                <footer className="px-6 py-4 flex justify-end gap-3">
                    <button className="px-4 py-2 rounded-lg text-white-400 bg-alabaster-grey-100 hover:bg-alabaster-grey-200 cursor-pointer" onClick={()=>onClose && onClose()}>Cancel</button>
                    <button className="px-6 py-2 rounded-lg text-white bg-orange-500/40 border border-solid border-orange-600 hover:bg-orange-400 cursor-pointer" onClick={save}>Save</button>
                </footer>
            </div>
        </div>
    )
}
