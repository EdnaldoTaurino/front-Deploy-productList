import { Dialog } from "primereact/dialog";
// interfaces
import DialogDeleteProductsProps from "../interfaces/iDialogDeleteProducts";
export default function DialogDeleteProducts({
  deleteProductDialog,
  hideModal,
  deleteProduct,
  deleteProductDialogFooter,
}: DialogDeleteProductsProps) {
  return (
    <Dialog
      visible={deleteProductDialog}
      style={{ width: "450px" }}
      header="Deletar Produto"
      modal
      footer={deleteProductDialogFooter}
      onHide={hideModal}
    >
      <div>
        <i
          className="pi pi-exclamation-triangle mr-3"
          style={{ fontSize: "2rem" }}
        />
        <span>
          Tem certeza que deseja deletar o produto: <b>{deleteProduct?.name}</b>
          ?
        </span>
      </div>
    </Dialog>
  );
}
