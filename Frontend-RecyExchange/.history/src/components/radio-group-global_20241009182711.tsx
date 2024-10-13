import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"

export default function Component() {
  const [selectedValue, setSelectedValue] = useState("comfortable")

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    alert(`Selected option: ${selectedValue}`)
  }
  const options = [
    { id: "check-recycling", label: "Check Available Recycling", description: "This option allows you to check which recycling is available for collection in your area. Remember that you can communicate with the client through the integrated chat.." },
    { id: "post-recycling", label: "Post Recycling", description: "This option allows you to post your recycling for pickup. If you have questions about what you can recycle, you can enter here.." },
  ];

  const [selectedDescription, setSelectedDescription] = useState<string>("");

  const handleRadioChange = (description: string) => {
    setSelectedDescription(description);
  };


  return (
    <Card className="w-full max-w-lg bg-green-100 border border-blue-500 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 duration-300">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Select an option</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={selectedValue} onValueChange={setSelectedValue}>
            <div className="flex items-center space-x-2 mb-2">
              <RadioGroupItem value="default" id="r1" />
              <Label htmlFor="r1">Default</Label>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <RadioGroupItem value="comfortable" id="r2" />
              <Label htmlFor="r2">Comfortable</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem className="" value="compact" id="r3"/>
              <Label className="" htmlFor="r3">Compact</Label>
            </div>
          </RadioGroup>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">Submit</Button>
        </CardFooter>
      </form>

      <div className="mt-8 w-full max-w-lg bg-white border border-blue-500 p-4 rounded-lg shadow-md transition-opacity duration-300">
        <h3 className="text-lg font-semibold leading-6 text-gray-900">
          
          Description of each option
        </h3>
        <p className="mt-2 text-sm leading-6 text-gray-600">
          {selectedDescription || "Select an option to see the description here."}
        </p>
      </div>
    </Card>
  )
}