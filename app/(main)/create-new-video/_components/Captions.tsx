import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { WandSparklesIcon } from "lucide-react";
import React, { useState } from "react";

interface CaptionsProps {
  handleFormData: (fieldname: string, fieldValue: string) => void;
}

function Captions({ handleFormData }: CaptionsProps) {
  const captionOptions = [
    {
      name: "Modern Clean",
      style: "text-white text-4xl font-semibold tracking-wide drop-shadow-md",
    },
    {
      name: "Bold Impact",
      style:
        "text-black text-4xl font-extrabold uppercase tracking-tighter bg-white p-1 drop-shadow-md",
    },
    {
      name: "Minimalist",
      style: "text-gray-200 text-4xl font-light italic",
    },
    {
      name: "Professional",
      style:
        "text-blue-100 text-4xl font-medium tracking-normal drop-shadow-lg",
    },
    {
      name: "Cinematic",
      style:
        "text-white text-4xl font-bold tracking-wide uppercase drop-shadow-xl",
    },
    {
      name: "Vibrant",
      style: "text-fuchsia-400 text-4xl font-extrabold drop-shadow-md",
    },
    {
      name: "Retro",
      style: "text-yellow-300 text-4xl font-semibold italic drop-shadow-lg",
    },
    {
      name: "Techy",
      style: "text-cyan-300 text-4xl font-semibold uppercase drop-shadow-md",
    },
  ];

  const [selectedCaption, setSelectedCaption] = useState();
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div className="mt-2 p-4 w-full ">
      <div>
        <h2 className="text-lg">Captions</h2>
        <p className="text-gray-500">Select caption style </p>
      </div>
      <div className="w-full mt-4">
        <div className="flex flex-wrap gap-4">
          {captionOptions.map((caption: any, index: number) => (
            <div
              key={index}
              className={`${selectedCaption?.name === caption.name && "border border-white"} flex gap-2 items-center justify-center p-2 px-4 hover:border border-gray-300 cursor-pointer bg-slate-900 rounded-lg`}
              onClick={() => {
                setSelectedCaption(caption);
                handleFormData("caption", caption);
              }}
            >
              <h2 className={`mt-1 ${caption?.style}`}>{caption.name}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Captions;
