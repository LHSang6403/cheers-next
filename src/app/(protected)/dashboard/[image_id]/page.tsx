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
      <div className="flex flex-row gap-4">
        <div className="h-fit w-1/2 overflow-hidden rounded-lg shadow-sm">
          <Image
            alt="Product"
            src="/assets/heineken.jpeg"
            width={800}
            height={800}
          />
        </div>
        <Card className="h-full w-1/2">
          <CardHeader>
            <CardTitle>Image name...</CardTitle>
            <CardDescription>Description of the image...</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-fit flex-col gap-4 !text-sm">
              <div className="h-fit">
                <h3 className="font-semibold">Brand</h3>
                <div className="h-fit">
                  <div className="flex flex-row justify-between">
                    <span>Tiger</span>
                    <span>0.6</span>
                  </div>
                  <div className="flex flex-row justify-between">
                    <span>Tiger</span>
                    <span>0.6</span>
                  </div>
                  <div className="flex flex-row justify-between">
                    <span>Tiger</span>
                    <span>0.6</span>
                  </div>
                </div>
              </div>
              <div className="h-fit">
                <h3 className="font-semibold">Category</h3>
                <div className="h-fit">
                  <div className="flex flex-row justify-between">
                    <span>Type</span>
                    <span>value</span>
                  </div>
                </div>
              </div>
              <div className="h-fit">
                <h3 className="font-semibold">Space</h3>
                <div className="h-fit">
                  <div className="flex flex-row justify-between">
                    <span>Restaurant</span>
                    <span>0.6</span>
                  </div>
                  <div className="flex flex-row justify-between">
                    <span>Grocery</span>
                    <span>0.6</span>
                  </div>
                </div>
              </div>
              <div className="h-fit">
                <h3 className="font-semibold">Staff</h3>
                <div className="h-fit">
                  <div className="flex flex-row justify-between">
                    <span>Value</span>
                    <span>0.6</span>
                  </div>
                </div>
              </div>
              <div className="h-fit">
                <h3 className="font-semibold">Drinker</h3>
                <div className="h-fit">
                  <div className="flex flex-row justify-between">
                    <span>Value</span>
                    <span>0.6</span>
                  </div>
                </div>
              </div>
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
