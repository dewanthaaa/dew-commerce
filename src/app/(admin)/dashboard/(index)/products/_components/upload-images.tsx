import React, { ChangeEvent, useRef, useEffect, useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Upload } from "lucide-react";
import { getImageUrl } from "@/lib/supabase";

interface UploadImagesProps {
  existingImages?: string[];
  onImagesChange?: (files: File[]) => void;
}

export default function UploadImages({
  existingImages,
  onImagesChange,
}: UploadImagesProps) {
  const ref = useRef<HTMLInputElement>(null);

  const [previewImages, setPreviewImages] = useState<string[]>([
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
  ]);

  useEffect(() => {
    if (existingImages && existingImages.length > 0) {
      const initialPreviews = existingImages.map((img) =>
        getImageUrl(img, "product")
      );
      while (initialPreviews.length < 3) {
        initialPreviews.push("/placeholder.svg");
      }
      setPreviewImages(initialPreviews);
    }
  }, [existingImages]);

  const openFolder = () => {
    if (ref.current) {
      ref.current.click();
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    // if (
    //   !thumbnailRef.current ||
    //   !imageFirstRef.current ||
    //   !imageSecondRef.current
    // ) {
    //   return;
    // }

    //   if (e.target.files && e.target.files.length >= 3) {
    //     thumbnailRef.current.src = URL.createObjectURL(e.target.files[0]);
    //     imageFirstRef.current.src = URL.createObjectURL(e.target.files[1]);
    //     imageSecondRef.current.src = URL.createObjectURL(e.target.files[2]);
    //   }
    // };

    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      const newPreviewUrls = newFiles.map((file) => URL.createObjectURL(file));

      const updatedPreviews = [...previewImages];
      newPreviewUrls.forEach((url, index) => {
        if (index < 3) {
          updatedPreviews[index] = url;
        }
      });

      setPreviewImages(updatedPreviews);

      if (onImagesChange) {
        onImagesChange(newFiles);
      }
    }
  };

  return (
    <Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">
      <CardHeader>
        <CardTitle>Product Images</CardTitle>
        <CardDescription>
          Lipsum dolor sit amet, consectetur adipiscing elit
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <Image
            alt="Product image"
            className="aspect-square w-full rounded-md object-cover"
            height="300"
            src={previewImages[0]}
            width="300"
            // ref={thumbnailRef}
          />
          <div className="grid grid-cols-3 gap-2">
            <button>
              <Image
                alt="Product image"
                className="aspect-square w-full rounded-md object-cover"
                height="84"
                src={previewImages[1]}
                width="84"
                // ref={imageFirstRef}
              />
            </button>
            <button>
              <Image
                alt="Product image"
                className="aspect-square w-full rounded-md object-cover"
                height="84"
                src={previewImages[2]}
                width="84"
                // ref={imageSecondRef}
              />
            </button>
            <button
              type="button"
              onClick={openFolder}
              className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed"
            >
              <Upload className="h-4 w-4 text-muted-foreground" />
              <span className="sr-only">Upload</span>
            </button>
            <input
              ref={ref}
              onChange={onChange}
              type="file"
              name="images"
              className="hidden"
              accept="images/*"
              multiple
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// const thumbnailRef = useRef<HTMLImageElement>(null);
// const imageFirstRef = useRef<HTMLImageElement>(null);
// const imageSecondRef = useRef<HTMLImageElement>(null);
