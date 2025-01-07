import React, { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { IconFileDescription } from "@tabler/icons-react";
import { AUTH_CONFIG } from "../config/auth";
import aiConfig from '@site/ai.json';

export default function DocSummary({ content }) {
  if (!aiConfig.github_features) {
    return null;
  }

  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const getSummary = async () => {
    const token = localStorage.getItem("github_token");
    if (!token) {
      alert("Please sign in to use the summarization feature");
      return;
    }

    setLoading(true);
    try {
      const markdownContent =
        document.querySelector(".markdown")?.textContent || "";
      console.log("Extracted text content:", markdownContent);
      //setSummary(markdownContent);
    

      const myHeaders = new Headers();
      myHeaders.append("X-GitHub-Token", token);
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        messages: [
          {
            role: "user",
            content: `summarize the following content from this html page: ${markdownContent}`,
          },
        ],
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      let data = await fetch("http://localhost:3000/copilot/chat/completions", requestOptions);
      let aiData = await data.json()
      console.log(aiData)
      setSummary(aiData.choices[0].message.content)
      setLoading(false);
      // Rest of your code...
    } catch (error) {
      console.error("Summarization error:", error);
      setLoading(false);
    }
  };

  return (
    <div className="my-4">
      <Button
        onClick={getSummary}
        disabled={loading}
        variant="outline"
        type="button"
        className="flex items-center gap-2"
      >
        <IconFileDescription className="w-4 h-4" />
        {loading ? "Generating Summary..." : "Get Summary"}
      </Button>

      {summary && (
        <Card className="mt-4">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-2">Summary</h3>
            <p>{summary}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
