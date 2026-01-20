import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string,
    public details?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export function handleApiError(
  error: unknown,
  headers?: HeadersInit
): Response {
  console.error("API Error:", error);

  // Handle ApiError instances
  if (error instanceof ApiError) {
    return Response.json(
      {
        success: false,
        error: {
          message: error.message,
          code: error.code,
          details: error.details,
        },
      },
      { status: error.statusCode, headers }
    );
  }

  // Handle Zod validation errors
  if (error instanceof ZodError) {
    return Response.json(
      {
        success: false,
        error: {
          message: "Validation failed",
          code: "VALIDATION_ERROR",
          details: error.issues,
        },
      },
      { status: 400, headers }
    );
  }

  // Handle Prisma errors
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002": // Unique constraint violation
        return Response.json(
          {
            success: false,
            error: {
              message: "A record with this value already exists",
              code: "DUPLICATE_ENTRY",
              details: error.meta,
            },
          },
          { status: 409, headers }
        );

      case "P2025": // Record not found
        return Response.json(
          {
            success: false,
            error: {
              message: "Record not found",
              code: "NOT_FOUND",
            },
          },
          { status: 404, headers }
        );

      case "P2003": // Foreign key constraint violation
        return Response.json(
          {
            success: false,
            error: {
              message: "Related record not found",
              code: "FOREIGN_KEY_VIOLATION",
              details: error.meta,
            },
          },
          { status: 400, headers }
        );

      default:
        return Response.json(
          {
            success: false,
            error: {
              message: "Database error occurred",
              code: "DATABASE_ERROR",
              details:
                process.env.NODE_ENV === "development" ? error.meta : undefined,
            },
          },
          { status: 500, headers }
        );
    }
  }

  // Handle generic errors
  if (error instanceof Error) {
    return Response.json(
      {
        success: false,
        error: {
          message:
            process.env.NODE_ENV === "development"
              ? error.message
              : "Internal server error",
          code: "INTERNAL_ERROR",
        },
      },
      { status: 500, headers }
    );
  }

  // Fallback for unknown errors
  return Response.json(
    {
      success: false,
      error: {
        message: "An unexpected error occurred",
        code: "UNKNOWN_ERROR",
      },
    },
    { status: 500, headers }
  );
}

// Helper function to create success responses
export function createSuccessResponse<T>(
  data: T,
  status: number = 200,
  headers?: HeadersInit
): Response {
  return Response.json(
    {
      success: true,
      data,
    },
    { status, headers }
  );
}
