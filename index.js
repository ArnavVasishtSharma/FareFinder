document.addEventListener("DOMContentLoaded", function () {
    
    gsap.registerPlugin(ScrollTrigger);
  
    
    gsap.utils.toArray("section").forEach((section, index) => {
      
      gsap.set(section, { opacity: 0, y: 50 });
  
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section, 
          start: "top 80%", 
          end: "bottom 20%", 
          toggleActions: "play none none reverse", 
        },
      });
  
      
      tl.to(section, {
        opacity: 1,
        y: 0,
        duration: 1, 
        ease: "power2.out", 
      });
  
      
      if (section.id === "prices-section") {
        tl.from(".input-group", {
          opacity: 0,
          x: -50,
          stagger: 0.2, 
        });
      }
  
      if (section.id === "about") {
        tl.from(".social-icons-container", {
          opacity: 0,
          y: 50,
          stagger: 0.1, 
        });
      }
  
      if (section.id === "contact") {
        tl.from(".form-box", {
          opacity: 0,
          y: 50,
          duration: 1.5,
          ease: "elastic.out(1, 1)", 
        });
      }
    });
  });