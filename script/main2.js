// document.addEventListener("DOMContentLoaded", function () {
//     const modal = document.querySelector('.modal');
//     const closeButton = document.querySelector('.close-button');

//     const swiper = new Swiper('.modal-vertical-swiper', {
//         direction: 'vertical',
//         slidesPerView: "auto",
//         loop: true,
//     });

//     function playVideo(video) {
//         const videos = document.querySelectorAll('.swiper-slide video');
//         videos.forEach(v => {
//             v.pause(); 
//             v.currentTime = 0; 
//         });
//         video.play(); 
//     }

//     document.querySelectorAll('.play-btn').forEach(button => {
//         button.addEventListener('click', function(event) {
//             const video = this.parentElement.querySelector('video');
//             playVideo(video);
//             this.style.display = 'none'; 
//         });
//     });

//     function openModal() {
//         modal.style.display = 'flex';
//         setTimeout(() => {
//             modal.classList.add('show'); 
//         }, 20);
//     }

//     closeButton.addEventListener('click', () => {
//         const videos = document.querySelectorAll('.swiper-slide video');
//         videos.forEach(v => v.pause());
//         modal.classList.remove('show');
//         setTimeout(() => {
//             modal.style.display = 'none'; 
//         }, 500);
//     });

//     window.addEventListener('click', (event) => {
//         if (event.target === modal) {
//             closeButton.click(); 
//         }
//     });

//     setTimeout(openModal, 5000);
// });


// Попап форма
document.addEventListener("DOMContentLoaded", function() {
    const popup = document.getElementById('main-popup');
    
    const openPopupButtons = document.querySelectorAll('.open-popup-btn');
    openPopupButtons.forEach(button => {
        button.addEventListener('click', function() {
            popup.style.display = 'flex';
            document.body.classList.add('popup-open'); 
        });
    });

    const closeButton = popup.querySelector('.close-btn');
    closeButton.addEventListener('click', function() {
        popup.style.display = 'none';
        document.body.classList.remove('popup-open'); 
    });

    popup.addEventListener('click', function(event) {
        if (event.target === popup) {
            popup.style.display = 'none';
            document.body.classList.remove('popup-open'); 
        }
    });
});