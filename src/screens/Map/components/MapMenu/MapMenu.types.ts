export type MapMenuProps = {
  radius: number;
  onRadiusChange: (radius: number) => void;
  onGendersChange: (genders: string[]) => void;
  onChange: (result: { genders: string[]; radius: number }) => void;
  onOpen: (value: boolean) => void;
};
