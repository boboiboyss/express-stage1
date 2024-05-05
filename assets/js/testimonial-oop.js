class Testimonial {
    constructor(image, content, author) {
        this.image = image
        this.content = content
        this.author = author
    }

    html() {
        throw new Error("You should use one of 'AuthorTestimonial' or 'CompanyTestimonial'")
    }
}

class AuthorTestimonial extends Testimonial {
    html() {
        return `<div class="card">
            <img src="${this.image}" class="img-testi" alt="img-testi" />
            <p class="quote">"${this.content}"</p>
            <p class="author"> - ${this.author}</p>
        </div>`
    }
}

class CompanyTestimonial extends Testimonial {
    html() {
        return `<div class="card">
            <img src="${this.image}" class="img-testi" alt="img-testi" />
            <p class="quote">"${this.content}"</p>
            <p class="author">- ${this.author} Company</p>
        </div>`
    }
}

const testimonial1 = new AuthorTestimonial("https://images.pexels.com/photos/837306/pexels-photo-837306.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", "Mantap sekali jasanya!", "Surya Elidanto");

const testimonial2 = new AuthorTestimonial("https://images.pexels.com/photos/845457/pexels-photo-845457.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", "Keren lah pokoknya!", "Surya Elz");

const testimonial3 = new CompanyTestimonial("https://images.pexels.com/photos/2770600/pexels-photo-2770600.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", "Wuhuu keren lah!", "ABC Company");

const testimonials = [testimonial1, testimonial2, testimonial3];
console.log(testimonials);
let testimonialHTML = ``;

for(let index = 0; index < testimonials.length; index++) {
    testimonialHTML += testimonials[index].html();
}

document.getElementById("card-testi").innerHTML = testimonialHTML;
