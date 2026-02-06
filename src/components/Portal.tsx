import { createPortal } from "react-dom";

export default function Portal({ children, targetId = 'modal-root' }: { children: React.ReactNode; targetId?: string }) {
    const target = document.getElementById(targetId);
    if (!target) return null;
    return createPortal(children, target)    
}