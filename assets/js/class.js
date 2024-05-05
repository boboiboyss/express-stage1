class Person {
    name = '';
    height = 0;
    weight = 0;

    constructor(name, height, weight) {
        this.name = name,
        this.weight = weight,
        this.height = height
    }
    
     test(weight, height) {
         return weight * height;
     }
}


class School extends Person {
    constructor(name, height, weight, school, address) {
        super(name, height, weight);
        this.school = school;
        this.address = address;

        console.log(`This is property class Person : ${name}, ${height}, ${weight}`);
        console.log(`This is property class School : ${this.school}, ${this.address}`);
    }

    printOfSchool(name, school, address) {
        this.name = name;
        this.school = school;
        this.address = address
        console.log(`hi there my name is ${this.name}, my school is ${this.school} its location at ${this.address}`);
    }
}




const budi = new School ('Budi Sulistiyo', 167, 50, 'Mikroskil', 'Jl. Thamrin No. 30');
console.log(budi);
budi.printOfSchool('Budi Sulistyo', 'Mikroskil', 'Jl. Thamrin No. 39');

// const rubi = new School('Mikroskil', 'Jl. Thamrin');
// rubi.mySchool('Rubi', 'Mikroskil', 'Jl. Thamrin');


// const budi = new Person ('Budi Sulistiyo', 45, 167)

// console.log(budi.test(20, 20));
// console.log(budi);