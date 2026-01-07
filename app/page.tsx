import Header from "@/components/webinar/header"
import Hero from "@/components/webinar/hero"
import Benefits from "@/components/webinar/benefits"
import Speaker from "@/components/webinar/speaker"
import Schedule from "@/components/webinar/schedule"
import CTA from "@/components/webinar/cta"
import Footer from "@/components/webinar/footer"

export default function Home() {
  return (
    <main className="w-full">
      <Header />
      <Hero />
      <Benefits />
      <Speaker />
      <Schedule />
      <CTA />
      <Footer />
    </main>
  )
}
