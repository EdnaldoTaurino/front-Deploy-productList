import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
// interfaces
import ProductProps from "../interfaces/iProducts";

interface TableProps {
  products: ProductProps[];
  actionBodyTemplate: (rowData: ProductProps) => React.ReactNode;
}

export default function Table({ products, actionBodyTemplate }: TableProps) {
  return (
    <DataTable
      value={products}
      paginator
      rows={10}
      emptyMessage="Nenhum produto encontrado, clique em novo para adicionar."
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      currentPageReportTemplate=" Mostrando {first} a {last} de {totalRecords} produtos"
      rowsPerPageOptions={[5, 10, 25]}
      className="p-datatable-sm"
      size="small"
      breakpoint="768px"
      stripedRows
    >
      <Column field="name" header="Nome" sortable />
      <Column
        field="price"
        header="Preço"
        body={(rowData) => `R$ ${rowData.price.toFixed(2)}`}
        sortable
      />
      <Column field="amount" header="Quantidade" sortable />
      <Column
        body={actionBodyTemplate}
        exportable={false}
        style={{ minWidth: "8rem" }}
      />
    </DataTable>
  );
}
