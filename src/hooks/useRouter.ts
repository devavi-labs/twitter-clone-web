import { History } from "history";
import { CreateQuackModalState } from "../components/CreateQuackModal";

export const useRouter = (history: History<unknown>) => {
  const pushHomePage = () => history.push("/home", { from: history.location });
  const replaceHomePage = () =>
    history.replace("/home", { from: history.location });

  const pushLoginPage = () =>
    history.push("/login", { from: history.location });
  const replaceLoginPage = () =>
    history.replace("/login", { from: history.location });

  const openSignupModal = () =>
    history.push("/i/flow/signup", {
      from: history.location,
      background: history.location,
    });

  const openDisplaySettingsModal = () =>
    history.push("/i/display", {
      from: history.location,
      background: history.location,
    });

  const openComposeQuackModal = (state?: CreateQuackModalState) =>
    history.push("/compose/quack", {
      ...state,
      from: history.location,
      background: history.location,
    });

  return {
    pushHomePage,
    replaceHomePage,
    pushLoginPage,
    replaceLoginPage,
    openSignupModal,
    openDisplaySettingsModal,
    openComposeQuackModal,
  };
};
