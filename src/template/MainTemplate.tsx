import { Box } from "@mantine/core";
import { Outlet } from "react-router-dom";
import Header from "components/Header";

const MainTemplate = () => {
  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <Header></Header>
      {/* Body */}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default MainTemplate;
