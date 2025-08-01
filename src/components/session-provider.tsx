import { SessionProvider as Provider } from "next-auth/react";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  session?: any; // optionally fix this too if you want
};

const SessionProvider = ({ children, session }: Props) => {
  return <Provider session={session}>{children}</Provider>;
};

export default SessionProvider;
