// const getResponse = async (req, res, next) => {
//     const {input} = req.body
//     e.preventDefault();
//     if (input.trim() === '') return;

//     const requestBody = {
//         "user-input": input
//     }

//     const resp = await fetch(`https://codeandcosmos.app.n8n.cloud/webhook/13c2e677-4967-45fe-adcb-c2cb9b16c5ee`, {
//         method : "POST",
//         headers : {
//             "Content-Type" : "Application/json"
//         },
//         body : JSON.stringify(requestBody)
//     })

//     if(resp.ok){
//         const data = await resp.text();
//         return data;
//     }
// }

// module.exports = {getResponse};