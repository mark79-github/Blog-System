import {useEffect} from "react";

const useOutsideClick = (ref, callback) => {
    useEffect(() => {
        const handlePointerDown = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                callback();
            }
        };

        document.addEventListener("pointerdown", handlePointerDown);

        return () => {
            document.removeEventListener("pointerdown", handlePointerDown);
        };
    }, [ref, callback]);
};

export default useOutsideClick;