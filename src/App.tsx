import { Route, Routes } from "react-router-dom";
import About from "./pages/about";
import Games from "./pages/games";
import Streamers from "./pages/streamers";
import Layout from "./components/layout/Layout";
import SinglePage from "./pages/games/detail";
import { Toaster } from "react-hot-toast";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "./components/layout/Navbar";
import AuthLayout from "./components/layout/AuthLayout";
import AuthPage from "./pages/auth";
import CompleteProfile from "./pages/auth/complete-profile";
import VerifyOTP from "./pages/auth/verify-otp";
import { isNotFoundError } from "./utils/isNotFoundErr";
import NotFound from "./components/NotFound";
import GameCategory from "./pages/games/category";
import GameDiscovery from "./pages/games/discover";
import TimeAgo from "javascript-time-ago";
import "swiper/css/effect-coverflow";
import "swiper/css";
import fa from "javascript-time-ago/locale/fa";
import News from "./pages/news";
import NewsDiscovery from "./pages/news/discover";
import NewsCategory from "./pages/news/category";
import NewsPage from "./pages/news/detail";
import Home from "./pages/home";
import { ProtectedRoute } from "./components/ProtectedRoute";
TimeAgo.addDefaultLocale(fa);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) =>
        !isNotFoundError(error) && failureCount < 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <div className="relative container text-white  min-h-screen ">
        <Toaster />
        <ThemeProvider theme={THEME}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />

              {/* News Routes */}
              <Route path="news" element={<News />} />
              <Route path="news/discover" element={<NotFound />} />
              <Route path="news/category" element={<NotFound />} />
              <Route path="news/:slug" element={<NewsPage />} />
              <Route path="news/discover/:filter" element={<NewsDiscovery />} />
              <Route path="news/category/:slug" element={<NewsCategory />} />

              {/* Games Routes */}
              <Route path="games" element={<Games />} />
              <Route path="games/discover" element={<NotFound />} />
              <Route path="games/category" element={<NotFound />} />
              <Route path="games/:id" element={<SinglePage />} />
              <Route
                path="games/discover/:filter"
                element={<GameDiscovery />}
              />
              <Route path="games/category/:slug" element={<GameCategory />} />

              {/* Auth Routes */}
              <Route path="auth" element={<AuthLayout />}>
                <Route index element={<AuthPage />} />
                <Route path="verify-otp" element={<VerifyOTP />} />
                <Route path="complete-profile" element={<CompleteProfile />} />
              </Route>

              {/* User Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/profile" element={<>profile </>} />
                <Route path="/dashboard" element={<>dashboard</>} />
              </Route>
              {/* Game Centers Routes */}
              {/* <Route path="game-centers" element={<GameCenters />} />
              <Route path="game-centers/:id" element={<SingleGameCenter />} /> */}

              {/* ------ */}
              <Route path="streamers" element={<Streamers />} />
              <Route path="about" element={<About />} />
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
