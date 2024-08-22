import Alert from "./alert";
import Footer from "./footer";
import Meta from "./meta";
import Intro from "./intro";

export default function Layout({ preview, children }) {
  return (
    <>
      <Meta />
      <Intro />
      <div className="min-h-screen bg-black text-white">
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
}
