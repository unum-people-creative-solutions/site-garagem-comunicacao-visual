import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { Services } from "@/components/Services";
import { Workflow } from "@/components/Workflow";
import { Contact } from "@/components/Contact";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { LeadModal } from "@/components/LeadModal";
import { WhatsAppFloatingButton } from "@/components/WhatsAppFloatingButton";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <BeforeAfterSlider />
      <Services />
      <Workflow />
      <Contact />
      <FAQ />
      <Footer />
      
      <LeadModal />
      <WhatsAppFloatingButton />
    </main>
  );
}
