// === Page Navigation System ===
function showPage(pageId) {
  // Hide all pages
  const pages = document.querySelectorAll(".page")
  pages.forEach((page) => {
    page.style.display = "none"
  })

  // Show the selected page
  const targetPage = document.getElementById(pageId + "-page")
  if (targetPage) {
    targetPage.style.display = "block"
  }

  // Scroll to top
  window.scrollTo(0, 0)

  // Update active nav links
  updateActiveNavLink(pageId)
}

function updateActiveNavLink(activePageId) {
  // Remove active class from all nav links
  const navLinks = document.querySelectorAll(".nav-link")
  navLinks.forEach((link) => {
    link.classList.remove("active")
  })

  // Add active class to current page link
  const activeLink = document.querySelector(`[onclick="showPage('${activePageId}')"]`)
  if (activeLink) {
    activeLink.classList.add("active")
  }
}

// === Enhanced Hero Image Slider ===
let currentSlide = 0
const slides = document.querySelectorAll(".slide")
const indicators = document.querySelectorAll(".indicator")
const totalSlides = slides.length

function showSlide(index) {
  // Hide all slides
  slides.forEach((slide, i) => {
    slide.classList.remove("active")
  })

  // Show current slide
  if (slides[index]) {
    slides[index].classList.add("active")
  }

  // Update indicators
  indicators.forEach((indicator, i) => {
    indicator.classList.toggle("active", i === index)
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

// Event listeners for navigation buttons
document.addEventListener("DOMContentLoaded", () => {
  const nextBtn = document.querySelector(".next")
  const prevBtn = document.querySelector(".prev")

  if (nextBtn) nextBtn.addEventListener("click", nextSlide)
  if (prevBtn) prevBtn.addEventListener("click", previousSlide)

  // Indicator click events
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      currentSlide = index
      showSlide(currentSlide)
    })
  })

  // Auto slide every 5 seconds
  setInterval(nextSlide, 5000)
  showSlide(currentSlide)
})

// === Enhanced Testimonials Carousel ===
let testimonialIndex = 0
const testimonials = document.querySelectorAll(".testimonial")

function showTestimonial(index) {
  testimonials.forEach((testimonial, i) => {
    testimonial.classList.remove("active")
  })

  if (testimonials[index]) {
    testimonials[index].classList.add("active")
  }
}

function nextTestimonial() {
  testimonialIndex = (testimonialIndex + 1) % testimonials.length
  showTestimonial(testimonialIndex)
}

function previousTestimonial() {
  testimonialIndex = (testimonialIndex - 1 + testimonials.length) % testimonials.length
  showTestimonial(testimonialIndex)
}

// Testimonial navigation
document.addEventListener("DOMContentLoaded", () => {
  const testimonialNext = document.querySelector(".testimonial-next")
  const testimonialPrev = document.querySelector(".testimonial-prev")

  if (testimonialNext) testimonialNext.addEventListener("click", nextTestimonial)
  if (testimonialPrev) testimonialPrev.addEventListener("click", previousTestimonial)

  // Auto change testimonial every 4 seconds
  setInterval(nextTestimonial, 4000)
  showTestimonial(testimonialIndex)
})

// === Enhanced FAQ Accordion ===
document.addEventListener("DOMContentLoaded", () => {
  const faqQuestions = document.querySelectorAll(".faq-question")

  faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
      const faqItem = question.parentElement
      const answer = question.nextElementSibling
      const icon = question.querySelector(".faq-icon")

      // Toggle active state
      faqItem.classList.toggle("active")

      // Update icon
      if (faqItem.classList.contains("active")) {
        icon.textContent = "−"
      } else {
        icon.textContent = "+"
      }
    })
  })
})

// === Enhanced Contact Form ===
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
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    }

    // Validation
    if (!this.validateForm(data)) {
      return
    }

    this.setLoading(true)

    try {
      // Simulate form submission (replace with actual backend call)
      await this.simulateSubmission(data)
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

  async simulateSubmission(data) {
    // Simulate API call delay
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Form submitted:", data)
        resolve()
      }, 1000)
    })
  }

  setLoading(isLoading) {
    const submitButton = this.form.querySelector("button[type='submit']")
    const buttonText = submitButton.querySelector("span")
    const loader = submitButton.querySelector(".btn-loader")

    submitButton.disabled = isLoading

    if (isLoading) {
      buttonText.textContent = "Sending..."
      loader.style.display = "inline-block"
    } else {
      buttonText.textContent = "Send Message"
      loader.style.display = "none"
    }
  }

  showStatus(message, type) {
    if (this.statusBox) {
      this.statusBox.textContent = message
      this.statusBox.className = `form-status ${type}`
      this.statusBox.style.display = "block"

      // Hide status after 5 seconds
      setTimeout(() => {
        this.statusBox.style.display = "none"
      }, 5000)
    }
  }
}

// === Mobile Menu Toggle ===
document.addEventListener("DOMContentLoaded", () => {
  const mobileToggle = document.querySelector(".mobile-menu-toggle")
  const navMenu = document.querySelector(".nav-menu")

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active")
      mobileToggle.classList.toggle("active")
    })
  }

  // Initialize contact form
  new ContactForm("#contact-form", ".form-status")

  // Show home page by default
  showPage("home")
})

// === Smooth Scrolling for Anchor Links ===
document.addEventListener("DOMContentLoaded", () => {
  const anchorLinks = document.querySelectorAll('a[href^="#"]')

  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href")
      if (href !== "#") {
        e.preventDefault()
        const target = document.querySelector(href)
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
      }
    })
  })
})
