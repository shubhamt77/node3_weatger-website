console.log('Client side javaScript is loaded')

   //---------------------------(configuration of html with javascript)
      const weatherForm= document.querySelector('form')
      const search = document.querySelector('input')
      const messageOne = document.querySelector('#message-1')
      const messageTwo = document.querySelector('#message-2')
      
      

      weatherForm.addEventListener('submit',(e)=>{
          e.preventDefault()//use to prevent refresh browser immediately
         
          const location=search.value
         
          messageOne.textContent= 'Loading...'
          messageTwo.textContent=''


        //console.log(location)
      // to fetch the data from http request
        fetch('http://localhost:3000/weather?address='+ location).then((response)=>{
      response.json().then((data)=>{
        if(data.error){
            messageOne.textContent=data.error

        }else{
            messageOne.textContent=data.location
            messageTwo.textContent=data.forecast
            //console.log(data.location)
            //console.log(data.forecast)
        }
      })

      })
})