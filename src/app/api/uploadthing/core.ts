import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

// Fake auth function
const auth = (req: Request) => ({ id: "fakeId" });

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
    },
  })
    .middleware(async ({ req }) => {
      // TODO: Replace with next-auth
      const user = await auth(req);

      if (!user) throw new UploadThingError("Unauthorized");

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.ufsUrl);

      return { url: file.ufsUrl };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
