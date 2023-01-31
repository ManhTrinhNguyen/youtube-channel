import {apiKey} from "./apiKey.js"

$(document).ready(() => {
  
    const submitBtn = $(".submitBtn")


   
    // Fetch Data
 
    const fetchData = () => {

        const dataQuery = {
            query : $("#searchInput").val(),
            channelId: $("#channel-option").val()
        }

         const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${apiKey}&channelId=${dataQuery.channelId}&maxResults=6&q=${dataQuery.query}`
         
        fetch(url)
        .then(res => res.json())
        .then(data => disPlayData(data))
        .catch(err => console.log(err))
    }


     // Click Submit Btn

   submitBtn.click((e) => {
    e.preventDefault()
    fetchData()
   })
   


   // Element function 

   const getElement = (dataItems, arrIndice) => {
            const img = dataItems[arrIndice].snippet.thumbnails.medium.url
            const title = dataItems[arrIndice].snippet.title
            const channelTitle = dataItems[arrIndice].snippet.channelTitle 
            const publishTime = dataItems[arrIndice].snippet.publishTime
            const videoID = dataItems[arrIndice].id.videoId

            $(`.video${arrIndice + 1}`).attr("href", `https://www.youtube.com/watch?v=${videoID}`)
            $(`.video${arrIndice + 1}`).attr("target", "_blank")
            $(`.img${arrIndice + 1}`).attr("src", img)
            $(`.title${arrIndice + 1}`).text(title)
            $(`.channel-title${arrIndice + 1}`).text(channelTitle)
            $(`.publish-time${arrIndice + 1}`).text(publishTime)
   }
   

   // display function
    const disPlayData = (data) => {
        const dataItems = data.items
        console.log(dataItems)
        // Show result condition
        if(dataItems.length === 0) {
            $(".no-result-container").addClass("result-active")
            $(".video-container").removeClass("result-active-grid")
        }else {
            $(".video-container").addClass("result-active-grid")
            $(".no-result-container").removeClass("result-active")
        }

        for (let i = 0; i < 6 ; i++ ) {
            getElement(dataItems, i)
        }
            
    
    }
    
})


