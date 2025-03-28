import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const token = req.cookies.get('token');

    if (!token) {
        return NextResponse.json({
            success: false,
            message: 'Token not found in cookies',
        }, { status: 401 });
    }

    return NextResponse.json({
        success: true,
        token: token.value,
    });
}