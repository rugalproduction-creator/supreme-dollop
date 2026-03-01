/* @refresh reload */
import { render } from 'solid-js/web'
import './index.css'
import App from './App.jsx'

const root = document.getElementById('root')

render(() => (
    <div className='bg-black text-white h-screen w-screen flex items-center justify-center'>
        <App />
    </div>
), root)
