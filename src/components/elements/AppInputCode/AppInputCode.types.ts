export type AppInputCodeProps = {
  value?: string;
  isError?: boolean;
  length?: number;
  onValueChange?: (text: string) => void;
  onFill?: (text: string) => void;
};
