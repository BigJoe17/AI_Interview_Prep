import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { dummyInterviews } from "@/constants";
import InterviewCard from "../../components/InterviewCard";
const page = () => {
  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h3>
            Get interview-ready with AI-powered AI powered Practice & Feedback
          </h3>
          <p className="text-lg">
            Practice on real Interview questions & get instant Feedback
          </p>

          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview">Start An Interview</Link>
          </Button>
        </div>
        <Image
          src="/robot.png"
          alt="robot"
          width={400}
          height={400}
          className="max-sm:hidden "
        />
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interviews</h2>

        <div className="interviews-sections">
          you have not taken any interviews yet
        </div>
      </section>
      <section className="flex flex-col gap-6 mt-8 ">
        <h2>Take an Interview</h2>

        <div className="interviews-sections flex flex-row gap-6 max-sm:flex-col ">
          {dummyInterviews.map((interview) => (
            <InterviewCard key={interview.id}
              {...interview}
              />
          ))}

        </div>
          <p>
            there are no interviews available for you to take at the moment...</p>
      </section>
    </>
  );
};

export default page;
