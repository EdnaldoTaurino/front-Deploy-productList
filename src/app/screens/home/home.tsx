"use client";
import { unstable_noStore as noStore } from "next/cache";
import { useEffect, useRef, useState } from "react";
// PrimeReact
import { Panel } from "primereact/panel";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import { Tooltip } from "primereact/tooltip";
// hookForm
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// Hooks
import {
  useProducts,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
} from "../../hooks/useQuery";
// Interfaces
import ProductProps from "../../interfaces/iProducts";
// Components
import Table from "../../components/tableProducts";
import DialogProducts from "../../components/dialogProducts";
import DialogDeleteProducts from "../../components/dialogDeleteProducts";
// Utils
import productZodSchema from "../../utils/zod";

export default function HomePage() {
  noStore();
  const toast = useRef<Toast>(null);
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [product, setProduct] = useState<ProductProps | null>(null);

  const { data: products = [] } = useProducts();
  const updateProduct = useUpdateProduct();
  const createProduct = useCreateProduct();
  const deleteProduct = useDeleteProduct();

  const { control, handleSubmit, reset, setValue } = useForm<ProductProps>({
    resolver: zodResolver(productZodSchema),
    defaultValues: {
      id: "",
      name: "",
      price: 0,
      amount: 0,
    },
  });

  useEffect(() => {
    if (product) {
      reset();
      setValue("id", product.id);
      setValue("name", product.name);
      setValue("price", product.price);
      setValue("amount", product.amount);
    }
  }, [product, setValue, reset]);

  const openNew = () => {
    setProduct({ id: "", name: "", price: 0, amount: 0, createdAt: "" });
    setProductDialog(true);
  };

  const hideModal = () => {
    reset();
    setProductDialog(false);
    setDeleteProductDialog(false);
  };

  const saveProduct = async (data: ProductProps) => {
    try {
      const payload = {
        name: data.name,
        price: data.price,
        amount: data.amount,
        createdAt: new Date().toISOString(),
      };

      if (product?.id) {
        await updateProduct.mutateAsync({ ...payload, id: data.id });
        toast.current?.show({
          severity: "success",
          summary: "Sucesso",
          detail: "Produto atualizado com sucesso",
        });
      } else {
        await createProduct.mutateAsync(payload);
        toast.current?.show({
          severity: "success",
          summary: "Sucesso",
          detail: "Produto criado com sucesso",
        });
      }

      setProductDialog(false);
      reset();
    } catch (error) {
      console.log(error);
      toast.current?.show({
        severity: "error",
        summary: "Erro",
        detail: "Erro ao salvar produto",
      });
    }
  };
  const editProduct = (product: ProductProps) => {
    setProduct({ ...product });
    setProductDialog(true);
  };

  const confirmDeleteProduct = (product: ProductProps) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };

  const handleDeleteProduct = async () => {
    try {
      if (product?.id) {
        await deleteProduct.mutateAsync(product.id);
        toast.current?.show({
          severity: "success",
          summary: "Sucesso",
          detail: "Produto deletado com sucesso",
        });
        setDeleteProductDialog(false);
        setProduct(null);
      }
    } catch (error) {
      console.log(error);
      toast.current?.show({
        severity: "error",
        summary: "Erro",
        detail: "Erro ao deletar produto",
      });
    }
  };

  const leftToolbarTemplate = () => {
    return (
      <Button
        label="Novo"
        icon="pi pi-plus"
        severity="success"
        onClick={openNew}
      />
    );
  };

  const actionBodyTemplate = (rowData: ProductProps) => {
    return (
      <>
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="mr-2 edit-button"
          onClick={() => editProduct(rowData)}
          data-pr-tooltip="Editar"
        />
        <Tooltip target=".edit-button" position="left" />

        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          className="delete-button"
          onClick={() => confirmDeleteProduct(rowData)}
          data-pr-tooltip="Deletar"
        />
        <Tooltip target=".delete-button" position="right" />
      </>
    );
  };

  const productDialogFooter = (
    <>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        outlined
        onClick={hideModal}
      />
      <Button
        label="Salvar"
        icon="pi pi-check"
        onClick={handleSubmit(saveProduct)}
      />
    </>
  );

  const deleteProductDialogFooter = (
    <>
      <Button label="Não" icon="pi pi-times" outlined onClick={hideModal} />
      <Button
        label="Sim"
        icon="pi pi-check"
        severity="danger"
        onClick={handleDeleteProduct}
      />
    </>
  );

  return (
    <Panel header="Lista de produtos" style={{ padding: 4 }}>
      <Toast ref={toast} />
      <div>
        <Toolbar start={leftToolbarTemplate} />
      </div>

      <Table products={products} actionBodyTemplate={actionBodyTemplate} />
      <DialogProducts
        productDialog={productDialog}
        control={control}
        handleSubmit={handleSubmit}
        productDialogFooter={productDialogFooter}
        saveProduct={saveProduct}
        hideModal={hideModal}
        product={product}
      />

      <DialogDeleteProducts
        deleteProductDialog={deleteProductDialog}
        hideModal={hideModal}
        deleteProduct={product}
        deleteProductDialogFooter={deleteProductDialogFooter}
      />
    </Panel>
  );
}
