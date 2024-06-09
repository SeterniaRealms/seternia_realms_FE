import { toast, ToastContent } from "react-toastify";
import { useRecoilValue } from "recoil";

type TUseSnackbarTypes = "info" | "success" | "warning" | "error" | "default";

interface IUseSnackbarTypes {
  variant: TUseSnackbarTypes;
}

interface IUseSnackbarResponse {
  enqueueSnackbar: (
    message: string | ToastContent,
    type: IUseSnackbarTypes
  ) => void;
}

export function useSnackbar(): IUseSnackbarResponse {

  function enqueueSnackbar(
    message: string | ToastContent,
    type: IUseSnackbarTypes
  ): void {
    let adjustColorFont: string | undefined = undefined;
      adjustColorFont = 'black'
    toast[type.variant ?? "default"](message, adjustColorFont ? { style: { color: adjustColorFont } } : null);
  }
  return {
    enqueueSnackbar,
  };
}
