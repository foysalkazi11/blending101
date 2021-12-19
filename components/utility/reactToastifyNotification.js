import { toast } from "react-toastify";

// type notificationProps = {
//   type?: string;
//   content?: string;
//   position?: string;
//   autoClose?: number;
//   hideProgressBar?: boolean;
//   closeOnClick?: boolean;
//   pauseOnHover?: boolean;
//   draggable?: boolean;
//   progress?: boolean | undefined;
// };

const notification = (
  type = "",
  content = "",
  position = "top-right",
  autoClose = 5000,
  hideProgressBar = false,
  closeOnClick = true,
  pauseOnHover = true,
  draggable = true,
  progress = undefined
) => {
  if (type === "success") {
    return toast.success(content, {
      //@ts-ignore
      position,
      autoClose,
      hideProgressBar,
      closeOnClick,
      pauseOnHover,
      draggable,
      progress,
    });
  }
  if (type === "error") {
    return toast.error(content, {
      //@ts-ignore
      position,
      autoClose,
      hideProgressBar,
      closeOnClick,
      pauseOnHover,
      draggable,
      progress,
    });
  }
  if (type === "info") {
    return toast.info(content, {
      //@ts-ignore
      position,
      autoClose,
      hideProgressBar,
      closeOnClick,
      pauseOnHover,
      draggable,
      progress,
    });
  }
  if (type === "warning") {
    return toast.warning(content, {
      //@ts-ignore
      position,
      autoClose,
      hideProgressBar,
      closeOnClick,
      pauseOnHover,
      draggable,
      progress,
    });
  }
  return toast.default(content, {
    //@ts-ignore
    position,
    autoClose,
    hideProgressBar,
    closeOnClick,
    pauseOnHover,
    draggable,
    progress,
  });
};

export default notification;
