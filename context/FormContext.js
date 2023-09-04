import { createContext, useContext, useState } from "react";

export const FormContext = createContext(null);

export function FormProvider({ children }) {
    const [ isVisible, setIsVisible ] = useState(false);
    const [ title, setTitle ] = useState('');
    const [description, setDescription ] = useState('');
    const [priority, setPriority ] = useState(0);
    const [ mode, setMode ] = useState('');

    return (
        <FormContext.Provider value={{
        useIsVisible:{isVisible, setIsVisible},
        useTitle:{title, setTitle},
        useDescription:{description, setDescription},
        usePriority:{priority, setPriority},
        useMode:{mode, setMode}
        }}>
            { children }
        </FormContext.Provider>
    );
}

export function useMode() {
    const context = useContext(FormContext)["useMode"];
    if(context) {
        return context;
    }
}

export function useIsVisible() {
    const context = useContext(FormContext)["useIsVisible"];
    if(context) {
        return context;
    }
}

export function useTitle() {
    const context = useContext(FormContext)["useTitle"];
    if(context) {
        return context;
    }
}

export function useDescription() {
    const context = useContext(FormContext)["useDescription"];
    if(context) {
        return context;
    }
}

export function usePriority() {
    const context = useContext(FormContext)["usePriority"];
    if(context) {
        return context;
    }
}