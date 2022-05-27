module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    darkMode: false,
    theme: {
        extend: {
            colors: {
                warning: "#ffda79",
                primary_color: "#1B9CFC",
                form_bg: "#f5f6fa",
                danger_color: "#fc5c65",
                success_color: "#26de81",
            },
            fontFamily: {
                monserrat: ["Monserrat"],
                monserratBold: ["Monserrat-Bold"],
            },
            screens: {
                exsm: { max: "400px" },
                esm: { max: "640px" },
            },
        },
    },
    plugins: [],
};