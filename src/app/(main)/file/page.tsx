"use client";

import { useState } from "react";
import createSupabaseBrowserClient from "@/supabase/client";
import DropAndDragZone from "@/components/File/DropAndDragZone";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function File() {
  const supabase = createSupabaseBrowserClient();

  const [files, setFiles] = useState<File[]>([]);

  const uploadImagesToSupabase = async (files: File[]) => {
    const imagesUploadResults: string[] = [];

    for (const file of files) {
      const uploadingFile = file as File;
      const result = await supabase.storage
        .from("images")
        .upload(uploadingFile.name, uploadingFile, {
          upsert: true,
          duplex: "half",
        });
      if (!result.error) imagesUploadResults.push(result.data.path);
      else {
        throw new Error(`Error when uploading: ${uploadingFile.name}`);
      }
    }

    if (!imagesUploadResults.length)
      throw new Error("Error when uploading images.");
  };

  return (
    <>
      <div className="mx-auto flex h-fit min-h-screen w-fit flex-col items-center gap-4 px-3 xl:w-full">
        <div className="mt-4 flex w-full flex-row items-center justify-between xl:flex-col xl:gap-2">
          <h1 className="w-fit text-2xl font-semibold text-cprimary">
            Upload your image files
          </h1>
          {files?.length > 0 && (
            <Button
              className="h-10 w-56 text-[#FFFFFF] xl:w-full"
              onClick={async () => {
                toast.promise(uploadImagesToSupabase(files as File[]), {
                  loading: "Uploading images...",
                  success: "Images uploaded successfully",
                  error: "Error when uploading images",
                });
              }}
            >
              Submit
            </Button>
          )}
        </div>
        <div className="h-fit w-[1000px] xl:w-full">
          <DropAndDragZone
            className="rounded-lg border border-foreground/10 p-16 hover:cursor-pointer"
            maxFiles={40}
            onFilesChange={(files) => setFiles(files)}
          />
        </div>
      </div>
    </>
  );
}
