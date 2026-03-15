"use client"

import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { WhyUs } from "@/components/why-us"
import { Gallery } from "@/components/gallery"
import { Team } from "@/components/team"
import { Testimonials } from "@/components/testimonials"
import { BeforeAfter } from "@/components/before-after"
import { Booking } from "@/components/booking"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <WhyUs />
      <Gallery />
      <BeforeAfter />
      <Team />
      <Testimonials />
      <Booking />
      <Contact />
      <Footer />
    </main>
  )
}
