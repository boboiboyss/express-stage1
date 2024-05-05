//membuat array kosong (addProject)
var addProject = []

//membuat function handleProject dengan parameter event
function handleProject(event) {
    //menghandle default event reload saat function dijalankan / button di klik
   event.preventDefault();
    //mengambil value dari inputan form html
    let projectName = document.getElementById('lproject-name').value;
    let startDate = document.getElementById('lstart-date').value;
    let endDate = document.getElementById('lend-date').value;
    let description = document.getElementById('ldescription').value;
    let check = document.querySelectorAll('input:checked');
    let image = document.getElementById('lupload').files[0];


    //membuat kondisi validasi / mengecek jika data yang di input bernilai kosong
    if(projectName === "" || startDate === "" || endDate === "" || description === "" || !image) {
        return alert("Please complete the empty fields");
    } else if (startDate > endDate) {
        return alert('The end date cannot be less than the start date');
    } else if (check.length <= 0) {
         return alert('Please checked one of the box')
    } 
    else {

        //menyimpan url image saat file image di upload
        let urlImage = URL.createObjectURL(image)      

        
        // for (let i = 0; i < tech.length; i++) {
        //    if (tech[i].checked === true) {
        //        listTech.push (tech[i].value);
        //     }
        //     else {
        //         alert('Please checked one of the box');
        //         return tech;
        //    } 
        // }

        //membuat array kosong untuk menampung nilai / item checkbox saat di klik
        let listTech = []
        
        //menampung nilai item checkbox
        check.forEach(item => {
            listTech.push(item.value);
        })

        //mengubah value date menjadi array 
        let startDatePart = startDate.split('/');
        let endDatePart = endDate.split('/');

        //membuat format date / custom date sesuai region indonesia
        let formatStartDate = `${startDatePart[2]} - ${startDatePart[1]} - ${startDatePart[0]}`;
        let formatEndDate = `${endDatePart[2]} - ${endDatePart[1]} - ${endDatePart[0]}`

        //membuat date baru sesuai format region indonesia
        let newStartDate = new Date(formatStartDate);
        let newEndDate = new Date(formatEndDate);

        //menghitung perbedaan waktu date dalam milisecond/
        let timeDifference = newEndDate - newStartDate
        
        //konversi jumlah hari date, konversi milisecond ke hari
        let getDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        //konversi jumlah bulan, jumlah hari date dibagi dengan nilai rata" hari dalam 1 bulan
        let getMonths = Math.floor(getDays / 30.44);

        //konversi jumlah tahun, jumlah bulan date dibagi dengan jumlah bulan dalam 1 tahun
        let getYears =  Math.floor(getMonths / 12)
        
        //membuat variable duration
        let duration;

        //membuat kondisi validasi / mengecek waktu date dan menampung nilai waktu date
        if(getYears > 0) {
            duration = `${getYears} Tahun`
        } else if (getMonths > 0) {
            duration = `${getMonths} Bulan`
        } else {
            duration = `${getDays} Hari`
        }

        //menampung semua nilai inputan kedalam addProject
        addProject.unshift({
            title : projectName,
            startDate,
            endDate,
            description,
            image : urlImage,
            duration,
            listTech
        })
        localStorage.setItem('myProject', JSON.stringify(addProject));
    }

    //menyimpan semua data addProject kedalam localStorage
    
    
    //mengambil element html dengan id card-project
//     let temp = document.getElementById('card-project');
//    let myProject = JSON.parse(localStorage.getItem('myProject'))

   //menambahkan element html kedalam temp dan menampilkan semua data / item dari addProject
//    addProject.map((item, key) => {
//         temp.innerHTML += `<div class='card-content'>
//                 <img src='${item.image}' alt='img'/>
//                  <a href="./detail-project.html?id=${key+1}" style="text-decoration : none; margin : 0; color: black;"><p class='title-content'>${item.title}</p></a>  
//                 <small>durasi : ${item.duration}</small>
//                 <p class='description-content'>${item.description.substr(0, 80)}</p>
//                 <i class="fa-brands fa-google-play"></i>
//                 <i class="fa-brands fa-android"></i>
//                 <i class="fa-brands fa-java"></i>
//                 <div class='action'>
//                 <button>edit</button>
//                 <button style='margin-left : 3px'>delete</button>
//                 </div>
//     </div>`
//    })

//    temp.innerHTML = `<div class='card-content'>
//                 <img src='${image}' alt='img' />
//                 <p class='title-content'>${projectName}</p>  
//                 <span>durasi : ${startDate} - ${endDate}</span>
//                 <p class='description-content'>${description.substr(0, 120)}</p>
//                 <i class="fa-brands fa-google-play"></i>
//                 <i class="fa-brands fa-android"></i>
//                 <i class="fa-brands fa-java"></i>
//                 <div class='action'>
//                 <button>edit</button><button>delete</button>
//                 </div>
//     </div>`;
listProject() //event button click
}

document.addEventListener('DOMContentLoaded', function(){
    listProject();
})

  function listProject(){
     let listProject =  JSON.parse(localStorage.getItem('myProject'))
     let html = '';
     console.log(listProject);
  if(listProject && listProject.length > 0) {
    for(let i = 0; i < listProject.length; i++ ) {
             html += `<div class='card-content'>
                <img src='${listProject[i].image}' alt='img'/>
                <a href="./project-detail/${i+1}" style="text-decoration : none; margin : 0; color: black;">
                    <p class='title-content'>${listProject[i].title}</p>
                </a>  
                <small>durasi : ${listProject[i].duration}</small>
                <p class='description-content'>${listProject[i].description.substr(0, 120)}</p>
                <i class="fa-brands fa-google-play"></i>
                <i class="fa-brands fa-android"></i>
                <i class="fa-brands fa-java"></i>
                <div class='action'>
                <button>edit</button>
                <button style='margin-left : 3px'>delete</button>
                </div>
            </div>`
    } 
  document.getElementById('card-project').innerHTML = html;
}else {
      console.log(`My project doesn't have data yet`);
  }
}

