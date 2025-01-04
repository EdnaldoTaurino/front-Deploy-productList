export default interface DialogDeleteProductsProps {
  deleteProductDialog: boolean;
  hideModal: () => void;
  deleteProduct: { name: string } | null;
  deleteProductDialogFooter: React.ReactNode;
}
