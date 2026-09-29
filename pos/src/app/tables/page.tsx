'use client'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableOne from "@/components/Tables/TableOne";
import TableThree from "@/components/Tables/TableThree";
import TableTwo from "@/components/Tables/TableTwo";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Products } from "@/models/product.model";
import { useCallback, useEffect, useState } from "react";
import { findProductAll } from "@/services/product.service";

// export const metadata: Metadata = {
//   title: "Next.js Tables | TailAdmin - Next.js Dashboard Template",
//   description:
//     "This is Next.js Tables page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
// };

const page = () => {
  const [products, setProducts] = useState<Products[]>({} as Products[])
  const onFeedProduct = useCallback(async() => {
    try {
      const result = await findProductAll(1,10)
      setProducts(result.data)
    } catch (error: any) {
      alert(error.message)
    }
  }, [setProducts])

  useEffect(() => {
    onFeedProduct()
  }, [onFeedProduct])
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10">
        <TableOne product={products} />
        <TableTwo />
        <TableThree />
      </div>
    </DefaultLayout>
  );
};

export default page;
