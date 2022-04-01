import { toast } from "react-toastify";

export const toastError = (error) => {
  let message = null;
  if (typeof error === "object" && error.message) {
    ({ message } = error);
  }
  if (message !== null && typeof message !== "undefined" && message !== "") {
    toast.error(message);
  }
  toast.error(error);
};

export const toastSuccess = (message) => {
  if (message !== null && typeof message !== "undefined" && message !== "") {
    toast.success(message);
  }
};
export const toastPromise = (message) => {
  const resolveAfter3Sec = new Promise(resolve => setTimeout(resolve, 4000));
  toast.promise(
      resolveAfter3Sec,
      {
        pending: 'Promise is pending',
        success: message,
        error: 'Đã có lỗi sảy ra...'
      }
  )
};