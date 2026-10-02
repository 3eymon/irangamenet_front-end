import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Store from "./pages/Store";
import Register from "./pages/Register";
import About from "./pages/About";
import Games from "./pages/Games";
import Streamers from "./pages/Streamers";
import Layout from "./ui/Layout";
import Prodoct from "./features/Store/Prodoct";
import News from "./pages/News";
import SinglePage from "./features/Games/SinglePage";
import GamesFilter from "./features/Games/GamesFilter";
import { Toaster } from "react-hot-toast";
import GameNets from "./pages/GameNets";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import SingleGameNets from "./features/GameNets/SingleGameNets";
import NotFound from "./ui/NotFound";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "./ui/Navbar";
import AuthLayout from "./ui/AuthLayout";
import AuthPage from "./features/authentication/AuthPage";
import CompleteProfile from "./features/authentication/CompleteProfile";
import CheckOTP from "./features/authentication/CheckOTP";
function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <div className="relative container text-white  min-h-screen ">
        <Toaster />
        <ThemeProvider theme={THEME}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="store/:id" element={<Prodoct />} />
              <Route path="store" element={<Store />} />
              <Route path="news" element={<News />} />
              <Route path="news/:id" element={<div>single new</div>} />
              <Route path="register" element={<Register />} />
              <Route path="about" element={<About />} />
              <Route path="games" element={<Games />} />
              <Route path="games/page/:id" element={<SinglePage />} />
              <Route path="games/:id" element={<GamesFilter />} />
              <Route path="streamers" element={<Streamers />} />
              <Route path="auth" element={<AuthLayout />}>
                <Route index element={<AuthPage />} />
                <Route path="login" element={<AuthPage />} />
                <Route path="check-otp" element={<CheckOTP />} />
                <Route path="complete-profile" element={<CompleteProfile />} />
              </Route>
              <Route path="gameNet" element={<GameNets />} />
              <Route path="gameNet/:id" element={<SingleGameNets />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ThemeProvider>
      </div>
    </QueryClientProvider>
  );
}

export default App;
const THEME = createTheme({
  typography: {
    fontFamily: "Peyda-light",
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});
