
import Tesseract from 'tesseract.js';

export default async function Ocr(req, res) {


    Tesseract.recognize(
        'https://tesseract.projectnaptha.com/img/eng_bw.png',
        'eng',
        { logger: m => console.log(m) }
       // { logger: m => res.status(200).json({ocr: m}) }

      //  res.status(200).json({"it": "worked!"})
      ).then(({ data: { text } }) => {
        console.log(text);
        res.status(200).json({ocr: text})
      })



    
     console.log("server is running!!!!")

    // res.status(200).json({"it": "worked!"})
    
    
    
    
    // const test_topic = "code";
    // const test_story = "testing";
    // const response = await fetch(`https://docs.google.com/forms/d/e/1FAIpQLSdC1kjEk1Y8EDkcLthABNi7wiO9h0n83_NTiJIAaM9d2EnVyA/formResponse?entry.154777174=${test_topic}&entry.1878669682=${test_story}`, {
    //   method: 'POST',
    //   mode: 'no-cors',
    //   headers: {
    //       'Content-Type': 'application/json',
    //   }
    // });

    // console.log(response, "form submitted"); 
}