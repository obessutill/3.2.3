// @vitest-environment jsdom
import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MantineProvider } from '@mantine/core';
import "@mantine/core/styles.css"

import Launches2020 from './pages/Launches2020';

const mockLaunches = [
    {
        mission_name: "Starlink-15",
        launch_year: "2020",
        details: "Some details",
        links: {
            mission_patch_small: "https://example.com/small.png",
            mission_patch: "https://example.com/large.png"
        },
        rocket: { rocket_name: "Falcon 9" },
    },
    {
        mission_name: "Crew Dragon Demo-2",
        launch_year: "2020",
        details: null,
        links: {
            mission_patch_small: null,
            mission_patch: null,
        },
        rocket: { rocket_name: "Falcon 9" },
    },
];

function mockFetchOk(data: unknown) {
    return vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => data,
    });
}

function mockFetchError(status = 500) {
    return vi.fn().mockResolvedValue({
        ok: false,
        status,
        json: async () => ({})
    })
}

function renderWithProviders(ui: React.ReactNode) {
    return render(<MantineProvider defaultColorScheme='light'>{ui}</MantineProvider>)
}

beforeEach(() => {
    vi.restoreAllMocks();

    const mr = document.getElementById("modal-root");
    if (mr) mr.innerHTML = "";
});

describe("Launches2020", () => {
    it("успешная загрузка, показывает карточки и кнопки See more", async () => {
        vi.stubGlobal("fetch", mockFetchOk(mockLaunches));

        renderWithProviders(<Launches2020 />);

        expect(await screen.findByText("Starlink-15")).toBeInTheDocument();
        expect(screen.getByText("Crew Dragon Demo-2")).toBeInTheDocument();

        const buttons = screen.getAllByRole("button", { name: /see more/i });
        expect(buttons.length).toBeGreaterThanOrEqual(2);
    });

    it("открывает модалку по клику на See more", async () => {
        vi.stubGlobal("fetch", mockFetchOk(mockLaunches));

        renderWithProviders(<Launches2020 />);

        await screen.findByText("Starlink-15");

        fireEvent.click(screen.getAllByRole("button", { name: /see more/i })[0]);

        const dialog = await screen.findByRole("dialog");
        expect(dialog).toBeInTheDocument();

        const modal = within(dialog);
        expect(modal.getAllByText("Starlink-15").length).toBeGreaterThan(0);
        expect(modal.getByText(/Falcon 9/i)).toBeInTheDocument();
    });

    it("закрывается модалка по Escape", async () => {
        vi.stubGlobal("fetch", mockFetchOk(mockLaunches));

        renderWithProviders(<Launches2020 />);

        await screen.findByText(/Starlink-15/i);
        fireEvent.click(screen.getAllByRole("button", { name: /see more/i })[0]);
        expect(await screen.findByRole("dialog")).toBeInTheDocument();

        fireEvent.keyDown(window, { key: "Escape" });
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("при ошибке загрузки показывает ошибку", async () => {
        vi.stubGlobal("fetch", mockFetchError(500));

        renderWithProviders(<Launches2020 />);

        const err = await screen.findByText(/http/i);
        expect(err).toBeInTheDocument();
    });
});