// Enhanced Hero Slider
class HeroSlider {
  constructor() {
    this.slides = document.querySelectorAll(".slide")
    this.indicators = document.querySelectorAll(".indicator")
    this.prevBtn = document.querySelector(".prev")
    this.nextBtn = document.querySelector(".next")
    this.currentSlide = 0
    this.slideInterval = null

    this.init()
  }

  init() {
    this.startAutoSlide()
    this.bindEvents()
  }

  bindEvents() {
    this.prevBtn.addEventListener("click", () => this.prevSlide())
    this.nextBtn.addEventListener("click", () => this.nextSlide())

    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => this.goToSlide(index))
    })

    // Pause on hover
    const slider = document.querySelector(".hero-slider")
    slider.addEventListener("mouseenter", () => this.pauseAutoSlide())
    slider.addEventListener("mouseleave", () => this.startAutoSlide())
  }

  showSlide(index) {
    this.slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index)
    })

    this.indicators.forEach((indicator, i) => {
      indicator.classList.toggle("active", i === index)
    })
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length
    this.showSlide(this.currentSlide)
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length
    this.showSlide(this.currentSlide)
  }

  goToSlide(index) {
    this.currentSlide = index
    this.showSlide(this.currentSlide)
    this.resetAutoSlide()
  }

  startAutoSlide() {
    this.slideInterval = setInterval(() => this.nextSlide(), 5000)
  }

  pauseAutoSlide() {
    clearInterval(this.slideInterval)
  }

  resetAutoSlide() {
    this.pauseAutoSlide()
    this.startAutoSlide()
  }
}

// Enhanced Testimonials Carousel
class TestimonialCarousel {
  constructor() {
    this.testimonials = document.querySelectorAll(".testimonial")
    this.prevBtn = document.querySelector(".testimonial-prev")
    this.nextBtn = document.querySelector(".testimonial-next")
    this.currentTestimonial = 0
    this.testimonialInterval = null

    this.init()
  }

  init() {
    this.startAutoRotate()
    this.bindEvents()
  }

  bindEvents() {
    this.prevBtn.addEventListener("click", () => this.prevTestimonial())
    this.nextBtn.addEventListener("click", () => this.nextTestimonial())

    // Pause on hover
    const carousel = document.querySelector(".testimonial-carousel")
    carousel.addEventListener("mouseenter", () => this.pauseAutoRotate())
    carousel.addEventListener("mouseleave", () => this.startAutoRotate())
  }

  showTestimonial(index) {
    this.testimonials.forEach((testimonial, i) => {
      testimonial.classList.toggle("active", i === index)
    })
  }

  nextTestimonial() {
    this.currentTestimonial = (this.currentTestimonial + 1) % this.testimonials.length
    this.showTestimonial(this.currentTestimonial)
  }

  prevTestimonial() {
    this.currentTestimonial = (this.currentTestimonial - 1 + this.testimonials.length) % this.testimonials.length
    this.showTestimonial(this.currentTestimonial)
  }

  startAutoRotate() {
    this.testimonialInterval = setInterval(() => this.nextTestimonial(), 4000)
  }

  pauseAutoRotate() {
    clearInterval(this.testimonialInterval)
  }
}

// Enhanced FAQ Functionality
class FAQ {
  constructor() {
    this.faqItems = document.querySelectorAll(".faq-item")
    this.init()
  }

  init() {
    this.faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question")
      question.addEventListener("click", () => this.toggleFAQ(item))
    })
  }

  toggleFAQ(item) {
    const isActive = item.classList.contains("active")

    // Close all FAQ items
    this.faqItems.forEach((faqItem) => {
      faqItem.classList.remove("active")
    })

    // Open clicked item if it wasn't active
    if (!isActive) {
      item.classList.add("active")
    }
  }
}

// Enhanced Contact Form
class ContactForm {
  constructor() {
    this.form = document.querySelector(".contact-form")
    this.statusElement = document.querySelector(".form-status")
    this.submitBtn = document.querySelector(".submit-btn")
    this.loader = document.querySelector(".btn-loader")

    this.init()
  }

  init() {
    this.form.addEventListener("submit", (e) => this.handleSubmit(e))
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
      // Simulate API call
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
    const { name, email, message } = data

    if (!name.trim() || !email.trim() || !message.trim()) {
      this.showStatus("Please fill out all required fields.", "error")
      return false
    }

    if (!this.isValidEmail(email)) {
      this.showStatus("Please enter a valid email address.", "error")
      return false
    }

    return true
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  setLoading(loading) {
    this.submitBtn.disabled = loading
    this.loader.style.display = loading ? "inline-block" : "none"
    this.submitBtn.querySelector("span").textContent = loading ? "Sending..." : "Send Message"
  }

  showStatus(message, type) {
    this.statusElement.textContent = message
    this.statusElement.className = `form-status ${type}`
    this.statusElement.style.display = "block"

    setTimeout(() => {
      this.statusElement.style.display = "none"
    }, 5000)
  }

  async simulateSubmission(data) {
    // Simulate network delay
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate 90% success rate
        if (Math.random() > 0.1) {
          resolve(data)
        } else {
          reject(new Error("Network error"))
        }
      }, 1500)
    })
  }
}

// Mobile Navigation
class MobileNav {
  constructor() {
    this.toggle = document.querySelector(".mobile-menu-toggle")
    this.menu = document.querySelector(".nav-menu")
    this.init()
  }

  init() {
    this.toggle.addEventListener("click", () => this.toggleMenu())
  }

  toggleMenu() {
    this.menu.classList.toggle("active")
    this.toggle.classList.toggle("active")
  }
}

// Smooth Scrolling for Navigation Links
class SmoothScroll {
  constructor() {
    this.init()
  }

  init() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault()
        const target = document.querySelector(anchor.getAttribute("href"))
        if (target) {
          const offsetTop = target.offsetTop - 80 // Account for fixed navbar
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          })
        }
      })
    })
  }
}

// Navbar Scroll Effect
class NavbarScroll {
  constructor() {
    this.navbar = document.querySelector(".navbar")
    this.init()
  }

  init() {
    window.addEventListener("scroll", () => this.handleScroll())
  }

  handleScroll() {
    if (window.scrollY > 100) {
      this.navbar.style.background = "rgba(255, 255, 255, 0.98)"
      this.navbar.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.15)"
    } else {
      this.navbar.style.background = "rgba(255, 255, 255, 0.95)"
      this.navbar.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.1)"
    }
  }
}

// Initialize all components when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new HeroSlider()
  new TestimonialCarousel()
  new FAQ()
  new ContactForm()
  new MobileNav()
  new SmoothScroll()
  new NavbarScroll()
})

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded")
})
