import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import React, { useState } from "react";

interface VideoStyleProps {
  handleFormData: (fieldname: string, fieldValue: string) => void;
}

export const videoStyles = [
  { title: "Realistic", imagePath: "/realistic.png" },
  { title: "Cinematic", imagePath: "/cinematic.png" },
  { title: "3D / CGI", imagePath: "/cgi.png" },
  { title: "Digital", imagePath: "/digital.png" },
  { title: "Watercolor", imagePath: "/watercolor.png" },
  { title: "Anime", imagePath: "/anime.png" },
  { title: "Minimal Line Art", imagePath: "/minimal-line-art.png" },
  { title: "Retro", imagePath: "/retro.png" },
  { title: "Stop-Motion", imagePath: "/stop-motion.png" },
  { title: "Abstract", imagePath: "/abstract.png" },
];

export default function VideoStyle({ handleFormData }: VideoStyleProps) {
  const [selectedStyle, setSelectedStyle] = useState<string>("");

  return (
    <div className="p-4">
      <div className="w-full">
        <div className="flex justify-between w-full">
          <div>
            <h2 className="text-xl">Video Style</h2>
            <p className="text-gray-500">Select Styles of your video</p>
          </div>
          <div className="flex gap-2 items-center">
            <Switch />
            <h2 className="text-l font-bold">Use Stock Image</h2>
          </div>
        </div>
        {/* Style cards */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {videoStyles.map((videoStyle: any, index: number) => (
            <div
              key={index}
              className={`relative w-full h-32 overflow-hidden rounded-lg p-1 hover:border-2 border-cyan-300 ${selectedStyle === videoStyle?.title && "border-2 border-cyan-200"}`}
              onClick={() => {
                setSelectedStyle(videoStyle?.title);
                handleFormData("videoStyle", videoStyle?.title);
              }}
            >
              <Image
                alt={videoStyle?.title}
                src={videoStyle?.imagePath}
                width={256}
                height={128}
                className={`w-full h-[90px] lg:h-[130px] xl:h-[180px] object-cover rounded-lg`}
              />
              <h2
                className={`absolute bottom-1 left-2  text-lg md:text-base font-semibold  ${videoStyle?.title === "Minimal Line Art" || videoStyle?.title === "Watercolor" ? "text-black" : "text-white"}`}
              >
                {videoStyle?.title}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
