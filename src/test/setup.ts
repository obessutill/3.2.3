import "@testing-library/jest-dom/vitest";

if (!document.getElementById("modal-root")) {
    const el = document.createElement("div");
    el.id = "modal-root";
    document.body.appendChild(el)
}

Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
        mathes: false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
    })
})