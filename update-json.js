const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, 'data', 'ananya.json');
let data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

const sections = data.AnanyaMakeup.sections;

sections.MakeupStats = {
  variants: {
    AnanyaMakeupStats1: {
      id: "makeup-stats",
      image: { src: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=2000&q=80", alt: "Makeup brushes and cosmetics" },
      stats: [
        { value: "500+", label: "Happy Clients", icon: "FaRegSmileBeam" },
        { value: "350+", label: "Makeup Sessions", icon: "FaRegCalendarCheck" },
        { value: "10+", label: "Years of Experience", icon: "FaUsers" },
        { value: "50+", label: "Bridal Makeups", icon: "FaAward" },
        { value: "100+", label: "Premium Brands Used", icon: "GiLipstick" }
      ]
    }
  }
};

sections.WhyChooseUs = {
  variants: {
    AnanyaWhyChooseUs1: {
      id: "why-choose-us",
      images: {
        large: { src: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=1000&q=80", alt: "Bride with elegant makeup and jewellery" },
        small: { src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80", alt: "Makeup artist applying blush with a brush" }
      },
      eyebrow: "Why Choose Us",
      title: "Makeup will make you ",
      titleHighlight: "feel confident",
      description: "We believe makeup is more than just beauty – it’s a way to express your personality and feel your best on every occasion. With professional skills, premium products and a client-focused approach, we ensure you look and feel confident, always.",
      features: [
        { title: "Expert Skills", text: "Professional techniques for flawless and long-lasting results.", icon: "FaPaintBrush" },
        { title: "Premium Products", text: "We use high-quality, skin-friendly and trusted cosmetics.", icon: "FaGem" },
        { title: "Personalized Approach", text: "Customized looks as per your style, skin type and occasion.", icon: "FaUserFriends" },
        { title: "Flexible Scheduling", text: "Easy appointment booking to suit your convenience.", icon: "FaRegCalendarAlt" }
      ]
    }
  }
};

sections.Faq = {
  variants: {
    AnanyaFaq1: {
      id: "faq",
      eyebrow: "FAQ",
      title: "Frequently Asked ",
      titleHighlight: "Questions",
      description: "Find answers to some of the most common questions about our makeup services, bookings, packages and more.",
      leftFaqs: [
        { question: "How early should I book my makeup?", answer: "We recommend booking at least 1-3 months in advance, especially for bridal makeup, to ensure your preferred date and time are available. For peak wedding seasons, early booking is highly recommended." },
        { question: "Do you offer bridal makeup at the venue?", answer: "Yes, we travel to your home, hotel or wedding venue. Travel charges may apply depending on the location, and we will confirm them when you book." },
        { question: "What brands and products do you use?", answer: "We use only premium, skin-friendly and trusted international brands. If you have allergies or a favourite product, let us know and we will plan your look around it." },
        { question: "How long does bridal makeup last?", answer: "With our long-lasting HD and airbrush techniques and a proper setting routine, your makeup stays fresh and flawless for 10-12 hours. We also provide a touch-up kit for the day." },
        { question: "Do you provide a trial session?", answer: "Yes, we offer a pre-bridal trial so you can finalize your look, try different styles and share feedback well before the big day. Trial charges can be adjusted in the final package." },
        { question: "What brands and products do you use?", answer: "We use only premium, skin-friendly and trusted international brands. If you have allergies or a favourite product, let us know and we will plan your look around it." }
      ],
      rightFaqs: [
        { question: "Can I customize a package?", answer: "Absolutely. Every package can be tailored to your style, outfit, theme and budget. Tell us what you need and we will create a custom plan for you." },
        { question: "Do you offer makeup for engagement, reception and party events?", answer: "Yes, we offer dedicated packages for engagement, reception, pre-wedding shoots and parties, along with our bridal makeup services." },
        { question: "Is airbrush makeup suitable for everyone?", answer: "Airbrush makeup suits most skin types and gives a lightweight, flawless finish. During your consultation we will check your skin and recommend the best option for you." },
        { question: "How long does a makeup session take?", answer: "A party look usually takes about 45-60 minutes, while a full bridal look with hair styling and draping can take 2-3 hours. We plan the timing around your event schedule." },
        { question: "Do you provide hair styling and draping?", answer: "Yes, hair styling and saree / lehenga draping are included in most of our packages, or can be added to any package on request." },
        { question: "What is your cancellation or rescheduling policy?", answer: "You can reschedule your booking with advance notice, subject to availability. Cancellation terms depend on how close the date is, and the details are shared when you confirm your booking." },
        { question: "What is included in the bridal package?", answer: "Our bridal package includes HD bridal makeup, hair styling and draping, false lashes, a touch-up kit and a pre-bridal consultation." }
      ]
    }
  }
};

sections.MakeupPackages = {
  variants: {
    AnanyaMakeupPackages1: {
      id: "makeup-packages",
      eyebrow: "Our Packages",
      title: "Makeup ",
      titleHighlight: "Packages",
      description: "Choose from our specially curated makeup packages designed to make you look stunning for every occasion. Each package is customized to match your style, theme and requirements, ensuring a flawless and long-lasting look.",
      highlights: [
        { label: "Premium Quality Products", icon: "FaGem" },
        { label: "Customized as per Your Style", icon: "FaLeaf" },
        { label: "Professional Makeup Artist", icon: "FaFemale" },
        { label: "Long-Lasting & Flawless Finish", icon: "MdOutlineVerifiedUser" }
      ],
      image: {
        src: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=80",
        alt: "Bride with elegant makeup, jewellery and floral hairstyle"
      }
    }
  }
};

sections.MakeupPricing = {
  variants: {
    AnanyaMakeupPricing1: {
      id: "makeup-pricing",
      ctaLabel: "Book Now",
      ctaHref: "/contact",
      packages: [
        { title: "Bridal Makeup Package", price: "₹ 25,000", image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80", features: ["HD Bridal Makeup", "Hair Styling & Draping", "Saree / Lehenga Draping", "False Lashes", "Makeup Touch-up Kit", "Pre Bridal Consultation"] },
        { title: "Engagement Makeup Package", price: "₹ 15,000", image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80", features: ["HD Makeup", "Hair Styling", "Outfit Draping", "Premium Products", "Makeup Touch-up Kit", "Personalized Consultation"] },
        { title: "Party Makeup Package", price: "₹ 8,000", image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=800&q=80", features: ["Party / Event Makeup", "Hair Styling", "Makeup Touch-up Kit", "False Lashes (Optional)", "Long-Lasting Finish", "Quick Consultation"] },
        { title: "Reception Makeup Package", price: "₹ 12,000", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80", features: ["HD Reception Makeup", "Hair Styling & Draping", "Premium Makeup Products", "Makeup Touch-up Kit", "Personalized Look", "Consultation Included"] },
        { title: "Pre-Wedding Makeup Package", price: "₹ 10,000", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80", features: ["HD Makeup", "Hair Styling", "Outfit Styling Support", "Premium Products", "Long-Lasting Finish", "Makeup Touch-up Kit"] },
        { title: "Airbrush Makeup Package", price: "₹ 18,000", image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80", features: ["Airbrush Makeup", "Hair Styling & Draping", "Premium International Products", "Flawless & Lightweight Finish", "Makeup Touch-up Kit", "Consultation Included"] }
      ]
    }
  }
};

fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
console.log('Successfully updated ananya.json');
