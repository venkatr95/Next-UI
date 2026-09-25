"use client";

import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@next-ui/navbar";
import { Tabs, Tab } from "@next-ui/tabs";
import { Breadcrumbs, BreadcrumbItem } from "@next-ui/breadcrumbs";
import { Pagination } from "@next-ui/pagination";
import { Link } from "@next-ui/link";
import { Button } from "@next-ui/button";

export default function NavigationPage() {
  return (
    <div className="space-y-12 p-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Navbar</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Navigation bar for app headers.
        </p>
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <Navbar isBordered maxWidth="full">
            <NavbarBrand>
              <span className="font-bold text-lg">Next-UI</span>
            </NavbarBrand>
            <NavbarContent>
              <NavbarItem>
                <Link href="#">Home</Link>
              </NavbarItem>
              <NavbarItem>
                <Link href="#">Docs</Link>
              </NavbarItem>
              <NavbarItem>
                <Link href="#">Components</Link>
              </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
              <NavbarItem>
                <Button size="sm">Sign In</Button>
              </NavbarItem>
            </NavbarContent>
          </Navbar>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Tabs</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Tabbed navigation for organizing content.
        </p>
        <div className="space-y-8">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Solid</p>
            <Tabs variant="solid" defaultSelectedKey="tab1">
              <Tab tabKey="tab1">Overview</Tab>
              <Tab tabKey="tab2">Details</Tab>
              <Tab tabKey="tab3">Settings</Tab>
            </Tabs>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Underlined</p>
            <Tabs variant="underlined" color="primary" defaultSelectedKey="a">
              <Tab tabKey="a">Tab A</Tab>
              <Tab tabKey="b">Tab B</Tab>
              <Tab tabKey="c">Tab C</Tab>
            </Tabs>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Breadcrumbs</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Breadcrumb navigation for hierarchy.
        </p>
        <div className="space-y-4">
          <Breadcrumbs>
            <BreadcrumbItem>Home</BreadcrumbItem>
            <BreadcrumbItem>Components</BreadcrumbItem>
            <BreadcrumbItem isCurrent>Navigation</BreadcrumbItem>
          </Breadcrumbs>
          <Breadcrumbs variant="bordered" separator="›">
            <BreadcrumbItem>Docs</BreadcrumbItem>
            <BreadcrumbItem>Getting Started</BreadcrumbItem>
            <BreadcrumbItem isCurrent>Installation</BreadcrumbItem>
          </Breadcrumbs>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Pagination</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Pagination for navigating through pages.
        </p>
        <div className="space-y-6">
          <Pagination total={10} initialPage={1} color="primary" />
          <Pagination total={20} initialPage={5} variant="bordered" />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Link</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Styled links for navigation.
        </p>
        <div className="flex flex-wrap gap-6">
          <Link href="#">Default Link</Link>
          <Link href="#" color="primary">
            Primary Link
          </Link>
          <Link href="#" color="secondary">
            Secondary Link
          </Link>
          <Link href="#" underline="hover">
            Underline on Hover
          </Link>
        </div>
      </div>
    </div>
  );
}
