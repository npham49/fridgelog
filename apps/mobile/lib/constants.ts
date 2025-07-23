export const NAV_THEME = {
  light: {
    background: "hsl(0 0% 100%)", // background
    border: "hsl(240 5.9% 90%)", // border
    card: "hsl(0 0% 100%)", // card
    notification: "hsl(0 84.2% 60.2%)", // destructive
    primary: "hsl(240 5.9% 10%)", // primary
    text: "hsl(240 10% 3.9%)", // foreground
  },
  dark: {
    background: "hsl(240 10% 3.9%)", // background
    border: "hsl(240 3.7% 15.9%)", // border
    card: "hsl(240 10% 3.9%)", // card
    notification: "hsl(0 72% 51%)", // destructive
    primary: "hsl(0 0% 98%)", // primary
    text: "hsl(0 0% 98%)", // foreground
  },
};

export const exampleData = [
  {
    id: 1,
    icon: "🥛",
    name: "Milk",
    expirationDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    quantity: 1,
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    icon: "🥚",
    name: "Eggs",
    expirationDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
    quantity: 1,
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    icon: "🍞",
    name: "Bread",
    expirationDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
    quantity: 1,
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    icon: "🧀",
    name: "Cheese",
    expirationDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1),
    quantity: 1,
    imageUrl: "https://via.placeholder.com/150",
  },
];
