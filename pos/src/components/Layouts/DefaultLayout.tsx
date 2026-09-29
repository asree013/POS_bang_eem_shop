"use client";
import React, { useState, ReactNode, useEffect, useCallback } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Users } from "@/models/user.model";
import { userFindMe } from "@/services/auth.service";
import { FindMeContext } from "@/contexts/findme.context";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [findMe, setFindMe] = useState<Users>({} as Users)

  const onFeedFindMe = useCallback(async () => {
    const jwt = localStorage.getItem('jwt')
    if (!jwt) {
      window.location.href = '/auth/signin'
      localStorage.removeItem('jwt')
    }
    try {
      const result = await userFindMe(String(jwt))
      setFindMe(result.data)
    } catch (error) {
      console.log(error);
      window.location.href = '/auth/signin'
      localStorage.removeItem('jwt')
    }
  }, [setFindMe])

  useEffect(() => {
    onFeedFindMe()

  }, [onFeedFindMe])
  return (
    <>
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <FindMeContext.Provider value={{findMe, setFindMe}}>
        <div className="flex">
          {/* <!-- ===== Sidebar Start ===== --> */}
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Sidebar End ===== --> */}

          {/* <!-- ===== Content Area Start ===== --> */}
          <div className="relative flex flex-1 flex-col lg:ml-72.5">
            {/* <!-- ===== Header Start ===== --> */}
            <Header findMe={findMe} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            {/* <!-- ===== Header End ===== --> */}

            {/* <!-- ===== Main Content Start ===== --> */}
            <main>
              <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                {children}
              </div>
            </main>
            {/* <!-- ===== Main Content End ===== --> */}
          </div>
          {/* <!-- ===== Content Area End ===== --> */}
        </div>
      </FindMeContext.Provider>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </>
  );
}
