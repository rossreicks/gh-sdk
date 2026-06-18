import { defineConfig } from "vitepress";

export default defineConfig({
    base: "/gh-sdk/",
    title: "gh-sdk",
    description: "A Node SDK for GitHub CLI.",
    head: [
        ["link", { rel: "icon", href: "/gh-sdk/favicon.ico" }],
        ["link", { rel: "icon", href: "/gh-sdk/android-chrome-192x192.png" }],
        ["link", { rel: "icon", href: "/gh-sdk/android-chrome-512x512.png" }],
        ["link", { rel: "icon", href: "/gh-sdk/apple-touch-icon.png" }],
        ["link", { rel: "icon", href: "/gh-sdk/favicon-16x16.png" }],
        ["link", { rel: "icon", href: "/gh-sdk/favicon-32x32.png" }],
    ],
    themeConfig: {
        logo: "/logo.svg",
        search: {
            provider: "local",
        },
        nav: [
            { text: "Home", link: "/" },
            { text: "Guide", link: "/guide/getting-started" },
            { text: "Reference", link: "/reference/pull-requests" },
        ],
        sidebar: [
            {
                text: "Guide",
                items: [
                    { text: "Getting Started", link: "/guide/getting-started" },
                    { text: "Typed Fields", link: "/guide/typed-fields" },
                    { text: "Errors", link: "/guide/errors" },
                ],
            },
            {
                text: "Reference",
                items: [
                    { text: "Pull Requests", link: "/reference/pull-requests" },
                    { text: "Repositories", link: "/reference/repositories" },
                ],
            },
        ],
        socialLinks: [{ icon: "github", link: "https://github.com/rossreicks/gh-sdk" }],
    },
});
