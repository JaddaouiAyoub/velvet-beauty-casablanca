"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/context/language-context"
import { useState } from "react"
import { Calendar, User, Phone, Mail, MessageSquare, Sparkles, Send } from "lucide-react"

export function Booking() {
  const { t, isRTL } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    date: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
    setFormData({
      name: "",
      phone: "",
      email: "",
      service: "",
      date: "",
      message: "",
    })
  }

  const services = [
    { value: "cut", label: t.booking.services_list.cut },
    { value: "brushing", label: t.booking.services_list.brushing },
    { value: "coloring", label: t.booking.services_list.coloring },
    { value: "balayage", label: t.booking.services_list.balayage },
    { value: "bridal", label: t.booking.services_list.bridal },
    { value: "cleansing", label: t.booking.services_list.cleansing },
    { value: "hydration", label: t.booking.services_list.hydration },
    { value: "anti_aging", label: t.booking.services_list.anti_aging },
  ]

  return (
    <section id="booking" className="py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Rendez-vous
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t.booking.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.booking.subtitle}
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="bg-card rounded-3xl p-8 border border-border shadow-sm">
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Name */}
              <div className="relative">
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t.booking.form.name}
                </label>
                <div className="relative">
                  <User className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground ${isRTL ? "right-4" : "left-4"}`} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={`w-full px-12 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all ${isRTL ? "text-right" : "text-left"}`}
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="relative">
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t.booking.form.phone}
                </label>
                <div className="relative">
                  <Phone className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground ${isRTL ? "right-4" : "left-4"}`} />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+212 6 XX XX XX XX"
                    className={`w-full px-12 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all ${isRTL ? "text-right" : "text-left"}`}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="relative">
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t.booking.form.email}
                </label>
                <div className="relative">
                  <Mail className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground ${isRTL ? "right-4" : "left-4"}`} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`w-full px-12 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all ${isRTL ? "text-right" : "text-left"}`}
                  />
                </div>
              </div>

              {/* Service */}
              <div className="relative">
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t.booking.form.service}
                </label>
                <div className="relative">
                  <Sparkles className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground ${isRTL ? "right-4" : "left-4"}`} />
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className={`w-full px-12 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all appearance-none ${isRTL ? "text-right" : "text-left"}`}
                  >
                    <option value="">{t.booking.form.select_service}</option>
                    {services.map((service) => (
                      <option key={service.value} value={service.value}>
                        {service.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date */}
              <div className="relative sm:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t.booking.form.date}
                </label>
                <div className="relative">
                  <Calendar className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground ${isRTL ? "right-4" : "left-4"}`} />
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className={`w-full px-12 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all ${isRTL ? "text-right" : "text-left"}`}
                  />
                </div>
              </div>

              {/* Message */}
              <div className="relative sm:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t.booking.form.message}
                </label>
                <div className="relative">
                  <MessageSquare className={`absolute top-4 w-5 h-5 text-muted-foreground ${isRTL ? "right-4" : "left-4"}`} />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className={`w-full px-12 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none ${isRTL ? "text-right" : "text-left"}`}
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-8 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-all disabled:opacity-70 flex items-center justify-center gap-2"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : isSubmitted ? (
                "Merci !"
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  {t.booking.form.submit}
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
