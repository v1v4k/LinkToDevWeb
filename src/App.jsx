import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Feed from "./components/Feed";
import { Provider } from "react-redux";
import appStore from "./redux/appStore";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Settings from "./components/Settings";
import ProtectedRoute from "./components/ProtectedRoute";
import Messages from "./components/messages/Messages";
import Premium from "./components/payments/Premium";
import PaymentSuccess from "./components/payments/PaymentSuccess";
import PaymentCancel from "./components/payments/PaymentCancel";
import ThemeToggle from "./components/ThemeToggle";

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
                <Route path="/messages" element={<Messages />} />
                <Route path="/connections" element={<Connections />} />
                <Route path="/requests" element={<Requests />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/premium" element={<Premium />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
};

export default App;
