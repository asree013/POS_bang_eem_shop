'use client'
import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Loadding from "@/components/Loadding/Loadding";
import { useEffect } from "react";

export default function Home() {
  function onReditrect() {
    window.location.href = '/auth/signin'
  }

  useEffect(() => {
    onReditrect()
  }, [onReditrect])
  return (
    <>
      <Loadding />
      {/* <DefaultLayout>
        <ECommerce />
      </DefaultLayout> */}
    </>
  );
}
