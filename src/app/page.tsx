"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");

  async function getData() {
    const response = await fetch("/api/data");

    const reader = response.body!.getReader();
    const decoder = new TextDecoder("utf-8");

    let i = 0;
    while (true) {
      i++;
      const { value, done } = await reader!.read();
      if (done) break;

      const newData = decoder.decode(value, { stream: true }).trim();
      if (newData) {
        if (i === 1) setTitle(newData);
        if (i === 2) setDescription(newData);
        if (i === 3) setLongDescription(newData);
      }
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-24 px-6">
      <div className="text-xl text-center">
        1<br />
        &nbsp;{title}
      </div>
      <div className="text-xl text-center">
        2<br />
        &nbsp;{description}
      </div>
      <div className="text-xl text-center">
        3<br />
        &nbsp;{longDescription}
      </div>

      {/*******/}
      {/*******/}
      {/*******/}

      <div className="text-center lg:max-w-[40%] w-full border p-4 rounded-2xl">
        <p> One request is made and the response is returned in 3 parts.</p>
        <p>
          Useful for when you need to make several asynchronous requests in the
          backend but the partial answer is already useful for the user.
        </p>
        <br />
        <p>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href={
              "https://github.com/diegoatwa/nextjs-stream-route-handler-response-example"
            }
            className="underline"
          >
            Access the Source Code on GitHub
          </Link>
        </p>
      </div>
    </main>
  );
}
