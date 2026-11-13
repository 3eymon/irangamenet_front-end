import { Route, Routes } from "react-router-dom";
import About from "./pages/about";
import Games from "./pages/games";
import Streamers from "./pages/streamers";
import Layout from "./components/layout/Layout";
import SinglePage from "./pages/games/detail";
import { Toaster } from "react-hot-toast";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import Navbar from "./components/layout/Navbar";
import AuthLayout from "./components/layout/AuthLayout";
import AuthPage from "./pages/auth";
import CompleteProfile from "./pages/auth/complete-profile";
import VerifyOTP from "./pages/auth/verify-otp";
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
import Profile from "./pages/profile";
import ProfileLayout from "./components/layout/ProfileLayout";
import SavedGames from "./pages/profile/saved-games";
import Favorites from "./pages/profile/favorites";
import GameCenters from "./pages/game-centers";
TimeAgo.addDefaultLocale(fa);
const toastStyle: React.CSSProperties = {
  background: "rgba(24, 24, 32, 0.92)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  color: "#f5f3ff",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  borderRadius: "12px",
  padding: "12px 16px",
  fontSize: "14px",
  fontWeight: 500,
  boxShadow: "0 8px 30px rgba(0, 0, 0, 0.25)",
};

const toastOptions = {
  duration: 3500,
  style: toastStyle,

  success: {
    iconTheme: {
      primary: "#a78bfa",
      secondary: "#181820",
    },
    style: {
      borderColor: "rgba(167, 139, 250, 0.4)",
    },
  },

  error: {
    iconTheme: {
      primary: "#fb7185",
      secondary: "#181820",
    },
    style: {
      borderColor: "rgba(251, 113, 133, 0.4)",
    },
  },

  loading: {
    iconTheme: {
      primary: "#c4b5fd",
      secondary: "#181820",
    },
  },
};
function App() {
  return (
    <>
      <Navbar />
      <div className="container relative min-h-screen text-white">
        <Toaster
          position="bottom-left"
          gutter={8}
          toastOptions={toastOptions}
        />
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
              <Route path="/profile" element={<ProfileLayout />}>
                <Route index element={<Profile />} />
                <Route path="saved" element={<SavedGames />} />
                <Route path="favorites" element={<Favorites />} />
              </Route>
              {/* Game Centers Routes */}
              <Route path="game-centers" element={<GameCenters />} />
              {/* <Route path="game-centers/:id" element={<SingleGameCenter />} /> */}

              {/* ------ */}
              <Route path="streamers" element={<Streamers />} />
              <Route path="about" element={<About />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ThemeProvider>
      </div>
    </>
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
