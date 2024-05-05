function getTestimonialData(url) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
  
      xhr.open("GET", url, true);
  
      xhr.onload = () => {
        resolve(JSON.parse(xhr.responseText));
      };
  
      xhr.onerror = () => {
        reject("Network Error!");
      };
  
      xhr.send();
    });
  }

  //api https://api.npoint.io/653cd94d2bf08040f6f8
  async function allTesti(){
    const testimonial = await getTestimonialData('https://api.npoint.io/653cd94d2bf08040f6f8');

    if(!testimonial) {
     return (document.getElementById('card-testi').innerHTML=`<h1>Data not found!</h1>`);
    }
 
    const testiHtml = testimonial.map(item => {
     return `<div class='card'>
             <img src='${item.image}' class='img-testi' />
             <p class='quote'>${item.content}</p>
             <p class='author'> - ${item.author}</p>
     </div>`
    });
 
    document.getElementById('card-testi').innerHTML = testiHtml.join('');
 }

 async function filterTesti(rating) {
    const testimonial = await getTestimonialData('https://api.npoint.io/653cd94d2bf08040f6f8'); 
    const getTesti = testimonial.filter(testi => testi.rating === rating);

    if(!getTesti.length){
        return (document.getElementById('card-testi').innerHTML=`<h1 style='text-align: center'>Data not found!</h1>`);
    }

    let stars = '';
    for(let i = 0; i < rating; i++) {
        stars += `<i class="fa-solid fa-star" style="color: #ffa200;"></i>`
    }

    const testiHtml = getTesti.map(item => {
        return `<div class='card'>
                <img src='${item.image}' class='img-testi' />
                <span>${stars}</span>
                <p class='quote'>${item.content}</p>
                <p class='author'> - ${item.author}</p>
        </div>`
    });
    document.getElementById('card-testi').innerHTML = testiHtml.join('');
}

allTesti();