"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Loader2Icon, Sparkle } from "lucide-react";
import React, { ReactElement, useState } from "react";
import axios from "axios";

interface VideoTopicsProps {
  handleFormData: (field: string, value: string) => void;
}

function VideoTopics({ handleFormData }: VideoTopicsProps) {
  const video_suggestions = [
    "Historical Story",
    "Kids Story",
    "Science Experiment Story",
    "Life Hacks",
    "Motivational Story",
    "Space Story",
    "Myth vs Reality",
    "Horror Stories",
    "Tech Story",
    "Movie Story",
    "AI & Future Tech",
    "Funny Animal Clips",
    "Fitness Tips",
    "Business Tips",
    "Psycology Facts",
  ];

  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [projectName, setProjectName] = useState<string>("");
  const [generatedScript, setGeneratedScript] = useState([]);
  const [selectedScriptIndex, setSelectedScriptIndex] = useState<number>(2);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChangeScript = (
    index: number,
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newValue = event.target.value;
    setGeneratedScript((prevScripts: any) => {
      const updatedScripts: string[] = [...prevScripts];
      updatedScripts[index] = newValue;
      return updatedScripts;
    });
  };

  const generateScript = async () => {
    setLoading(true);

    try {
      const request = {
        topic: selectedTopic,
      };
      const response = await axios.post("/api/generate-script", request);
      console.log(response);
      setGeneratedScript(response?.data?.scripts);
    } catch (err: any) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      {/* Project Title */}
      <div>
        <h3 className="text-lg ">Project Title</h3>
        <Input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2 mt-2"
          placeholder="Enter your project title"
          value={projectName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleFormData("projectName", e.target.value);
            setProjectName(e.target.value);
          }}
        />
      </div>
      {/* Video Topic  */}
      <div className="mt-6">
        <h3 className="text-lg">Video Topic</h3>
        <Tabs defaultValue="suggestions" className="w-full">
          <TabsList className="mb-2">
            <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
            <TabsTrigger value="your_topic">Your Topic</TabsTrigger>
          </TabsList>
          <TabsContent value="suggestions">
            <div className="flex flex-wrap items-center gap-4 w-full">
              {video_suggestions.map((suggestion: string, index: number) => (
                <Button
                  key={index}
                  className={`${selectedTopic === suggestion && "bg-secondary"}`}
                  variant={"outline"}
                  onClick={() => {
                    setSelectedTopic(suggestion);
                    handleFormData("topic", suggestion);
                  }}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="your_topic">
            <h2 className="text-gray-300 mt-2">Draft your own topic</h2>
            <Textarea
              className="m-4"
              placeholder="Start writing here...."
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setSelectedTopic(e.target.value);
                handleFormData("topic", e.target.value);
              }}
            />
          </TabsContent>
        </Tabs>
      </div>
      {/* Script */}
      <h2 className="my-4 text-gray-300">Select a script</h2>
      {generatedScript.length > 0 && (
        <div className="grid gap-4 grid-cols-2  ">
          {generatedScript.map((script: [], index: number) => (
            <div
              key={index}
              className={`border p-4 ${selectedScriptIndex === index && "bg-gray-700 border-white"}`}
              onClick={() => {
                setSelectedScriptIndex(index);
                handleFormData("script", generatedScript[index]?.content);
                console.log(
                  "The script selected is: ",
                  generatedScript[index]?.content
                );
              }}
            >
              <Textarea
                className="h-36 bg-inherit!"
                value={script?.content}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  handleChangeScript(index, e);
                }}
              />
            </div>
          ))}
        </div>
      )}
      {/* Generate Button */}
      <Button
        className="p-2 m-2 mt-6 px-6"
        disabled={loading}
        onClick={generateScript}
      >
        {loading ? (
          <Loader2Icon className="animate-spin" size={24} />
        ) : (
          <Sparkle size={24} />
        )}
        {generatedScript.length > 0 ? "Regenerate Script" : "Generate Script"}
      </Button>
    </div>
  );
}

export default VideoTopics;
