

var form = document.forms['add-form']
form.addEventListener('submit',async function(e){
    e.preventDefault();

    const formData = new FormData();
    for (const el of e.target) {
        if(el.files){
            console.log(el.files);
            formData.append("file",el.files[0]);
        }else if(el.name){
            formData.append(el.name,el.value)
            console.log(el.name,el.value);
        }
    }
    console.log(formData);
    var results = await axios({
        method: "POST",
        url: "http://localhost:3000/friends/add",
        data: formData,
        headers: {
            "Content-Type": "multipart/form-data",},
    });
    
})