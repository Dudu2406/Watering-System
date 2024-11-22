import { toast } from 'react-toastify';
export function useToast() {
  const showToast = {
    success: (message, options = {}) => {
      toast.success(message, {
        position: options.position || 'top-center',
        autoClose: options.autoClose || 5000,
        hideProgressBar: options.hideProgressBar || false,
        pauseOnHover: options.pauseOnHover || false,
        closeOnClick: options.closeOnClick || true,
      });
    },
    errormsg: (message, options = {}) => {
      toast.error(message, {
        position: options.position || 'top-center',
        autoClose: options.autoClose || 5000,
        hideProgressBar: options.hideProgressBar || false,
        pauseOnHover: options.pauseOnHover || false,
        closeOnClick: options.closeOnClick || true,
      });
    },
    info: (message, options = {}) => {
      toast.info(message, {
        position: options.position || 'top-center',
        autoClose: options.autoClose || 5000,
        hideProgressBar: options.hideProgressBar || false,
        pauseOnHover: options.pauseOnHover || false,
        closeOnClick: options.closeOnClick || true,
      });
    },
    warn: (message, options = {}) => {
      toast.warn(message, {
        position: options.position || 'top-center',
        autoClose: options.autoClose || 5000,
        hideProgressBar: options.hideProgressBar || false,
        pauseOnHover: options.pauseOnHover || false,
        closeOnClick: options.closeOnClick || true,
      });
    },
    loading: (message, options = {}) => {
      const toastId = toast(message, {
        position: options.position || 'top-center',
        autoClose: options.autoClose || false,
        hideProgressBar: options.hideProgressBar || true,
        closeOnClick: options.closeOnClick || false,
        pauseOnHover: options.pauseOnHover || false,
        draggable: options.draggable || false,
        progress: options.progress || undefined,
      });
      return toastId; // Return the toastId
    },
  };

  return showToast;
}