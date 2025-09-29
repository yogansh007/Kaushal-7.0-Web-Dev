document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('carouselTrack');
    const slides = Array.from(track.children);
    
    // The number of items to show per view (3 for desktop, 1 for mobile in CSS)
    let slidesPerView = 3; 
    
    // Start at slide index 0
    let currentIndex = 0;
    
    // Time in milliseconds for auto-move (3 seconds)
    const intervalTime = 3000; 

    // Function to calculate the correct number of slides to move based on screen size
    function updateSlidesPerView() {
        // Checks the CSS media query condition by looking at the computed width of a single slide
        if (window.innerWidth <= 768) {
            slidesPerView = 1; 
        } else {
            slidesPerView = 3;
        }
    }
    
    // Function to move the carousel
    function moveCarousel() {
        // 1. Update slides per view before calculation
        updateSlidesPerView(); 
        
        // 2. Calculate the next index. 
        // Moves by one group of slidesPerView (e.g., moves 3 slides on desktop)
        const totalItems = slides.length;
        const totalGroups = Math.ceil(totalItems / slidesPerView);
        
        // Move to the next index, but wrap around to 0 if it exceeds the last possible group
        currentIndex = (currentIndex + 1) % totalGroups;

        // 3. Calculate the percentage offset
        // - total width of all slides is (slides.length * 100) %
        // - percentage of one group is (currentIndex * slidesPerView * 100) / slides.length
        
        // The translation needs to be based on the actual width of a single slide * the number of slides to skip
        // Since the CSS is dynamic, we use a more direct calculation:
        const slideWidthPercent = 100 / slidesPerView; 
        const offset = currentIndex * slideWidthPercent * slidesPerView;

        // 4. Apply the translation
        track.style.transform = `translateX(-${offset}%)`;

        // If you reach the end, reset to the beginning instantly for a loop effect
        if (currentIndex * slidesPerView >= slides.length) {
             // To create a seamless loop, you'd typically clone nodes, 
             // but for simplicity, this resets to 0 when the full content has been shown.
             currentIndex = -1; // Reset for the next cycle to start at 0
        }
    }
    
    // Start the auto-move interval
    let autoMove = setInterval(moveCarousel, intervalTime);
    
    // Re-check and move when the window is resized to handle desktop <-> mobile transition
    window.addEventListener('resize', () => {
        // Clear the interval, update slidesPerView, reset position, and restart
        clearInterval(autoMove);
        currentIndex = 0; 
        track.style.transform = 'translateX(0%)';
        autoMove = setInterval(moveCarousel, intervalTime);
    });

    // Optional: Pause on hover
    track.parentElement.addEventListener('mouseenter', () => clearInterval(autoMove));
    track.parentElement.addEventListener('mouseleave', () => autoMove = setInterval(moveCarousel, intervalTime));

});


let scrbtn = document.getElementById("to-top-btn");
scrbtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: 'smooth' })
})

// code for nav -holdetr 
let nav_elem = document.getElementsByClassName("nav-holder")[0];
window.addEventListener('scroll', function () {
    let data = nav_elem.getBoundingClientRect();
    if (data.top <= 0) {
        nav_elem.style.width = "100%";
        nav_elem.style.borderRadius = "0";
        nav_elem.style.position = "sticky"
        nav_elem.style.top = "0px"

    }
    else if (data.top >= 0) {
        nav_elem.style.width = "65%";
        nav_elem.style.borderRadius = "10px";
        nav_elem.style.position = "static"
        nav_elem.style.top = "auto"
    }
})






var swiper2 = new Swiper(".mySwiper2", {
    slidesPerView: 4.5,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    pagination: {
        el: ".swiper-pagination2",
        clickable: true,
    },
});


window.addEventListener('resize', function () {
    if (this.window.innerWidth < 650) {
        swiper.params.slidesPerView = 2;
        swiper2.params.slidesPerView = 2;
    }
    else {
        swiper.params.slidesPerView = 3;
        swiper2.params.slidesPerView = 3.5
    }
   
    swiper2.update()
    
})


