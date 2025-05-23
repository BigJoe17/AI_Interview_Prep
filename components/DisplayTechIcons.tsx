import { getTechLogos } from "@/public/utils";
import { Import } from "lucide-react";
import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";


interface TechIconProps {
  techstack: string[];
}

const DisplayTechIcons = async ( {techstack} :  {TechIconProps} ) => {
  const techIcons = await getTechLogos(techstack);

  return (
    <div className="flex flex-row ">
      {techIcons.slice(0, 3).map(({ tech, url }, index) => {
        return (
          <div
            key={tech}
            className={cn("relative group gap-3 bg-dark-300 rounded-full p-2 flex-center", index >= 1 && '-ml-3 ')}
          >
            <span className="tech-tooltip">{tech}</span>
            <Image src={url} alt={tech} width={30} height={30} 
            
            className="size-5"/>

          </div>
        );
      })}
    </div>
  );
};

export default DisplayTechIcons;
