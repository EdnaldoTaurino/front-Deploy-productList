import { Control, UseFormHandleSubmit } from "react-hook-form";
import ProductProps from "./iProducts";
export default interface DialogProductsProps {
  productDialog: boolean;
  control: Control<ProductProps>;
  handleSubmit: UseFormHandleSubmit<ProductProps>;
  productDialogFooter: React.ReactNode;
  saveProduct: (data: ProductProps) => Promise<void>;
  hideModal: () => void;
  product: ProductProps | null;
}
