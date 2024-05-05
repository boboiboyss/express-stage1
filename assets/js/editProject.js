async function editProject(event, index) {
    event.preventDefault();
    console.log(index, ' ini adalah index dari edit project dengan put');
    await fetch(`http://localhost:3000/project/${index}`, {
        method : 'PUT'
    })

   
    
}
