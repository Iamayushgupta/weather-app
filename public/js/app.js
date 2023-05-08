const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg-1')
const msg2 = document.querySelector('#msg-2')
weatherForm.addEventListener('submit' , (e)=>{
    e.preventDefault()
    msg1.textContent="Loading..."
    const location = search.value
    fetch('/weather?address=' + location).then((response)=>{
    response.json().then(({error,location,temperature})=>{
        if(error){
            msg1.textContent=error
        }
        else{
            msg1.textContent=location
            msg2.textContent="The temperature here is " + temperature +" degrees"
        }
    })
})
})

