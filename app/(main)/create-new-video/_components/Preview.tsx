import React from "react";
import { videoStyles } from "./VideoStyle";
import Image from "next/image";

function Preview({ formData }: any) {
  const { videoStyle, caption } = formData;
  const imageSelected = videoStyles.find((item) => item?.title === videoStyle);

  return (
    <div className="p-2 ">
      <h2 className="text-2xl text-white my-6">Preview</h2>
      <div className="flex justify-center">
        {videoStyle && (
          <div className="relative ">
            <Image
              src={imageSelected?.imagePath || ""}
              width={1000}
              height={360}
              className="h-[50vh] w-fit rounded-xl object-cover justify-center"
              alt={imageSelected?.title || ""}
            />
            <h2
              className={`${caption?.style} absolute bottom-5 left-1/2 transform -translate-x-1/2`}
            >
              {caption?.name}
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default Preview;
