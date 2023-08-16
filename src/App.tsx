import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Loader from "./components/Loader/Loader";
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

  // TODO: оптимизировать
  // TODO: доделать бек
  // TODO: всплывающие подсказки, например о входе
  // TODO: о создании папки и т.д.
  // TODO: окно с прогрессом загрузки и скачивания файлов
  // TODO: если нет файлов и папок, то что-нибудь вывести

  if (isLoading && localStorage.getItem("token"))
    return <></>

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={user ? <Navigate to="/" /> : <Auth /> } />
        <Route path="/:id?" element={user ? <Drive user={user} isTrash={false} /> : <Navigate to="/auth" />} />
        <Route path="/trash/:id?" element={user ? <Drive user={user} isTrash={true} /> : <Navigate to="/auth" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;