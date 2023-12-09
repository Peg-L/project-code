const bigFold = document.querySelectorAll('#largeFold');
const icon_arrow = document.querySelectorAll('.arrow');

const littleFold = document.querySelectorAll('#littleFold');
const icon_plus = document.querySelectorAll('.plus');

bigFold.forEach((item,i) => {
    item.addEventListener('click',e => {
        icon_arrow[i].classList.toggle('fa-chevron-up')
        icon_arrow[i].classList.toggle('fa-chevron-down');
    })
})

littleFold.forEach((item,i) => {
    item.addEventListener('click',e => {
        icon_plus[i].classList.toggle('fa-plus')
        icon_plus[i].classList.toggle('fa-minus');
    })
})