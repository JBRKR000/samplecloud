import AlertProvider from "../(lib)/api/contextAPI";
import { AlertDisplay } from "../components/other/alert_display";  

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
   return (
    <>
      <AlertProvider>
        <AlertDisplay />
        {children}
      </AlertProvider>
    </>
  );
}