
import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const requestSchema = z.object({
  patientName: z.string().min(2, {
    message: "Patient name must be at least 2 characters.",
  }),
  hospitalName: z.string().min(2, {
    message: "Hospital name is required.",
  }),
  contactName: z.string().min(2, {
    message: "Contact name must be at least 2 characters.",
  }),
  contactPhone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  contactEmail: z.string().email({
    message: "Please enter a valid email address.",
  }),
  bloodType: z.string({
    required_error: "Please select the required blood type.",
  }),
  unitsNeeded: z.string().refine((val) => {
    const units = parseInt(val, 10);
    return !isNaN(units) && units > 0 && units <= 10;
  }, {
    message: "Units needed must be between 1 and 10.",
  }),
  urgency: z.enum(["urgent", "high", "medium", "low"], {
    required_error: "Please select the level of urgency.",
  }),
  reason: z.string().min(10, {
    message: "Please provide at least a brief description of the need.",
  }).max(500, {
    message: "Please keep the description under 500 characters.",
  }),
});

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const RequestBlood = () => {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [requestDetails, setRequestDetails] = useState<z.infer<typeof requestSchema> | null>(null);

  const form = useForm<z.infer<typeof requestSchema>>({
    resolver: zodResolver(requestSchema),
    defaultValues: {
      patientName: "",
      hospitalName: "",
      contactName: "",
      contactPhone: "",
      contactEmail: "",
      unitsNeeded: "1",
      urgency: "medium",
      reason: "",
    },
  });

  function onSubmit(values: z.infer<typeof requestSchema>) {
    console.log(values);
    setRequestDetails(values);
    setIsSubmitted(true);
    toast({
      title: "Blood Request Submitted!",
      description: "We've received your request and will contact you shortly.",
    });
  }

  if (isSubmitted && requestDetails) {
    return (
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-blood-navy">Blood Request Submitted</h1>
            <p className="text-gray-600 mt-2">
              Thank you for submitting your request. Our team will review it promptly.
            </p>
          </div>
          
          <Card className="border-none shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-xl font-semibold text-blood-navy mb-6">Request Details</h2>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-gray-500 text-sm">Patient Name</h3>
                    <p className="font-medium">{requestDetails.patientName}</p>
                  </div>
                  <div>
                    <h3 className="text-gray-500 text-sm">Hospital</h3>
                    <p className="font-medium">{requestDetails.hospitalName}</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-gray-500 text-sm">Blood Type Needed</h3>
                    <p className="font-medium">{requestDetails.bloodType}</p>
                  </div>
                  <div>
                    <h3 className="text-gray-500 text-sm">Units Needed</h3>
                    <p className="font-medium">{requestDetails.unitsNeeded}</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-gray-500 text-sm">Urgency</h3>
                    <p className="font-medium capitalize">{requestDetails.urgency}</p>
                  </div>
                  <div>
                    <h3 className="text-gray-500 text-sm">Contact</h3>
                    <p className="font-medium">{requestDetails.contactName}</p>
                    <p className="text-gray-600">{requestDetails.contactPhone}</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-gray-500 text-sm mb-2">Reason</h3>
                  <p className="text-gray-700">{requestDetails.reason}</p>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-gray-600 mb-4">
                  Our team will contact you within the next hour to confirm your request and provide further instructions.
                </p>
                <Button className="bg-blood hover:bg-blood-dark" onClick={() => setIsSubmitted(false)}>
                  Submit Another Request
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-blood text-white py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Request Blood</h1>
            <p className="text-white/90 text-lg">
              Fill out this form to request blood for a patient in need. We'll work quickly to fulfill your request.
            </p>
          </div>
        </div>
      </section>

      {/* Request Form */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-10">
            <h2 className="text-2xl font-bold text-blood-navy mb-6">Patient Information</h2>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="patientName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Patient Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="hospitalName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hospital Name</FormLabel>
                        <FormControl>
                          <Input placeholder="General Hospital" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="bloodType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Blood Type Needed</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select blood type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {bloodTypes.map((type) => (
                              <SelectItem key={type} value={type}>{type}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="unitsNeeded"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Units Needed</FormLabel>
                        <FormControl>
                          <Input type="number" min="1" max="10" {...field} />
                        </FormControl>
                        <FormDescription>
                          Maximum 10 units per request.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="urgency"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Urgency Level</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1 sm:flex-row sm:space-y-0 sm:space-x-4"
                        >
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="urgent" />
                            </FormControl>
                            <FormLabel className="font-normal">Urgent (Immediate)</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="high" />
                            </FormControl>
                            <FormLabel className="font-normal">High (Within 24h)</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="medium" />
                            </FormControl>
                            <FormLabel className="font-normal">Medium</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="low" />
                            </FormControl>
                            <FormLabel className="font-normal">Low</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="reason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reason for Request</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Please provide details about why the blood is needed."
                          className="resize-none min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        This helps us prioritize and process your request appropriately.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <h2 className="text-2xl font-bold text-blood-navy pt-4">Contact Information</h2>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="contactName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Jane Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="contactPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="(555) 123-4567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="contactEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Email</FormLabel>
                        <FormControl>
                          <Input placeholder="jane@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mt-4">
                  <p className="text-yellow-800 text-sm">
                    <strong>Important:</strong> For emergency situations requiring immediate blood, please call our emergency hotline at <strong>1-800-BLOOD-NOW</strong> in addition to submitting this form.
                  </p>
                </div>

                <div className="pt-4">
                  <Button type="submit" className="bg-blood hover:bg-blood-dark w-full md:w-auto">
                    Submit Request
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RequestBlood;
