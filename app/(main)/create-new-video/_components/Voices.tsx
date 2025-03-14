"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useEffect, useRef, useState } from "react";
import { ElevenLabsClient } from "elevenlabs";
import { Button } from "@/components/ui/button";

interface VoicesProps {
  handleFormData: (fieldname: string, fieldValue: string) => void;
}

function Voices({ handleFormData }: VoicesProps) {
  const [selectedVoice, setSelectedVoice] = useState({});
  const [voicesList, setVoicesList] = useState<any>();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentPreview, setCurrentPreview] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  const getVoicesList = async () => {
    const client = new ElevenLabsClient({
      apiKey: process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY,
    });
    try {
      const response = await client.voices.getAll();
      setVoicesList(response);
      console.log(response);
    } catch (error: any) {
      console.log("Get voices list error: ", error);
    }
  };

  useEffect(() => {
    getVoicesList();
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const togglePlay = (previewUrl: string) => {
    if (currentPreview === previewUrl && isPlaying && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else if (
      currentPreview === previewUrl &&
      !isPlaying &&
      audioRef.current
    ) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      const audio = new Audio(previewUrl);
      audioRef.current = audio;
      setCurrentPreview(previewUrl);
      audio.play();
      setIsPlaying(true);
      audio.onended = () => {
        setIsPlaying(false);
      };
    }
  };

  return (
    <div className="mt-4 p-6 bg-background dark:bg-background shadow-sm rounded-md">
      <h2 className="text-2xl font-bold text-foreground">Video Voice</h2>
      <p className="mt-1 text-muted-foreground">Select a voice for the video</p>
      <ScrollArea className="mt-4 h-[220px] rounded-md  border-input bg-secondary">
        {voicesList && (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {voicesList?.voices?.map((voice: any, index: number) => (
              <div
                key={index}
                onClick={() => {
                  setSelectedVoice(voice);
                  handleFormData("voice", voice);
                }}
                className={`p-4 rounded-lg border transition-transform duration-200 hover:scale-105 cursor-pointer flex flex-col justify-between bg-card ${
                  selectedVoice?.name === voice.name
                    ? " border-4 border-primary"
                    : "border-input"
                }`}
              >
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {voice?.name}{" "}
                    <span className="text-sm text-muted-foreground">
                      - {voice?.fine_tuning?.language}
                    </span>
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {voice?.labels?.accent}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-muted-foreground">
                    {voice?.labels?.gender}
                  </p>
                  {voice?.preview_url && (
                    <Button
                      size="sm"
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePlay(voice.preview_url);
                      }}
                    >
                      {currentPreview === voice.preview_url && isPlaying
                        ? "Pause"
                        : "Play"}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}

export default Voices;
