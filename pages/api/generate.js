import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion("text-davinci-002", {
    prompt: generatePrompt(req.body.story),
    temperature: 0.6,
  });
  const done = await res.status(200).json({ result: completion.data.choices[0].text });
  console.log(done);
}

function generatePrompt(story) {
  const prompt = "Write the next sentence of the story, adding action.";
  return story.concat(' ', prompt);
}
