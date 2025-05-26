import { getRandomInterviewCover } from '@/public/utils';
import { NextResponse } from 'next/server'
import { db } from '@/firebase/admin';
import {google} from '@ai-sdk/google';
import {generateText} from "ai";

export async function GET() {
  return NextResponse.json({ success: true, data: 'Hello from API!' }, {status:200})
}


export async function POST(request: Request) {

    const {type, role, level, techstack, amount, userid} = await request.json();


    try{

        const {text: questions} = await generateText({
            model: google('gemini-2.0-flash-001'),
            prompt: `prepare questions for a Job interview.
            the Job role is ${role}.
            the job experience level is ${level}.
            the tech stack used in the Job is:  ${techstack}.
            the focus between the Behavioural and technical questions should lean towards: ${type}.
            the amount of questions required is : ${amount}.
            the user id is ${userid}.
            please return only the questions, without any additional text.
            The questions are going to be read by a voice assistant so you do not use "/" or "*" or any other special characters which might break the voice assistant.
            return the question formatted like this:
            ["question 1","question 2", "question 3"]

            Thank you! <3
            `
        })


        const interview = {
            role, type, level, 
            techstack: techstack.split(','),
            questions: JSON.parse(questions),
            userId: userid,
            finalized:true,
            coverImage: getRandomInterviewCover(),
            createdAt: new Date().toISOString(),

        }

        await db.collection('interviews').add(interview);
        return Response.json({
            success: true,
            data: interview
        }, {status: 201
        })

    }catch(e){
        console.error(e);
        return NextResponse.json({ success: false, error: 'An error occurred' }, {status: 500});
    }
}

