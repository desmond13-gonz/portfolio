import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { licenseKey } = await req.json();

    const Key = 'FOLIO-1234-ABCD-5678';
    if (Key === licenseKey) {
      return NextResponse.json({ valid: true });
    } else {
      return NextResponse.json({ valid: false });
    }

  } catch (err) {
    console.error("License check error:", err);
    return NextResponse.json({ valid: false }, { status: 500 });
  }
}
