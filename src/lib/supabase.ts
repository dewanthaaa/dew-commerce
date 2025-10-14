import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? "";

const supabase = createClient(supabaseUrl, supabaseKey);

export const getImageUrl = (name: string) => {
  const { data } = supabase.storage
    .from("belanja")
    .getPublicUrl(`public/brands/${name}`);

  return data.publicUrl;
};

export const uploadFile = async (
  file: File,
  path: "brands" | "product" = "brands"
) => {
  // contoh : "image/jpg" => image = [0] ; png = [1] => berlaku untuk ekstensi gambar lainnya
  const fileType = file.type.split("/")[1];
  const fileName = `${path}-${Date.now()}.${fileType}`;

  await supabase.storage
    .from("belanja")
    .upload(`public/${path}/${fileName}`, file, {
      cacheControl: "3600",
      upsert: false,
    });

  return fileName;
};

export const deleteFile = async (
  filename: string,
  path: "brands" | "product" = "brands"
) => {
  await supabase.storage.from("belanja").remove([`public/${path}/${filename}`]);
};
