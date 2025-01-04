import { Dialog } from "primereact/dialog";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Controller } from "react-hook-form";
// interfaces
import DialogProductsProps from "../interfaces/iDialogProduct";

export default function DialogProducts({
  control,
  handleSubmit,
  saveProduct,
  hideModal,
  product,
  productDialogFooter,
  productDialog,
}: DialogProductsProps) {
  return (
    <Dialog
      visible={productDialog}
      style={{ width: "450px" }}
      header={product?.id ? "Editar Produto" : "Novo Produto"}
      modal
      footer={productDialogFooter}
      onHide={hideModal}
    >
      <form
        onSubmit={handleSubmit(saveProduct)}
        className="flex flex-column gap-2"
      >
        <div className="field flex align-items-center">
          <label htmlFor="name" className="w-8rem  pr-4">
            Nome
          </label>

          <div className="flex-1">
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <InputText
                    id={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    className={fieldState.error ? "p-invalid w-full" : "w-full"}
                  />

                  {fieldState.error && (
                    <small className="p-error">
                      {fieldState.error.message}
                    </small>
                  )}
                </>
              )}
            />
          </div>
        </div>

        <div className="field flex align-items-center">
          <label htmlFor="price" className="w-8rem  pr-4">
            Preço
          </label>

          <div className="flex-1">
            <Controller
              name="price"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <InputNumber
                    id={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                    mode="currency"
                    currency="BRL"
                    className={fieldState.error ? "p-invalid w-full" : "w-full"}
                  />

                  {fieldState.error && (
                    <small className="p-error">
                      {fieldState.error.message}
                    </small>
                  )}
                </>
              )}
            />
          </div>
        </div>

        <div className="field flex align-items-center">
          <label htmlFor="amount" className="w-8rem  pr-4">
            Quantidade
          </label>

          <div className="flex-1">
            <Controller
              name="amount"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <InputNumber
                    id={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                    className={fieldState.error ? "p-invalid w-full" : "w-full"}
                  />

                  {fieldState.error && (
                    <small className="p-error">
                      {fieldState.error.message}
                    </small>
                  )}
                </>
              )}
            />
          </div>
        </div>
      </form>
    </Dialog>
  );
}
