import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/lib/theme-context";
import { NextUIProvider } from "@next-ui/core";
import { ToastProvider } from "@next-ui/toast";
import Landing from "@/pages/Landing";
import DocsLayout from "@/components/layout/DocsLayout";
import InstallationPage from "@/pages/docs/Installation";
import ThemePage from "@/pages/docs/Theme";
import ResponsivePage from "@/pages/docs/Responsive";
import AccordionPage from "@/pages/docs/components/AccordionPage";
import AlertPage from "@/pages/docs/components/AlertPage";
import AutocompletePage from "@/pages/docs/components/AutocompletePage";
import AvatarPage from "@/pages/docs/components/AvatarPage";
import BadgePage from "@/pages/docs/components/BadgePage";
import BreadcrumbsPage from "@/pages/docs/components/BreadcrumbsPage";
import ButtonPage from "@/pages/docs/components/ButtonPage";
import CardPage from "@/pages/docs/components/CardPage";
import CheckboxPage from "@/pages/docs/components/CheckboxPage";
import ChipPage from "@/pages/docs/components/ChipPage";
import CircularProgressPage from "@/pages/docs/components/CircularProgressPage";
import CodePage from "@/pages/docs/components/CodePage";
import DividerPage from "@/pages/docs/components/DividerPage";
import DropdownPage from "@/pages/docs/components/DropdownPage";
import DrawerPage from "@/pages/docs/components/DrawerPage";
import InputPage from "@/pages/docs/components/InputPage";
import KbdPage from "@/pages/docs/components/KbdPage";
import LinkPage from "@/pages/docs/components/LinkPage";
import ModalPage from "@/pages/docs/components/ModalPage";
import NavbarPage from "@/pages/docs/components/NavbarPage";
import PaginationPage from "@/pages/docs/components/PaginationPage";
import PopoverPage from "@/pages/docs/components/PopoverPage";
import ProgressPage from "@/pages/docs/components/ProgressPage";
import RadioGroupPage from "@/pages/docs/components/RadioGroupPage";
import SelectPage from "@/pages/docs/components/SelectPage";
import SkeletonPage from "@/pages/docs/components/SkeletonPage";
import SliderPage from "@/pages/docs/components/SliderPage";
import SnippetPage from "@/pages/docs/components/SnippetPage";
import SpacerPage from "@/pages/docs/components/SpacerPage";
import SpinnerPage from "@/pages/docs/components/SpinnerPage";
import SwitchPage from "@/pages/docs/components/SwitchPage";
import TablePage from "@/pages/docs/components/TablePage";
import TabsPage from "@/pages/docs/components/TabsPage";
import TextareaPage from "@/pages/docs/components/TextareaPage";
import TooltipPage from "@/pages/docs/components/TooltipPage";
import ToastPage from "@/pages/docs/components/ToastPage";
import UserPage from "@/pages/docs/components/UserPage";

export default function App() {
  return (
    <ThemeProvider>
      <NextUIProvider theme={{ mode: "system", style: "minimal" }}>
        <ToastProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/docs" element={<DocsLayout />}>
              <Route index element={<InstallationPage />} />
              <Route path="installation" element={<InstallationPage />} />
              <Route path="theme" element={<ThemePage />} />
              <Route path="responsive" element={<ResponsivePage />} />
              <Route path="components/accordion" element={<AccordionPage />} />
              <Route path="components/alert" element={<AlertPage />} />
              <Route path="components/autocomplete" element={<AutocompletePage />} />
              <Route path="components/avatar" element={<AvatarPage />} />
              <Route path="components/badge" element={<BadgePage />} />
              <Route path="components/breadcrumbs" element={<BreadcrumbsPage />} />
              <Route path="components/button" element={<ButtonPage />} />
              <Route path="components/card" element={<CardPage />} />
              <Route path="components/checkbox" element={<CheckboxPage />} />
              <Route path="components/chip" element={<ChipPage />} />
              <Route path="components/circular-progress" element={<CircularProgressPage />} />
              <Route path="components/code" element={<CodePage />} />
              <Route path="components/divider" element={<DividerPage />} />
              <Route path="components/dropdown" element={<DropdownPage />} />
              <Route path="components/drawer" element={<DrawerPage />} />
              <Route path="components/input" element={<InputPage />} />
              <Route path="components/kbd" element={<KbdPage />} />
              <Route path="components/link" element={<LinkPage />} />
              <Route path="components/modal" element={<ModalPage />} />
              <Route path="components/navbar" element={<NavbarPage />} />
              <Route path="components/pagination" element={<PaginationPage />} />
              <Route path="components/popover" element={<PopoverPage />} />
              <Route path="components/progress" element={<ProgressPage />} />
              <Route path="components/radio-group" element={<RadioGroupPage />} />
              <Route path="components/select" element={<SelectPage />} />
              <Route path="components/skeleton" element={<SkeletonPage />} />
              <Route path="components/slider" element={<SliderPage />} />
              <Route path="components/snippet" element={<SnippetPage />} />
              <Route path="components/spacer" element={<SpacerPage />} />
              <Route path="components/spinner" element={<SpinnerPage />} />
              <Route path="components/switch" element={<SwitchPage />} />
              <Route path="components/table" element={<TablePage />} />
              <Route path="components/tabs" element={<TabsPage />} />
              <Route path="components/textarea" element={<TextareaPage />} />
              <Route path="components/tooltip" element={<TooltipPage />} />
              <Route path="components/toast" element={<ToastPage />} />
              <Route path="components/user" element={<UserPage />} />
            </Route>
          </Routes>
        </ToastProvider>
      </NextUIProvider>
    </ThemeProvider>
  );
}
