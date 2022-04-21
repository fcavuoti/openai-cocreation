import Head from "next/head";
import { useEffect, useState } from "react";
import init from "./api/init";
import styles from "./index.module.css";

const MAX_LEN = 10;

export default function Home() {
  const [topic, setTopic] = useState("rain");
  const [story, setStory] = useState();
  const [input, setInput] = useState("");
  const [storyLen, setStoryLen] = useState(0);

  useEffect(() => {
    console.log(input);
  });

  useEffect(() => {
    initStory();
  }, []);

  useEffect(() => {
    clearInput()
  }, [story]);

  function clearInput() {
    setInput("");
  }

  async function initStory() {
    // console.log("topic: ", topic);
    const response = await fetch("/api/init", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topic: topic }),
    });

    const data = await response.json();
    const new_story = await data.result;
    // console.log("Start: ", new_story);
    setStory(new_story);
    setStoryLen(storyLen + 1);
  } 

  async function onSubmitCont(event) {
    // let sent = event.target.value;
    // let new_sent = sent[0].toUpperCase() + sent.slice(1).toLowerCase();
    //console.log("input: ", input);
    // console.log("story: ", story);

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

    let story_and_input_compl = story_and_input.concat(' ', await data.result);
    //console.log("Story w completion: ", story_and_input_compl);
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
    const final_sent = await data.result;
    const finale = " The end.";

    let story_and_end = story.concat(' ', final_sent + finale);
    //console.log("Story w end: ", story_and_end);
    setStory(story_and_end);
  }

  function resetBoard() {
    setStory();
    setStoryLen(0);
    setInput("");
    initStory();
  }

  async function onSubmit(event) {
    console.log("len: ", storyLen);
    if (storyLen + 2 <= MAX_LEN) {
      await onSubmitCont(event);
      setStoryLen(storyLen + 2);
    } else {
      await onSubmitEnd(event);
      setTimeout(() => {
        resetBoard();
      }, 5000);
    }
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
