// src/lib/cloudinaryUpload.js
export async function uploadImageToCloudinary(file) {
  const cloud = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  if (!cloud || !preset) throw new Error('Missing Cloudinary env vars');

  const url = `https://api.cloudinary.com/v1_1/${cloud}/image/upload`;
  const form = new FormData();
  form.append('file', file);
  form.append('upload_preset', preset);

  const res = await fetch(url, { method: 'POST', body: form });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error?.message || 'Upload failed');

  return data.secure_url; // CDN URL
}
