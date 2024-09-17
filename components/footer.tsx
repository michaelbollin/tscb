import Container from "./container";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="">
      <Container>
        <div className="py-28 flex flex-col lg:flex-row items-center">
         
          <div className="flex flex-col lg:flex-row items-center lg:w-1/2">
          <span>TINY SHINY COOK BOOK &copy; {new Date().getFullYear()}</span>
           <Link href="/privacy" className="mx-4">Privacy Policy</Link>
           <Link href="/terms">Terms of Service</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
