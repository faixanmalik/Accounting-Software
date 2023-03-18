import '@/styles/globals.css'
import FullLayout from "../../src/pannel/layouts/FullLayout";
import "../styles/style.scss";
import { ProSidebarProvider } from 'react-pro-sidebar';


export default function App({ Component, pageProps }) {
  return <>
  

    <ProSidebarProvider>
      <FullLayout>
        <Component {...pageProps} />
      </FullLayout>
    </ProSidebarProvider>
  
  </>
}
