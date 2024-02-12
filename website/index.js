const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')
const JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIxMWJjYzM1NS03NjRiLTQ0N2YtOTAyNC1mNmFiNTk0ZDg3OTAiLCJlbWFpbCI6Imp1bGllbnNhbGVoQGhvdG1haWwuZnIiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNTYyMjU2YmYxZWU3M2Y1YjhmZmEiLCJzY29wZWRLZXlTZWNyZXQiOiI1YjgyZDYyNTcwNzFjM2UyMDY3Nzk0N2RiMDAwNDRjYjNhMzdmMDYyOWFjODQxMWE4MmJhZmM1ODE0ZGE5NmEzIiwiaWF0IjoxNzA3NzE4MzcxfQ.qavEeJ_OArSqBZ4UTCoB79QVzcQtwmQe_eYaNMhYTXI';

const pinFileToIPFS = async () => {
    const formData = new FormData();
    const src = "./pomme.png";

    const file = fs.createReadStream(src)
    formData.append('file', file)

    const pinataMetadata = JSON.stringify({
        name: 'File name',
    });
    formData.append('pinataMetadata', pinataMetadata);

    const pinataOptions = JSON.stringify({
        cidVersion: 0,
    })
    formData.append('pinataOptions', pinataOptions);

    try{
        const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
            maxBodyLength: "Infinity",
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                'Authorization': `Bearer ${JWT}`
            }
        });
        console.log(res.data);
    } catch (error) {
        console.log(error);
    }
}
pinFileToIPFS()
