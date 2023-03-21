import { useState , useEffect } from 'react'
import '@/styles/globals.css'
import "../styles/style.scss";
// React top loading bar
import LoadingBar from 'react-top-loading-bar'
import { useRouter } from 'next/router';
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'


export default function App({ Component, pageProps }) {


  const router = useRouter();

  //  react top loading bar
  const [progress, setProgress] = useState(0)
  const [user, setUser] = useState({value: null})
  const [key, setKey] = useState(0)

  //  Use Effect for retain same items in shopping Cart
  useEffect(() => {
    router.events.on('routeChangeStart', ()=>{
      setProgress(75);
    });
    router.events.on('routeChangeComplete', ()=>{
      setProgress(100);
    }, []);

  let myUser = JSON.parse(localStorage.getItem("myUser"));
  if( myUser ){
    setUser({value: myUser.token , email: myUser.email, name: myUser.name });
    setKey(Math.random());
  }

  }, [router.query])


  // Logout function
  const logout = ()=>{
    localStorage.removeItem("myUser");
    setUser({value:null});
    setKey(Math.random());
    router.push(`${process.env.NEXT_PUBLIC_HOST}/login`);
  }


  return <>

    <Navbar key={key} user={user} logout={logout}/>
    <LoadingBar color='#0800FF' height={3} progress={progress} waitingTime={300} onLoaderFinished={() => setProgress(0)}/>  
    <Component {...pageProps} />
    <Footer/>
  
  </>
}
