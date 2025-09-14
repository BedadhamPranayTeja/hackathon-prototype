import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import ThemeToggle from "@/components/ThemeToggle";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Discover from "@/pages/Discover";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import MyHackathons from "@/pages/MyHackathons";
import Teams from "@/pages/Teams";
import Chat from "@/pages/Chat";
import Submissions from "@/pages/Submissions";
import Leaderboard from "@/pages/Leaderboard";
import Profile from "@/pages/Profile";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/discover" component={Discover} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/my-hackathons" component={MyHackathons} />
      <Route path="/teams" component={Teams} />
      <Route path="/chat" component={Chat} />
      <Route path="/submissions" component={Submissions} />
      <Route path="/leaderboard" component={Leaderboard} />
      <Route path="/profile" component={Profile} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Custom sidebar width for hackathon management application
  const style = {
    "--sidebar-width": "18rem", // 288px for better navigation
    "--sidebar-width-icon": "4rem", // default icon width
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SidebarProvider style={style as React.CSSProperties}>
          <div className="flex h-screen w-full">
            <AppSidebar />
            <div className="flex flex-col flex-1">
              <header className="flex items-center justify-between p-4 border-b">
                <SidebarTrigger data-testid="button-sidebar-toggle" />
                <ThemeToggle />
              </header>
              <main className="flex-1 overflow-auto">
                <Router />
              </main>
            </div>
          </div>
        </SidebarProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
