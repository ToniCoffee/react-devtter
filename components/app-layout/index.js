import ClientPortal from 'components/client-portal';
import Portal from 'components/portal';
import { globalStyles } from './styles';

export default function AppLayout({ children }) {
  return (
    <>
      <main id='root'>{children}</main>
      <ClientPortal selector='#root'>
        <Portal />
      </ClientPortal>
      <style jsx global>{globalStyles}</style>
    </>
  );
}