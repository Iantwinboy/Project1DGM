"use strict";
const { useState, FC, ReactNode, ReactElement, useContext } = React;
const defaultCardContext = {
    children: [],
    variant: "default"
};
const CardContext = React.createContext(defaultCardContext);
const useCardContext = () => {
    const context = useContext(CardContext);
    if (!context) {
        throw new Error(`Card compound components cannot be rendered outside the CardGroup component`);
    }
    return context;
};
const CardGroup = ({ children, variant = "default" }) => {
    return (React.createElement(CardContext.Provider, { value: { children, variant } },
        React.createElement("div", { className: "rounded-lg bg-white shadow-lg overflow-hidden" }, children)));
};
const Image = ({ src }) => {
    const { variant } = useCardContext();
    return (React.createElement("div", { className: `shrink-0 ${variant === "default" ? "opacity-100" : "opacity-50"}` },
        React.createElement("img", { className: "h-48 w-full object-cover", src: src, alt: "" })));
};
const Title = ({ children }) => {
    const { variant } = useCardContext();
    return (React.createElement("p", { className: `m-3 text-xl font-semibold ${variant === "default" ? "text-gray-900" : "text-gray-500"}` }, children));
};
const Text = ({ children }) => {
    return React.createElement("p", { className: `"text-gray-500 m-3 text-base` }, children);
};
CardGroup.Image = Image;
CardGroup.Title = Title;
CardGroup.Text = Text;
const App = () => {
    const IMAGE_URL = "https://s.studiobinder.com/wp-content/uploads/2021/12/Walking-into-the-abyss-in-Blade-Runner-2049-·-Blade-Runner-2049-Cinematography.jpg";
    return (React.createElement("div", { className: "bg-gray-200 h-screen p-10" },
        React.createElement("div", { className: "mx-auto grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4" },
            React.createElement(CardGroup, null,
                React.createElement(CardGroup.Image, { src: IMAGE_URL }),
                React.createElement(CardGroup.Title, null, "Title"),
                React.createElement(CardGroup.Text, null, "FILLER")),
            React.createElement(CardGroup, null,
                React.createElement(CardGroup.Title, null, "Image on the bottom"),
                React.createElement(CardGroup.Text, null,
                    "Go ahead and put your image somewhere else",
                    " "),
                React.createElement(CardGroup.Image, { src: IMAGE_URL })),
            React.createElement(CardGroup, { variant: "yellow" },
                React.createElement(CardGroup.Title, null, "Image in the middle"),
                React.createElement(CardGroup.Image, { src: IMAGE_URL }),
                React.createElement(CardGroup.Text, null, "I think I have made the point by now. This is very flexible! Also, this one has a different variant passed from the context.")),
            React.createElement(CardGroup, null,
                React.createElement(CardGroup.Image, { src: IMAGE_URL }),
                React.createElement(CardGroup.Title, null, "Add other components"),
                React.createElement(CardGroup.Text, null, "You can also add whatever other component"),
                React.createElement("div", null,
                    React.createElement("button", { className: "text-indigo-500 p-4 hover:text-indigo-800" }, "Go somewhere"))))));
};
ReactDOM.render(React.createElement(App, null), document.getElementById("app"));