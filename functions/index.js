const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp()

exports.searchSmoothies = functions.https.onCall((data, context) => {
    //gets fired when called from frontend


    //get search term from frontend
    const raw_searchterm = data.searchterm
    var searchterms = raw_searchterm.split(' ') //array like kitkat , banana 

    //get all smoothie
    return admin.firestore().collection('smoothies').get()
    .then(snapshot =>{
   
        var smoothies = []
         snapshot.forEach(doc => {
             let smoothie = doc.data();
            //  smoothie.id = doc.id;
            
            //search value
            var searchvalue = doc.data().searchvalue
           
            //check if raw search term exists in search value array
            if (searchvalue.indexOf(raw_searchterm) > -1) {
                //exist in search value 
                smoothies.push(smoothie)
            }else{
                var existscounter = 0
                //slit and check 
                searchterms.forEach(searchterm=>{
                    if (searchvalue.indexOf(searchterm) > -1) {
                        //exist in search value 
                        existscounter = existscounter + 1
                    }
                })
               
                if (existscounter == searchterms.length) {
                     smoothies.push(smoothie)
                }
            }
            
         })//foreach

        return {
            found_smoothies: smoothies
        }
    })

   
})

 