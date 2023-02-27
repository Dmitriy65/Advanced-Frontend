import {
    ReactNode, useEffect, useState, useRef,
} from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
    children?: ReactNode;
    element?: HTMLElement
}

export const Portal = (props: PortalProps) => {
    const { children, element = document.body } = props;
    const ref = useRef();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        ref.current = document.querySelector('#root');
        setMounted(true);
    }, []);

    return mounted && ref.current ? createPortal(children, element) : null;
};
