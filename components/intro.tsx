
import Container from "./container";
import Link from "next/link";

export default function Intro({ onReset }) {
  return (
    <Container>
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="uppercase text-xl md:text-xl font-bold tracking-tighter leading-tight md:pr-8">
        <div className="cursor-pointer" onClick={onReset}>Tiny Shiny Cook Book</div>
      </h1>
      <h4 className="text-center md:text-left text-lg md:pl-8 text-white/50">

       Hand picked dishes from best chefs on the web
      </h4>
    </section>
    </Container>
  );
}
