import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login';
import useToken from './hooks/useToken';

import 'antd/dist/reset.css';
import NotFoundPage from './pages/Dashboard/NotFoundPage';

function App() {
  const { token, setToken } = useToken();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login setToken={setToken} />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          {token && (
            <>
              <Route path="/dashboard/*" element={<Dashboard />} />
            </>
          )}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;