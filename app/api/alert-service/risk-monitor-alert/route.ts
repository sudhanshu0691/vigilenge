import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { soilValue, rainValue } = body;

        if (soilValue > 60 && rainValue > 60) {

            return NextResponse.json({
                message: "Send Message for rain and soil",
            });
        }
        else if (soilValue > 60) {
            
            return NextResponse.json({
                message: "Send Message for soil",
            });
        }
        else if (rainValue > 60) {
            return NextResponse.json({
                message: "Send Message for rain",
            });
        }
        else {
            return NextResponse.json({
                message: "Send Message ",
            });
        }

    } catch (error) {
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
