import Image from "next/image";
import { Navbar } from "@/components/navbar";
import type { PersonaPortfolio } from "@/types/portfolio";

type SeccionPortadaProps = {
  nombrePersona: PersonaPortfolio["fullName"];
};

export function SeccionPortada({ nombrePersona }: SeccionPortadaProps) {
  return (
    <section id="intro-cover" className="intro-cover" aria-label="Foto de la costa">
      <Navbar personName={nombrePersona} />
      <Image
        src="/WhatsApp%20Image%202026-03-24%20at%2020.04.02.jpeg"
        alt="Paisaje costero de Miramar"
        fill
        priority
        sizes="100vw"
        className="intro-cover-image"
      />
      <div className="intro-cover-overlay" aria-hidden="true" />
    </section>
  );
}
