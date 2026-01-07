import Sidebar from "../components/main_components/sidebar";
import PostAuthHeader from "../components/main_components/postauth_header";
import BottomPlayer from "../components/main_components/bottom_player";
import RightPanel from "../components/main_components/right_panel";

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
   return (
    <div className="flex flex-col h-screen overflow-hidden">
      <PostAuthHeader />
      <div className="flex flex-1 overflow-hidden pt-16 pb-24">
        <Sidebar />
        <main className="flex-1 ml-48 mr-64 overflow-y-auto">
          {children}
        </main>
        <RightPanel />
      </div>
      <BottomPlayer />
    </div>
  );
}