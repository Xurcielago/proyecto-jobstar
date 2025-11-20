import { AppRouter } from "./router/AppRouter";
import { BrowserRouter } from "react-router";

export const App = () => {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
};
