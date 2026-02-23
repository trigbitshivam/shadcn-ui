import "./App.css";
import { AppSidebar } from "./components/sidebar/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { NavigationMenuDemo } from "./components/navigation/Navbar";
import { CardDemo } from "./components/card/card";
import { CarouselDemo } from "./components/carousel/carousel";
import { ThemeProvider } from "./components/dark/theme-provider";
import { Route, Routes } from "react-router-dom";
import UserList from "./components/user/userlist";

function App() {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <ThemeProvider>
          <main className="flex-1 min-h-screen overflow-x-hidden">
            <NavigationMenuDemo />
            <SidebarTrigger />

            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <CardDemo />
                    <CarouselDemo />
                  </>
                }
              />

              <Route path="/users" element={<UserList />} />
            </Routes>
          </main>
        </ThemeProvider>
      </SidebarProvider>
    </>
  );
}

export default App;
