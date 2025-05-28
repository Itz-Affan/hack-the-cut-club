// === Hero Image Slider ===
let currentSlide = 0
const slides = document.querySelectorAll(".slide")
const totalSlides = slides.length

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.display = i === index ? "block" : "none"
  })
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides
  showSlide(currentSlide)
}

function previousSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides
  showSlide(currentSlide)
}

document.querySelector(".next").addEventListener("click", nextSlide)
document.querySelector(".prev").addEventListener("click", previousSlide)

setInterval(nextSlide, 5000) // Auto slide every 5 seconds
showSlide(currentSlide)

// === Testimonials Carousel ===
let testimonialIndex = 0
const testimonials = document.querySelectorAll(".testimonial")

function showTestimonial(index) {
  testimonials.forEach((testimonial, i) => {
    testimonial.style.display = i === index ? "block" : "none"
  })
}

function nextTestimonial() {
  testimonialIndex = (testimonialIndex + 1) % testimonials.length
  showTestimonial(testimonialIndex)
}

setInterval(nextTestimonial, 4000) // Auto change testimonial
showTestimonial(testimonialIndex)

// === FAQ Accordion ===
const faqs = document.querySelectorAll(".faq-question")

faqs.forEach((faq) => {
  faq.addEventListener("click", () => {
    faq.classList.toggle("active")
    const answer = faq.nextElementSibling
    answer.style.display = answer.style.display === "block" ? "none" : "block"
  })
})

// === Contact Form Validation and Submission ===
class ContactForm {
  constructor(formSelector, statusSelector) {
    this.form = document.querySelector(formSelector)
    this.statusBox = document.querySelector(statusSelector)
    this.init()
  }

  init() {
    if (this.form) {
      this.form.addEventListener("submit", (e) => this.handleSubmit(e))
    }
  }

  async handleSubmit(e) {
    e.preventDefault()

    const formData = new FormData(this.form)
    const data = {
      name: formData.get("name") || document.querySelector(".form-name").value,
      email: formData.get("email") || document.querySelector(".form-email").value,
      subject: formData.get("subject") || document.querySelector(".form-subject").value,
      message: formData.get("message") || document.querySelector(".form-message").value,
    }

    // Validation
    if (!this.validateForm(data)) {
      return
    }

    this.setLoading(true)

    try {
      await this.submitToBackend(data) // ✅ Send to backend
      this.showStatus("Message sent successfully! We'll get back to you soon.", "success")
      this.form.reset()
    } catch (error) {
      this.showStatus("Something went wrong. Please try again.", "error")
    } finally {
      this.setLoading(false)
    }
  }

  validateForm(data) {
    const { name, email, subject, message } = data
    if (!name || !email || !subject || !message) {
      this.showStatus("Please fill in all fields.", "error")
      return false
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      this.showStatus("Invalid email address.", "error")
      return false
    }
    return true
  }

  async submitToBackend(data) {
    const apiBaseUrl = "https://hack-the-cut-club.onrender.com" // Replace with your actual backend URL

    const response = await fetch(`${apiBaseUrl}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error("Failed to send message")
    }

    return response.json()
  }

  setLoading(isLoading) {
    const submitButton = this.form.querySelector("button[type='submit']")
    submitButton.disabled = isLoading
    submitButton.textContent = isLoading ? "Sending..." : "Send Message"
  }

  showStatus(message, type) {
    if (this.statusBox) {
      this.statusBox.textContent = message
      this.statusBox.className = `form-status ${type}`
      this.statusBox.style.display = "block"
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new ContactForm("#contact-form", ".form-status")
})
