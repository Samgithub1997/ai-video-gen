"use client";

import React, { useState } from "react";
import VideoTopics from "./_components/VideoTopics";
import VideoStyle from "./_components/VideoStyle";
import Voices from "./_components/Voices";
import Captions from "./_components/Captions";
import { Button } from "@/components/ui/button";
import { WandSparklesIcon } from "lucide-react";
import Preview from "./_components/Preview";
import axios from "axios";

export interface FormDataProps {
  projectName?: string;
  topic?: string;
  videoStyle?: string;
  voice?: any;
  caption?: Caption;
  script?: string;
}

export interface Caption {
  name: string;
  style: string;
}

function CreateNewVideo() {
  const [formData, setFormData] = useState<FormDataProps>({}); // ✅ Default empty object
  const [previewDisplay, setPreviewDisplay] = useState(false);

  const handleFormData = (fieldName: string, fieldValue: any) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  console.log("Form Data: ", formData);

  const generateVideo = async () => {
    console.log("Generating video with:", formData);

    // ✅ Prevent API call if any required field is missing
    if (
      !formData.script ||
      !formData.voice?.voice_id ||
      !formData.projectName ||
      !formData.topic ||
      !formData.videoStyle ||
      !formData.caption
    ) {
      console.error("❌ Error: Missing required fields!");
      return; // ✅ Prevent execution if fields are missing
    }

    try {
      const result = await axios.post("/api/generate-video", {
        projectName: formData.projectName,
        topic: formData.topic,
        videoStyle: formData.videoStyle,
        script: formData.script,
        voice: formData.voice.voice_id,
        caption: formData.caption?.name,
      });

      console.log("✅ API Response:", result.data);
      setPreviewDisplay(true);
    } catch (error) {
      console.error("❌ API Error:", error);
    }
  };

  return (
    <div className="h-screen overflow-hidden">
      <h2 className="text-2xl font-bold mb-6">Create New Video</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 h-[calc(100%-2rem)] gap-4">
        <div className="md:col-span-2 border rounded-xl overflow-y-auto p-4">
          <VideoTopics handleFormData={handleFormData} />
          <VideoStyle handleFormData={handleFormData} />
          <Voices handleFormData={handleFormData} />
          <Captions handleFormData={handleFormData} />

          <div className="flex justify-center">
            <Button className="w-[95%] my-6" onClick={generateVideo}>
              <WandSparklesIcon className="gap-2" size={24} />
              <h2>Generate Video</h2>
            </Button>
          </div>
        </div>

        <div className="sticky top-0 self-start border rounded-xl p-4">
          {previewDisplay && <Preview formData={formData} />}
        </div>
      </div>
    </div>
  );
}

export default CreateNewVideo;
