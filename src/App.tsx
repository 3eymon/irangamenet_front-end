import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import Games from "./pages/games";
import Streamers from "./pages/streamers";
import Layout from "./components/layout/Layout";
import News from "./pages/news";
import SinglePage from "./pages/games/detail";
import { Toaster } from "react-hot-toast";
import GameCenters from "./pages/game-centers";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import SingleGameCenter from "./pages/game-centers/detail";
import NotFound from "./components/layout/NotFound";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "./components/layout/Navbar";
import AuthLayout from "./components/layout/AuthLayout";
import AuthPage from "./pages/auth";
import CompleteProfile from "./pages/auth/complete-profile";
import CheckOTP from "./pages/auth/check-otp";
import SingleNews from "./pages/news/detail";
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
              <Route path="news" element={<News />} />
              <Route path="news/:id" element={<SingleNews />} />
              <Route path="about" element={<About />} />

              <Route path="games" element={<Games />} />
              <Route path="games/:id" element={<SinglePage />} />

              <Route path="streamers" element={<Streamers />} />
              <Route path="auth" element={<AuthLayout />}>
                <Route index element={<AuthPage />} />
                <Route path="login" element={<AuthPage />} />
                <Route path="check-otp" element={<CheckOTP />} />
                <Route path="complete-profile" element={<CompleteProfile />} />
              </Route>
              <Route path="game-centers" element={<GameCenters />} />
              <Route path="game-centers/:id" element={<SingleGameCenter />} />
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
