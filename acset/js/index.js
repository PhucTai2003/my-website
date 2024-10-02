document.addEventListener("DOMContentLoaded", function() {
    const listImages = document.querySelector('.list-images');
    const images = document.querySelectorAll('.list-images img');
    const btnLeft = document.querySelector('.btn-left');
    const btnRight = document.querySelector('.btn-right');

    let currentIndex = 0;
    const totalImages = images.length;

    // Hiển thị ảnh đầu tiên
    images[currentIndex].style.display = 'block';

    // Function để chuyển ảnh
    function slide(direction) {
        images[currentIndex].style.display = 'none';

        if (direction === 'right') {
            currentIndex = (currentIndex + 1) % totalImages;
        } else {
            currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        }

        images[currentIndex].style.display = 'block';
    }

    // Xử lý sự kiện khi nhấn nút trái
    btnLeft.addEventListener('click', function() {
        slide('left');
    });

    // Xử lý sự kiện khi nhấn nút phải
    btnRight.addEventListener('click', function() {
        slide('right');
    });
    setInterval(function() {
        slide('right');
    }, 3000);
});


//-----------------slider-product- one
const rightbtntwo = document.querySelector('.fa-chevron-right-two');
const leftbtntwo = document.querySelector('.fa-chevron-left-two');
const imgNumbertwo = document.querySelectorAll('.slider-product-one-content-items');
let index = 0;

rightbtntwo.addEventListener("click", function() {
    index = index + 1;
    if (index > imgNumbertwo.length-1) {
        index = 0;
    }
    document.querySelector(".slider-product-one-content-items-content").style.right = index * 100 + "%";
});

leftbtntwo.addEventListener("click", function() {
    index = index - 1;
    if (index < 0) {
        index = imgNumbertwo.length - 1;
    }
    document.querySelector(".slider-product-one-content-items-content").style.right = index * 100 + "%";
});
//-----------------slider-product- one tow
const rightbtntwoo = document.querySelector('.fa-chevron-right-twoo');
const leftbtntwoo = document.querySelector('.fa-chevron-left-twoo');
const imgNumbertwoo = document.querySelectorAll('.slider-product-tow-content-items');
let indexx = 0;

rightbtntwoo.addEventListener("click", function() {
    indexx = indexx + 1;
    if (indexx > imgNumbertwoo.length-1) {
        indexx = 0;
    }
    document.querySelector(".slider-product-tow-content-items-content").style.right = indexx * 100 + "%";
});

leftbtntwoo.addEventListener("click", function() {
    indexx = indexx - 1;
    if (indexx < 0) {
        indexx = imgNumbertwoo.length - 1;
    }
    document.querySelector(".slider-product-tow-content-items-content").style.right = indexx * 100 + "%";
});

//----------------------------------------------------input


