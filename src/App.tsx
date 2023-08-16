import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loader from "./components/Loader";
import { useActions } from "./hooks/useActions";
import Auth from "./pages/Auth/Auth";
import Drive from "./pages/Drive/Drive";
import { useAppSelector } from "./store";

const App = () => {
  const { user, isLoading } = useAppSelector(state => state.auth);
  const { auth } = useActions();

  useEffect(() => {
    auth();
  }, []);

  if (isLoading && localStorage.getItem("token"))
    return <Loader />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <Drive user={user} /> : <Auth />} />
        <Route path="/:id" element={user ? <Drive user={user} /> : <Auth />} />
        <Route path="/trash" element={user ? <Drive user={user} /> : <Auth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;