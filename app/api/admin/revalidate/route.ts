import { NextRequest } from "next/server";
import { revalidateTag } from "next/cache";
import { addCorsHeaders, handleOptions } from "@/lib/cors";

export async function OPTIONS() {
  return handleOptions();
}

// POST /api/revalidate?tag=xxx
export async function POST(request: NextRequest) {
  try {
    const tag = request.nextUrl.searchParams.get("tag");

    if (!tag) {
      return Response.json(
        {
          success: false,
          error: {
            message: "Tag parameter is required",
            code: "MISSING_PARAM",
          },
        },
        { status: 400, headers: addCorsHeaders() }
      );
    }
    //@ts-ignore
    revalidateTag(tag);

    return Response.json(
      {
        success: true,
        data: {
          revalidated: true,
          tag,
          now: Date.now(),
        },
      },
      { status: 200, headers: addCorsHeaders() }
    );
  } catch (error) {
    console.error("Revalidation error:", error);
    return Response.json(
      {
        success: false,
        error: {
          message: "Failed to revalidate cache",
          code: "REVALIDATION_ERROR",
        },
      },
      { status: 500, headers: addCorsHeaders() }
    );
  }
}