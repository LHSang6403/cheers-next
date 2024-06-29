"use client";

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
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { array } from "zod";

export default function page() {
  const product = [
    {
      position: {
        x1: 0.3,
        y1: 0.3,
        x2: 0.7,
        y2: 0.7,
      },
      brand: {
        tiger: 0.3,
        heineken: 0.7,
        larue: 0.1,
      },
      type: "signage",
    },
  ];

  const space = {
    restaurant: 0.8,
    event: 0.2,
  };

  const staff = [
    {
      position: {
        x1: 0.3,
        y1: 0.3,
        x2: 0.7,
        y2: 0.7,
      },
      value: 0.5,
    },
  ];

  const drinker = [
    {
      position: {
        x1: 0.3,
        y1: 0.3,
        x2: 0.7,
        y2: 0.7,
      },
      value: 0.5,
    },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col overflow-hidden px-4 pb-4 sm:px-2 sm:pb-2">
      <Breadcrumb className="my-3">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink className="font-medium" href="/">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink className="font-medium" href="/dashboard">
              Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink className="font-medium" href="/dashboard">
              Image...
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-row gap-4 lg:flex-col">
        <div className="h-fit w-1/2 overflow-hidden rounded-lg shadow-sm lg:mx-auto lg:w-fit">
          <Image
            alt="Product"
            src="/assets/heineken.jpeg"
            width={1000}
            height={1000}
          />
        </div>
        <Card className="h-full w-1/2 lg:w-full">
          <CardHeader>
            <CardTitle>Image name...</CardTitle>
            <CardDescription>Description of the image...</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-fit flex-col gap-4 !text-sm">
              <EachCategory
                title="Brand"
                tags={[
                  { label: "Value A", value: 0.6 },
                  { label: "Value Aaaaa", value: 0.6 },
                  { label: "Value Acc", value: 0.6 },
                  { label: "Value Accccc", value: 0.6 },
                ]}
              />
              <EachCategory
                title="Category"
                tags={[
                  { label: "Value A", value: 0.6 },
                  { label: "Value Aeeeeee", value: 0.6 },
                  { label: "Value Awwww", value: 0.6 },
                  { label: "Value A", value: 0.6 },
                ]}
              />
              <EachCategory
                title="Space"
                tags={[
                  { label: "Value AAAAA", value: 0.6 },
                  { label: "Value Abbbb", value: 0.6 },
                  { label: "Value Arrrr", value: 0.6 },
                  { label: "Value A", value: 0.6 },
                ]}
              />
              <EachCategory
                title="Staff"
                tags={[
                  { label: "Value A", value: 0.6 },
                  { label: "Value Adddddd", value: 0.6 },
                  { label: "Val", value: 0.6 },
                  { label: "Value Aeeeeee", value: 0.6 },
                  { label: "Val", value: 0.6 },
                  { label: "Value Aeeeeee", value: 0.6 },
                  { label: "Value A", value: 0.6 },
                  { label: "Value Aeeeeee", value: 0.6 },
                  { label: "Value A", value: 0.6 },
                  { label: "Value Aeeeeee", value: 0.6 },
                ]}
              />
              <EachCategory
                title="Drinker"
                tags={[
                  { label: "Value Aaaaaa", value: 0.6 },
                  { label: "Value Awwww", value: 0.6 },
                  { label: "Value A", value: 0.6 },
                  { label: "Value A", value: 0.6 },
                ]}
              />
            </div>
          </CardContent>
          <CardFooter className="mt-auto flex justify-between gap-4">
            <Button className="w-1/2" variant="outline">
              Back
            </Button>
            <Button className="w-1/2 text-[#FFFFFF]">
              <RefreshCw className="mr-1 h-3.5 w-3.5" />
              <span>Refetch</span>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

const EachCategory = ({
  title,
  tags,
}: {
  title: string;
  tags: {
    label: string;
    value: number;
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
