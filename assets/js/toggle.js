function toggleElement(){
    const hidden = document.getElementById('toggle');
    hidden.classList.toggle("show");
}

document.addEventListener('DOMContentLoaded', function(){
    if(window.innerWidth > 600) {
        const removeClass = document.getElementById('toggle')
        removeClass.classList.remove('show');
    }
})
