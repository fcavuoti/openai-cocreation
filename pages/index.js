import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [topic, setTopic] = useState("dog");
  const [story, setStory] = useState("Once upon a time there was a dog.");
  const [input, setInput] = useState("");
  const [status, setStatus] = useState(1);

  useEffect(() => {
    console.log(input);
  })

  useEffect(() => {
    clearInput()
  }, [story])

  function clearInput() {
    setInput("");
  }

  async function onSubmitCont(event) {
    // let sent = event.target.value;
    // let new_sent = sent[0].toUpperCase() + sent.slice(1).toLowerCase();
    console.log("input: ", input);
    console.log("story: ", story);

    let story_and_input = story.concat(' ', input);
    console.log("new story: ", story_and_input);

    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ story: story_and_input }),
    });
    const data = await response.json();

    let story_and_input_compl = story_and_input.concat(' ', data.result);
    console.log("Story w completion: ", story_and_input_compl);
    setStory(story_and_input_compl);
  }

  async function onSubmitEnd(event) {
    event.preventDefault();
    const response = await fetch("/api/end", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ story: story }),
    });
    const data = await response.json();

    let story_and_end = story.concat(' ', data.result);
    console.log("Story w end: ", story_and_end);
    setStory(story_and_end);
  }

  async function onSubmit(event) {
    if (status === 0) await onSubmitCont(event)
    else if (status === 1) await onSubmitEnd(event)
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>what comes next?</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="userInput"
            placeholder="Write a sentence to continue the story."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <input type="submit" value="Generate story" />
        </form>
        <div className={styles.result}>{story}</div>
      </main>
    </div>
  );
}
