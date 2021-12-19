import { PropsWithChildren } from "react";
import Toolbar from "./Toolbar";

const MainLayout = ({ children }: PropsWithChildren<any>) => {
  return (
    <div>
      <Toolbar />
      {children}
    </div>
  );
};

export default MainLayout;
