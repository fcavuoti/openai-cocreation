import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion("text-davinci-002", {
    prompt: initStory(req.body.topic),
    temperature: 0.6,
  });
  const done = await res.status(200).json({ result: completion.data.choices[0].text });
  console.log(done);
}

function initStory(topic) {
  const prompt = "Write the first sentence of a story about"
  return prompt.concat(' ', topic);
}
