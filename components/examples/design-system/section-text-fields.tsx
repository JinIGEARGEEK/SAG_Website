"use client"

import { Input } from "@/components/ui/input"
import { SelectField } from "@/components/ui/select-field"
import {
  SectionTitle,
  SubTitle,
  DemoCard,
} from "./shared"

const COL_HEADER = "text-[11px] font-semibold text-dark-gray uppercase tracking-wider"
const ROW_LABEL = "text-body-small font-semibold text-dark-gray flex items-start"

const DEMO_OPTIONS = [
  { value: "1", label: "Option 1" },
  { value: "2", label: "Option 2" },
  { value: "3", label: "Option 3" },
]

export function SectionTextFields() {
  return (
    <div className="space-y-6">
      <SectionTitle number={4}>Text Fields</SectionTitle>

      {/* Input */}
      <SubTitle>Input Text</SubTitle>
      <DemoCard className="overflow-x-auto">
        {/* Desktop */}
        <div className="hidden md:block">
          <div className="grid grid-cols-[140px_1fr_1fr_1fr] gap-x-6 gap-y-6">
            <div />
            <div className={COL_HEADER}>Inactive / Active</div>
            <div className={COL_HEADER}>Disabled</div>
            <div className={COL_HEADER}>Error</div>

            <div className={`${ROW_LABEL} pt-6`}>Default</div>
            <div><Input label="Label" required placeholder="Input Text" /></div>
            <div><Input label="Label" required placeholder="Input Text" disabled /></div>
            <div><Input label="Label" required placeholder="Input Text" error="This field is required" /></div>

            <div className={`${ROW_LABEL} pt-6`}>Counter</div>
            <div><Input label="Label" required placeholder="Input Text" showCounter maxLength={150} /></div>
            <div><Input label="Label" required placeholder="Input Text" showCounter maxLength={150} disabled /></div>
            <div><Input label="Label" required placeholder="Input Text" showCounter maxLength={150} error="Maximum 150 characters" /></div>

            <div className={`${ROW_LABEL} pt-1`}>No Label</div>
            <div><Input placeholder="Input Text" /></div>
            <div><Input placeholder="Input Text" disabled /></div>
            <div><Input placeholder="Input Text" error="This field is required" /></div>
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden space-y-8">
          <div>
            <div className="text-body-small font-semibold mb-3">Default</div>
            <div className="space-y-4">
              <div>
                <div className={`${COL_HEADER} mb-2`}>Inactive / Active</div>
                <Input label="Label" required placeholder="Input Text" />
              </div>
              <div>
                <div className={`${COL_HEADER} mb-2`}>Disabled</div>
                <Input label="Label" required placeholder="Input Text" disabled />
              </div>
              <div>
                <div className={`${COL_HEADER} mb-2`}>Error</div>
                <Input label="Label" required placeholder="Input Text" error="This field is required" />
              </div>
            </div>
          </div>

          <div>
            <div className="text-body-small font-semibold mb-3">Counter</div>
            <div className="space-y-4">
              <div>
                <div className={`${COL_HEADER} mb-2`}>Inactive / Active</div>
                <Input label="Label" required placeholder="Input Text" showCounter maxLength={150} />
              </div>
              <div>
                <div className={`${COL_HEADER} mb-2`}>Disabled</div>
                <Input label="Label" required placeholder="Input Text" showCounter maxLength={150} disabled />
              </div>
              <div>
                <div className={`${COL_HEADER} mb-2`}>Error</div>
                <Input label="Label" required placeholder="Input Text" showCounter maxLength={150} error="Maximum 150 characters" />
              </div>
            </div>
          </div>

          <div>
            <div className="text-body-small font-semibold mb-3">No Label</div>
            <div className="space-y-4">
              <div>
                <div className={`${COL_HEADER} mb-2`}>Inactive / Active</div>
                <Input placeholder="Input Text" />
              </div>
              <div>
                <div className={`${COL_HEADER} mb-2`}>Disabled</div>
                <Input placeholder="Input Text" disabled />
              </div>
              <div>
                <div className={`${COL_HEADER} mb-2`}>Error</div>
                <Input placeholder="Input Text" error="This field is required" />
              </div>
            </div>
          </div>
        </div>
      </DemoCard>

      {/* Select */}
      <SubTitle>Select</SubTitle>
      <DemoCard className="overflow-x-auto">
        {/* Desktop */}
        <div className="hidden md:block">
          <div className="grid grid-cols-[140px_1fr_1fr_1fr] gap-x-6 gap-y-6">
            <div />
            <div className={COL_HEADER}>Inactive / Active</div>
            <div className={COL_HEADER}>Disabled</div>
            <div className={COL_HEADER}>Error</div>

            <div className={`${ROW_LABEL} pt-6`}>Default</div>
            <div><SelectField label="Label" required placeholder="Select option" options={DEMO_OPTIONS} /></div>
            <div><SelectField label="Label" required placeholder="Select option" options={DEMO_OPTIONS} disabled /></div>
            <div><SelectField label="Label" required placeholder="Select option" options={DEMO_OPTIONS} error="This field is required" /></div>

            <div className={`${ROW_LABEL} pt-1`}>No Label</div>
            <div><SelectField placeholder="Select option" options={DEMO_OPTIONS} /></div>
            <div><SelectField placeholder="Select option" options={DEMO_OPTIONS} disabled /></div>
            <div><SelectField placeholder="Select option" options={DEMO_OPTIONS} error="This field is required" /></div>
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden space-y-8">
          <div>
            <div className="text-body-small font-semibold mb-3">Default</div>
            <div className="space-y-4">
              <div>
                <div className={`${COL_HEADER} mb-2`}>Inactive / Active</div>
                <SelectField label="Label" required placeholder="Select option" options={DEMO_OPTIONS} />
              </div>
              <div>
                <div className={`${COL_HEADER} mb-2`}>Disabled</div>
                <SelectField label="Label" required placeholder="Select option" options={DEMO_OPTIONS} disabled />
              </div>
              <div>
                <div className={`${COL_HEADER} mb-2`}>Error</div>
                <SelectField label="Label" required placeholder="Select option" options={DEMO_OPTIONS} error="This field is required" />
              </div>
            </div>
          </div>

          <div>
            <div className="text-body-small font-semibold mb-3">No Label</div>
            <div className="space-y-4">
              <div>
                <div className={`${COL_HEADER} mb-2`}>Inactive / Active</div>
                <SelectField placeholder="Select option" options={DEMO_OPTIONS} />
              </div>
              <div>
                <div className={`${COL_HEADER} mb-2`}>Disabled</div>
                <SelectField placeholder="Select option" options={DEMO_OPTIONS} disabled />
              </div>
              <div>
                <div className={`${COL_HEADER} mb-2`}>Error</div>
                <SelectField placeholder="Select option" options={DEMO_OPTIONS} error="This field is required" />
              </div>
            </div>
          </div>
        </div>
      </DemoCard>

      {/* Textarea */}
      <SubTitle>Textarea</SubTitle>
      <DemoCard>
        <div className="text-body-small text-gray italic">Coming soon...</div>
      </DemoCard>
    </div>
  )
}
