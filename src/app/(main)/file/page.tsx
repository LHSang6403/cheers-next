import DropAndDragZone from "@/components/File/DropAndDragZone";
export default function File() {
  return (
    <>
      <div className="flex h-fit min-h-screen w-screen flex-col items-center gap-4 px-3">
        <h1 className="mt-4 text-2xl font-bold">Upload your image files</h1>
        <div className="h-fit w-[1000px] sm:w-full">
          <DropAndDragZone
            className="rounded-lg border border-foreground/10 p-16 hover:cursor-pointer"
            maxFiles={40}
          />
        </div>
      </div>
    </>
  );
}
