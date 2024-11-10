import ReactDom from "react-dom";

export default function Modal({ children, handleCloseModal }) {
    return ReactDom.createPortal(
        <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center p-1">
            <button
                title="Close"
                onClick={handleCloseModal}
                className="absolute z-40 w-full bg-neutral-900 opacity-50 [inset:0]"
            />
            <div className="modal-content relative z-50 min-h-64 w-full max-w-lg rounded bg-white px-8 pb-8 pt-4 dark:bg-slate-700">
                {children}
            </div>
        </div>,
        document.getElementById("portal"),
    );
}
