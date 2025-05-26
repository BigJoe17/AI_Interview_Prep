import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
enum CallStatus {
  INACTIVE = "INACTIVE",
  ACTIVE = "ACTIVE",
  CONNECTING = "CONNECTING",
  FINISHED = "FINISHED",
}

type AgentProps = {
  userName?: string;
  userId?: string;
  type?: "generate" | "answer" | "interview";
};

const Agent = ({ userName }: AgentProps) => {
  const isSpeaking = true;
  const callStatus = CallStatus.CONNECTING; // This would typically come from props or state
  const message = [
    "what is your name?",
    "my name is joshua Olu, nice to meet you",
  ];
  const lastMessage = message[message.length - 1];

  return (
    <>
      <div className="call-view">
        <div className="card-interviewer">
          <div className="avatar">
            <Image
              src="/ai-avatar.png"
              alt="Avatar"
              width={50}
              height={50}
              className="object-cover"
            />

            {isSpeaking && <span className="animate-speak" />}
          </div>

          <h3>AI Interviewer</h3>
        </div>

        <div className="card-border">
          <div className="card-content">
            <Image
              src="/user-avatar.png"
              alt="User Avatar"
              width={550}
              height={550}
              className="rounded-full object-cover size-[120px]"
            />
            <h3>{userName}</h3>
          </div>
        </div>
      </div>

      {message.length > 0 && (
        <div className="transcript-border">
          <div className="transcript">
            <p
              key={lastMessage}
              className={cn(
                "transitio-opacity duration-500 opacity-0, animate-fadeIn opacity-100 "
              )}
            >
              {lastMessage}
            </p>
          </div>
        </div>
      )}

      <div className="w-full flex justify-center">
        {callStatus !== "ACTIVE" ? (
          <button className="relative btn-call">
            <span
              className={cn(
                "absolute animate-ping rounded-full opacity-75",
                callStatus !== "CONNECTING" ? "hidden" : ""
              )}
            />
            <span className="flex items-center gap-2">
              {callStatus === "INACTIVE" || callStatus === "FINISHED"
                ? "Call"
                : "..."}
            </span>
          </button>
        ) : (
          <button className="btn-disconnect">End</button>
        )}
      </div>
    </>
  );
};

export default Agent;
