const testimonial = [
    {
        image : "https://images.pexels.com/photos/837306/pexels-photo-837306.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", 
        content : "Mantap sekali jasanya!",
       author : "Surya Elidanto",
       rating : 5
    },
    {
        image : "https://images.pexels.com/photos/845457/pexels-photo-845457.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", 
        content : "Keren lah pokoknya!", 
        author : "Surya Elz",
        rating : 4
    },
    {
        image : "https://images.pexels.com/photos/2770600/pexels-photo-2770600.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", 
        content : "Cukup menarik!", 
        author : "Angga Rubicorn",
        rating : 3
    },
    {
        image : "https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", 
        content : "Kurang menarik dan terlalu sederhana!", 
        author : "Robert Crypto",
        rating : 2
    },
    {
        image : "https://images.pexels.com/photos/1182825/pexels-photo-1182825.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", 
        content : "Luar biasa itu sangat hebat!", 
        author : "Ricko Hermansyah",
        rating : 5
    },
    {
        image : "https://images.pexels.com/photos/977796/pexels-photo-977796.jpeg?auto=compress&cs=tinysrgb&w=600", 
        content : "Kamu butuh seorang mentor!", 
        author : "Simon Robben",
        rating : 3
    }
]



function allTesti(){
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

function filterTesti(rating) {
    const getTesti = testimonial.filter(testi => testi.rating === rating);

    if(!getTesti.length){
        return (document.getElementById('card-testi').innerHTML=`<h1 style='text-align: center'>Data not found!</h1>`);
    }

    let rate = '';
    for(let i = 0; i < rating; i++) {
        rate += `<i class="fa-solid fa-star"></i>`
    }

    const testiHtml = getTesti.map(item => {
        return `<div class='card'>
                <img src='${item.image}' class='img-testi' />
                <span>${rate}</span>
                <p class='quote'>${item.content}</p>
                <p class='author'> - ${item.author}</p>
        </div>`
    });

    document.getElementById('card-testi').innerHTML = testiHtml.join('');
}

allTesti();



