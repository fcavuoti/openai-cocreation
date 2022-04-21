import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function End(req, res) {
  const completion = await openai.createCompletion("text-davinci-002", {
    prompt: endStory(req.body.story),
    temperature: 0.6,
  });
  const done = res.status(200).json({ result: completion.data.choices[0].text });
  console.log(await done);
}

function endStory(story) {
  const prompt = "Write a grand finale to end the story.";
  return story.concat(' ', prompt);
}
