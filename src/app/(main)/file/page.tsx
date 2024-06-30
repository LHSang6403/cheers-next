"use client";

import { useState } from "react";
import createSupabaseBrowserClient from "@/supabase/client";
import DropAndDragZone from "@/components/File/DropAndDragZone";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  ImageType,
  ProductType,
  DrinkerType,
  SpaceType,
  StaffType,
} from "@utils/types/index";
import { v4 as uuidv4 } from "uuid";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const EachCategory = ({
  title,
  tags,
}: {
  title: string;
  tags: {
    label: string;
    value: any;
  }[];
}) => {
  const colorArr = [
    "bg-red-200",
    "bg-yellow-200",
    "bg-blue-200",
    "bg-green-200",
    "bg-purple-200",
    "bg-pink-200",
    "bg-indigo-200",
    "bg-cyan-200",
    "bg-teal-200",
  ];

  return (
    <div className="h-fit">
      <h3 className="mb-1 font-semibold">{title}</h3>
      <div className="flex h-fit flex-row flex-wrap gap-1.5">
        {tags.map((tag, index) => (
          <Badge
            key={index}
            className={`${
              colorArr[
                Math.floor(
                  (index + Math.random() * colorArr.length) % colorArr.length
                )
              ]
            } shadow-sm hover:bg-foreground hover:text-background`}
          >
            {tag.label} {tag.value}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default function page() {
  const supabase = createSupabaseBrowserClient();

  const [isDOpen, setIsDOpen] = useState<boolean>(false);
  const [res, setRes] = useState<any>(null);

  const router = useRouter();

  const [files, setFiles] = useState<File[]>([]);

  const processImage = async (files: File[]) => {
    toast.promise(
      async () => {
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

        const res = await axios.post(
          "http://localhost:3001/predict",
          {
            link:
              "https://ieocflhkecudisgjolkc.supabase.co/storage/v1/object/public/images/" +
              imagesUploadResults[0],
          },
          {}
        );

        console.log("----", res);
        setRes(res);
      },
      {
        loading: "Processing images...",
        success: () => {
          setIsDOpen(true);
          return "Images uploaded successfully";
        },
        error: "Error when uploading images",
      }
    );
  };

  // const product_brands =
  //   res?.data?.data?.products?.map((product: any) => {
  //     return product.map((product: any) => {
  //       return {
  //         brand: {
  //           ...product.brand,
  //         },
  //         type: product.type,
  //       };
  //     }
  //   }) ?? [];

  const drinkers =
    res?.data?.data?.drinkers?.map((drinker: any) => {
      return {
        position: {
          ...drinker.position,
        },
        value: drinker.value,
      };
    }) ?? [];

  const staffs =
    res?.data?.data?.drinkers?.map((drinker: any) => {
      return {
        position: {
          ...drinker.position,
        },
        value: drinker.value,
      };
    }) ?? [];

  const spaces = Object.keys(res?.data?.data?.spaces ?? {}).map((key) => {
    return {
      label: key,
      value: parseFloat(res?.data?.data?.spaces[key]).toFixed(2),
    };
  });

  const products =
    res?.data?.data?.products?.map((product: any) => {
      return {
        position: {
          ...product.position,
        },
        brand: {
          ...product.brand,
        },
        type: product.type,
      };
    }) ?? [];

  console.log("----", drinkers, staffs, spaces, products);

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
                await processImage(files as File[]);
              }}
            >
              Submit
            </Button>
          )}
        </div>
        <div className="h-fit w-[1000px] xl:w-full">
          <DropAndDragZone
            className="rounded-lg border border-foreground/10 p-16 hover:cursor-pointer"
            maxFiles={1}
            onFilesChange={(files) => setFiles(files)}
          />
        </div>
        <>
          <Dialog open={isDOpen} onOpenChange={setIsDOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">Information</Button>
            </DialogTrigger>
            <DialogContent className="!max-w-[1400px] rounded-md">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="flex h-fit flex-col gap-4 !text-sm">
                <EachCategory
                  title="Drinker"
                  tags={[
                    ...drinkers?.map((drinker: DrinkerType) => {
                      return {
                        label: JSON.stringify(drinker.position),
                        value: drinker.value.toFixed(2),
                      };
                    }),
                  ]}
                />
                <EachCategory title="Brands" tags={[]} />
                {JSON.stringify(
                  res?.data?.data?.products?.map((product: any) => {
                    const newProduct = product;
                    const prod_prob = parseFloat(product.value);
                    Object.keys(product.brands).forEach((key: string) => {
                      newProduct.brands[key] = (
                        parseFloat(product.brands[key]) * prod_prob
                      ).toFixed(2);
                    });

                    return {
                      brand: newProduct.brands,
                      type: newProduct.type,
                    };
                  })
                )}
                {/* <EachCategory
                  title="Brand"
                  tags={[
                    ...product_brands?.map((product: ProductType) => {
                      return {
                        label: JSON.stringify(product.brand),
                        value: product.type,
                      };
                    }),
                  ]}
                /> */}
                <EachCategory title="Space" tags={[...spaces]} />
                <EachCategory
                  title="Staff"
                  tags={[
                    ...staffs?.map((drinker: DrinkerType) => {
                      return {
                        label: JSON.stringify(drinker.position),
                        value: drinker.value.toFixed(2),
                      };
                    }),
                  ]}
                />
              </div>
            </DialogContent>
            <CardFooter className="mt-auto flex justify-between gap-4">
              <Button className="w-1/2" variant="outline">
                Back
              </Button>
              <Button className="w-1/2 text-[#FFFFFF]">
                <RefreshCw className="mr-1 h-3.5 w-3.5" />
                <span>Refetch</span>
              </Button>
            </CardFooter>
          </Dialog>
        </>
      </div>
    </>
  );
}
