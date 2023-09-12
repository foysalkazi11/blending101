type ObjValidationTypeByNumber = {
  value: number;
  message: string;
};
type ObjValidationTypeByString = {
  value: string;
  message: string;
};
export type InputValidationObjType = {
  required?: boolean | string;
  min?: number | ObjValidationTypeByNumber;
  max?: number | ObjValidationTypeByNumber;
  minLength?: number | ObjValidationTypeByNumber;
  maxLength?: number | ObjValidationTypeByNumber;
  pattern?: string | ObjValidationTypeByString;
  validate?: (value: any) => boolean | string;
  valueAsNumber?: boolean;
  valueAsDate?: boolean;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
