import { Poppins, Mulish, Inter, Lato } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Load the fonts
export const poppins = Poppins({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const lato = Lato({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const mulish = Mulish({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});
export const inter = Inter({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

// Create a theme instance
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: poppins.style.fontFamily,
    h5: {
      fontFamily: mulish.style.fontFamily,
      fontWeight: 600,
    },
    h1: {
      fontFamily: inter.style.fontFamily,
      fontWeight: 700,
      fontSize: "30px",
      lineHeight: "52px",
    },
    body2: {
      fontFamily: mulish.style.fontFamily,
    },
  },
});

export default theme;
