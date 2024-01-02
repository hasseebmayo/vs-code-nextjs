import { useEffect } from "react";

type KeyHandler = () => void;

export const useKeyPress = (
  targetKey: string,
  onAction: KeyHandler,
  checkShift: boolean = false
) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((!checkShift || event.shiftKey) && event.key === targetKey) {
        onAction();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [targetKey, onAction]);
};

export default useKeyPress;
