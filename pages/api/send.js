export default async function Send(req, res) {
    const test_topic = "code";
    const test_story = "testing";
    const response = await fetch(`https://docs.google.com/forms/d/e/1FAIpQLSdC1kjEk1Y8EDkcLthABNi7wiO9h0n83_NTiJIAaM9d2EnVyA/formResponse?entry.154777174=${test_topic}&entry.1878669682=${test_story}`, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
          'Content-Type': 'application/json',
      }
    });

    console.log(response, "form submitted"); 
}