import "./App.css";
import { AppSidebar } from "./components/sidebar/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { NavigationMenuDemo } from "./components/navigation/Navbar";
import { CardDemo } from "./components/card/card";
import { CarouselDemo } from "./components/carousel/carousel";

function App() {
  return (
    <SidebarProvider>
      <AppSidebar />

      <main className=" flex-1 min-h-screen overflow-x-hidden">
        <NavigationMenuDemo />
        <SidebarTrigger />
        <CardDemo />
        <CarouselDemo />
      </main>
    </SidebarProvider>
  );
}

export default App;
