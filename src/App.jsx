import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";

import { Provider } from "react-redux";
import appStore from "./redux/appStore";
import Connections from "./components/Connections/index.jsx";
import Requests from "./components/Requests";
import Settings from "./components/Settings";
import ProtectedRoute from "./components/ProtectedRoute";
import Messages from "./components/Messages/index.jsx";
import Premium from "./components/Premium/index.jsx";
import PaymentSuccess from "./components/Premium/PaymentSuccess.jsx";
import PaymentCancel from "./components/Premium/PaymentCancel.jsx";
import DeveloperProfile from "./components/DeveloperProfile/index.jsx";
import Feed from "./components/Feed/index.jsx";
import ErrorPage from "./components/ErrorPage.jsx";

const App = () => {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter
          basename="/"
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/payment/success" element={<PaymentSuccess />} />
              <Route path="/payment/cancel" element={<PaymentCancel />} />
              <Route path="/login" element={<Login />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Feed />} />
                <Route path="/profile" element={<Profile />} />
                <Route
                  path="/developer/:toUserId"
                  element={<DeveloperProfile />}
                />
                <Route path="/messages" element={<Messages />} />
                <Route path="/connections" element={<Connections />} />
                <Route path="/requests" element={<Requests />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/premium" element={<Premium />} />
              </Route>
              <Route path="*" element={<ErrorPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
};

export default App;
