function handleSubmit(event){
    event.preventDefault();
    let name = document.getElementById('lname').value;
    let email = document.getElementById('lemail').value;
    let phone = document.getElementById('lphone').value;
    let subject = document.getElementById('lsubject').value;
    let message = document.getElementById('lmessage').value;

    if(name === '' || email === '' || phone === '' || subject === ''  || message === '') {
        return alert ('please complete the blank form')
    } else {
        const getData = {name, email, phone, subject, message}
        console.log(getData);
    }
    
    const myemail = 'boysimbolon5@gmail.com'

    const a = document.createElement('a');
    a.href = `https://mail.google.com/mail?view=cm&fs=1&to=${myemail}&su=${subject}&body=${message}`;
    a.click();
}
