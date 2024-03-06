import { useEffect } from "react";
import excludedRoutes from "../../constants/excluded-routes";
import { useGetMe } from "../../hooks/useGetMe";
import { authenticatedVar } from "../../constants/authenticated";
import { snackVar } from "../../constants/snack";
import { UNKNOWN_ERROR_SNACK_MESSAGE } from "../../constants/errors";
import { usePath } from "../../hooks/usePath";

interface GuardProps {
  children: JSX.Element;
}

const Guard = ({ children }: GuardProps) => {
  // const { data: user, error } = useGetMe();
  const me = useGetMe();
  const { path } = usePath();

  useEffect(() => {
    if (me.me) {
      authenticatedVar(true);
    }
  }, [me.me]);

  useEffect(() => {
    if (me.error?.networkError) {
      snackVar(UNKNOWN_ERROR_SNACK_MESSAGE);
    }
  }, [me.error]);

  return <>{excludedRoutes.includes(path) ? children : me.me && children}</>;
};

export default Guard;
