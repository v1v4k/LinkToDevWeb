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
import MfaVerify from "./components/MfaVerify";
import ProtectedRoute from "./components/ProtectedRoute";
import MfaProtectedRoute from "./components/MfaProtectedRoute";
import Messages from "./components/messages/Messages";
import Premium from "./components/payments/Premium";
import PaymentSuccess from "./components/payments/PaymentSuccess";
import PaymentCancel from "./components/payments/PaymentCancel";

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
              <Route path="/login" element={<Login />} />
              <Route path="/mfa" element={<MfaVerify />} />
              <Route path="/payment/success" element={<PaymentSuccess />} />
              <Route path="/payment/cancel" element={<PaymentCancel />} />
              <Route element={<ProtectedRoute />}>
                <Route element={<MfaProtectedRoute />}>
                  <Route path="/" element={<Feed />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/messages" element={<Messages />} />
                  <Route path="/connections" element={<Connections />} />
                  <Route path="/requests" element={<Requests />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/premium" element={<Premium />} />
                </Route>
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
};

export default App;
