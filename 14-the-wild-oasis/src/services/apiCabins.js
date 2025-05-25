import supabase from "./supabase";

const supabaseUrl = "https://rjdsuvgaehzckefgtaxe.supabase.co"

export async function getCabins() {
  let { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return cabins;
}

export async function createCabin(data) {
  const {imageName, imagePath} = await generateImagePath(data.image.name)
  const { error } = await supabase.from("cabins").insert([{...data, image: imagePath}]).select();
  if (error) {
    throw new Error("Couldn't create cabin");
  }

  await uploadImage(imageName, data.image, data.id)
}

export async function duplicateCabin(data) {
  const { error } = await supabase.from("cabins").insert([{...data}]).select();
  if (error) {
    throw new Error("Couldn't create cabin");
  }
}

export async function updateCabin(data, editId) {
  let imagePath;
  const updateData = {...data};

  if (data.image) {
    const {imageName, imagePath: path} = await generateImagePath(data.image.name)
    imagePath = path;
    await uploadImage(imageName, data.image, data.id)
  }

  if (imagePath) {
    updateData.image = imagePath;
  } 

  const { error } = await supabase
  .from('cabins')
  .update({...updateData})
  .eq('id', editId)
  .select()
  
  if(error) {
    throw new Error("Couldn't edit cabin")
  }
}

export async function deleteCabin(id) {
  const {error} = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    throw new Error("Couldn't delete cabin");
  }
}

async function generateImagePath(name) {
  const imageName = `${Math.random()}-${name}`.replaceAll("/", "");
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
  return {imageName, imagePath};
}

async function uploadImage(imageName, image, id) {
  const {error: storageError} = await supabase.storage
  .from("cabin-images")
  .upload(imageName, image)

  if(storageError) {
    await supabase.from("cabins").delete().eq("id", id)
    throw new Error("Cabin image could not be uploaded and cabin was not created");
  }
}