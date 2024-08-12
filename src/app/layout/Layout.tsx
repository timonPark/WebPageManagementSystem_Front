import SignInButton from "@/app/components/SignInButton";
import {Footer} from "@/app/components/Footer";
import Header from "@/app/components/Header";


const Layout: React.FC = () => {
  return (
    <div>
      <Header></Header>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1 className="text-5xl font-semibold">AWESOME-BRO</h1>
        <SignInButton/>

      </main>
      <Footer></Footer>
    </div>
  )
}

export default Layout;