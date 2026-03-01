
import { createSignal } from 'solid-js';

export default function Input(props){
    const [isFilled, setIsFilled] = createSignal(false);
    const [isFocused, setIsFocused] = createSignal(false);

    const handleInput = (e) => {
        setIsFilled(e.target.value.length > 0);
        if (props.onChange) {
            props.onChange(e.target.value);
        }
    };

    const handleBlur = (e) => {
        setIsFocused(false);
        if (!e.target.value) {
            setIsFilled(false);
        }
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    return(
        <div className="relative">
            <input 
                id={props.id} 
                type={props.type} 
                name={props.name} 
                autoComplete="true" 
                className="peer outline-none border border-solid border-white-100 w-full rounded-md px-8 py-2 my-2"
                onInput={handleInput}
                onBlur={handleBlur}
                onFocus={handleFocus}
            />
            <label 
                htmlFor={props.id} 
                className={`flex flex-row gap-x-2 text-white-300 absolute left-2 scale-90 transform transition-all duration-700 delay-200 ease-in-out ${
                    isFilled() || isFocused() ? '-top-4' : 'top-1/2 -translate-y-1/2'
                }`}
            >
                <props.icon/> {props.label}
            </label>
        </div>
    )
}