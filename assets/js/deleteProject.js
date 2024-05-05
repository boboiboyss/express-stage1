async function deleteProject(index) {
    await fetch(`http://localhost:3000/project/${index}`, {
        method : 'DELETE'
    })

    // console.log('testtt');
    
}
