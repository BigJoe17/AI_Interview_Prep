import React from "react";
import dayjs from "dayjs";
import { dummyInterviews } from "@/constants";
import { getRandomInterviewCover } from "@/public/utils";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import DisplayTechIcons from "./DisplayTechIcons";

const InterviewCard = ({
  interviewId,
  userId,
  role,
  type,
  techstack,
  createdAt,
}: InterviewCardProps) => {
  const feedback = (null as FeedBack) || null;
  const normalizedType = /mix/gi.test(type) ? "Mixed" : type;
  const formattedDate = dayjs(
    feedback?.createdAt || createdAt || Date.now()
  ).format("DD/MM/YYYY");

  return (
    <div className=" card-border w-[360px] max-sm:w-full min-h-96">
      <div className="card-interview">
        <div>
          <div className="absolute top-0 right-0 w-fit px-4 py-2 bg-light-600 rounded-bl-lg">
            <p className="badge-text">{normalizedType}</p>
          </div>
          <Image
            src={getRandomInterviewCover()}
            alt="Cover Image"
            width={90}
            height={90}
            className="rounded-full object-fit size-[90px]"
          />
          <h3 className="mt-5 capitalize">{role} interview</h3>

          <div className="flex flex-row gap-2 mt-3">
            <div className="flex flex-row gap-2">
              <Image
                src="/calendar.svg"
                alt="Calendar Icon"
                width={22}
                height={22}
              />
            </div>
            <p>{formattedDate}</p>
          </div>

          <div className="flex flex-row gap-2 items-center  mt-3">
            <Image src="/star.svg" alt="star" width={20} height={20} />
            <p className="text-sm">{feedback?.totalScore || "---"} / 100</p>
          </div>

          <p className="line-clamp-2 mt-5 ">
            {feedback?.finalAssessment ||
              "You have't taken the Interview yet. Take it now to Improve your skills."}
          </p>

          <div className="flex flex-row justify-between py-4">
           <DisplayTechIcons techstack={techstack} />
            <Button>
            <Link href={feedback
                ? `/interview/${interviewId}/feedback`
                : `/interview/${interviewId}`
            }>
                {feedback ? "Check Feedback" : "view Interview"}
            </Link>

            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;
