document.addEventListener("DOMContentLoaded", function () {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
  
    // Animate each section
    gsap.utils.toArray("section").forEach((section, index) => {
      // Set initial styles for the section (hidden by default)
      gsap.set(section, { opacity: 0, y: 50 });
  
      // Create a timeline for the section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section, // Trigger animation when the section enters the viewport
          start: "top 80%", // Start animation when the top of the section is 80% from the top of the viewport
          end: "bottom 20%", // End animation when the bottom of the section is 20% from the top of the viewport
          toggleActions: "play none none reverse", // Play animation on enter, reverse on leave
        },
      });
  
      // Add animations to the timeline
      tl.to(section, {
        opacity: 1,
        y: 0,
        duration: 1, // Animation duration
        ease: "power2.out", // Smooth easing
      });
  
      // Add additional animations for specific sections
      if (section.id === "prices-section") {
        tl.from(".input-group", {
          opacity: 0,
          x: -50,
          stagger: 0.2, // Stagger animations for each input group
        });
      }
  
      if (section.id === "about") {
        tl.from(".social-icons-container", {
          opacity: 0,
          y: 50,
          stagger: 0.1, // Stagger animations for social icons
        });
      }
  
      if (section.id === "contact") {
        tl.from(".form-box", {
          opacity: 0,
          y: 50,
          duration: 1.5,
          ease: "elastic.out(1, 0.75)", // Fun elastic effect
        });
      }
    });
  });