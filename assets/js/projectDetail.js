//membuat function addEventListener dengan event DOMContentLoaded, agar halaman html siap digunakan 
document.addEventListener('DOMContentLoaded', function() {

//mengambil data myProject dari localstorage
let storeProject = JSON.parse(localStorage.getItem('myProject'))

//mengambil params id dari location search dan mengambil data myProject sesuai params id
const id = location.search.substring(4);
const detailProject = storeProject[id-1];

//mendestruction detailProject dan membuat variable baru sesuai properti detailProject
const {title, startDate, endDate, description, image, duration, listTech} = detailProject;

//membuat format startDate dan conversi bulan menjadi nama bulan / string
const newStartDate = new Date(startDate);
const yearStartDate = newStartDate.getFullYear();
const monthStartDate = newStartDate.getMonth();
const converMonthStart = newStartDate.toLocaleString('en-US', {month: 'long'});
const dateStartDate = String(newStartDate.getDate()).padStart(2, "0"); 
const formatStartDate = `${dateStartDate} ${converMonthStart.substring(0,3)} ${yearStartDate}`;

//membuat format endDate dan konversi bulan menjadi nama bulan / string
const newEndDate = new Date(endDate);
const yearEndDate = newEndDate.getFullYear();
const monthEndDate = newEndDate.getMonth();
const convertMonthEnd = newEndDate.toLocaleString('en-US', {month: 'long'});
const dateEndDate = String(newEndDate.getDate()).padStart(2, "0");
const formatEndDate = `${dateEndDate} ${convertMonthEnd.substring(0,3)} ${yearEndDate}`

// konversi item array listTech menjadi string dan menggabung semua item menjadi satu string
let tech = listTech.map(item => item.replace(",", "")).join(" ");

//konversi string tech menjadi array dengan memotong character "Js" dan membuat array baru
let icons = tech.split("Js");

//menggunakan regex untuk mencari spasi pada item array icons dan mengganti menjadi string kosong
let icon = icons.map(item => item.replace(/\s/g, ""));

//membuat varible string kosong untuk menampung nilai item icon
let react = '';
let node = '';
let ts = '';
let next = '';

//membuat perulangan pada array icon, membuat kondisi pengecekan nial tiap item dan menampung nilai item icon
for(let i = 0; i < icon.length; i++){
     if(icon[i] === "React") {
        react += `<div><i class="fa-brands fa-${icon[i].toLowerCase()}" size="20"></i> <span>${icon[i].concat(" ", "Js")}</span></div>`
     } else if(icon[i] === "Node"){
        node += `<div><i class="fa-brands fa-${icon[i].toLowerCase()}" size="20"></i> <span>${icon[i].concat(" ", "Js")}</span></div>`
     } else if (icon[i] === "Next") {
        next += `<div><img src="./assets/img/${icon[i].toLowerCase()}.png" alt="image-nextjs" style="height: 25px; width: 25px" /> <span>${icon[i].concat(" ", "Js")}</span></div>`
     } else if(icon[i] === "TypeScript") {
        ts += `<div><img src="./assets/img/${icon[i].toLowerCase()}.png"  alt="image-ts" style="height: 25px; width: 25px"/> <span>${icon[i]}</span></div>`
     }
}

//mengambil element html dengan id project
let temp = document.getElementById('project');

//menambahkan element html kedalam temp dan menampilkan semua data / item dari myProject
temp.innerHTML += `<div class="container-detail">
    <h1>${title}</h1>
    <div class="wrapper">
        <div class="left">
            <img src="${image}" alt="img-detail" />
        </div>
        <div class="right">
            <div class="date">
                <p>Duration</p>
                <div class="time">
                    <i class="fa-regular fa-calendar-days"></i>
                    <span>${formatStartDate} - ${formatEndDate}</span>
                </div>
                <div class="duration">
                    <i class="fa-solid fa-clock"></i>
                    <span>${duration}</span>    
                </div>
            </div>
            <div class="tech">
                <p>Technologies</p>
                <div class="list-tech">
                ${react} ${node} ${next} ${ts}
                </div>
            </div>    
        </div>
    </div>
    <div class="desc">
        <p>${description}</p>
    </div>
    </div>
`
});
