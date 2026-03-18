"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SectionTypography } from "./section-typography"
import { SectionColors } from "./section-colors"
import { SectionIcons } from "./section-icons"
import { SectionTextFields } from "./section-text-fields"

export function DesignSystemPage() {
  return (
    <Tabs defaultValue="typography">
      <div className="overflow-x-auto overflow-y-hidden sm:overflow-visible -mx-4 px-4 sm:mx-0 sm:px-0">
        <TabsList variant="line" className="w-max sm:w-auto min-w-full sm:min-w-0">
          <TabsTrigger value="typography">Typography</TabsTrigger>
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="icons">Icons & Logo</TabsTrigger>
          <TabsTrigger value="textfields">Text Fields</TabsTrigger>
          <TabsTrigger value="buttons">Buttons</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="typography" className="mt-6">
        <SectionTypography />
      </TabsContent>

      <TabsContent value="colors" className="mt-6">
        <SectionColors />
      </TabsContent>

      <TabsContent value="icons" className="mt-6">
        <SectionIcons />
      </TabsContent>

      <TabsContent value="textfields" className="mt-6">
        <SectionTextFields />
      </TabsContent>

      <TabsContent value="buttons" className="mt-6">
        <div className="text-muted-foreground text-body">Coming soon...</div>
      </TabsContent>
    </Tabs>
  )
}
