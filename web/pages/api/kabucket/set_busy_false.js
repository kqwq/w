export default function handler(req, res) {
  process.fileUploadBusy = false;
  res.status(200).json({ success: true });
}
