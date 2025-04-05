import React, { useState, useEffect } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, CheckCircle2, Clock, Droplet, MapPin } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { useSearchParams } from "react-router-dom";
import { bloodRequestService } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  age: z.string().refine((val) => {
    const age = parseInt(val, 10);
    return !isNaN(age) && age >= 18 && age <= 65;
  }, {
    message: "You must be between 18 and 65 years old to donate blood.",
  }),
  bloodType: z.string({
    required_error: "Please select your blood type.",
  }),
  donationDate: z.date({
    required_error: "Please select a donation date.",
  }),
  donationTime: z.string({
    required_error: "Please select a donation time slot.",
  }),
  donationCenter: z.string({
    required_error: "Please select a donation center.",
  }),
  previousDonation: z.enum(["yes", "no"], {
    required_error: "Please indicate if you've donated before.",
  }),
  medicalConditions: z.string().optional(),
  bloodRequestId: z.string().optional(),
});

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const donationCenters = [
  "Main Blood Center - Downtown",
  "Northside Medical Complex",
  "Westview Hospital",
  "Eastside Health Center",
  "South County Medical Center"
];
const timeSlots = [
  "09:00 AM - 10:00 AM",
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "01:00 PM - 02:00 PM",
  "02:00 PM - 03:00 PM",
  "03:00 PM - 04:00 PM",
  "04:00 PM - 05:00 PM"
];

interface BloodRequest {
  _id: string;
  patientName: string;
  hospitalName: string;
  bloodType: string;
  urgency: string;
  unitsNeeded: number;
  contactName: string;
}

const Donate = () => {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<z.infer<typeof formSchema> | null>(null);
  const [searchParams] = useSearchParams();
  const [bloodRequest, setBloodRequest] = useState<BloodRequest | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  
  const requestId = searchParams.get('requestId');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: "",
      age: "",
      previousDonation: "no",
      medicalConditions: "",
      bloodRequestId: requestId || undefined,
    },
  });

  useEffect(() => {
    if (requestId) {
      const fetchRequestDetails = async () => {
        setIsLoading(true);
        try {
          const response = await bloodRequestService.getRequestById(requestId);
          const request = response.data;
          setBloodRequest(request);
          
          form.setValue('bloodType', request.bloodType);
          form.setValue('donationCenter', request.hospitalName);
        } catch (error) {
          console.error("Error fetching blood request:", error);
          toast({
            title: "Error",
            description: "Failed to load blood request details",
            variant: "destructive"
          });
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchRequestDetails();
    }
  }, [requestId, form, toast]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const donationData = {
        ...values,
        donorId: user?.id || null
      };
      
      console.log(donationData);
      
      setBookingDetails(values);
      setIsSubmitted(true);
      
      toast({
        title: "Appointment Scheduled!",
        description: "Your blood donation appointment has been confirmed.",
      });
    } catch (error) {
      console.error("Error scheduling donation:", error);
      toast({
        title: "Error",
        description: "Failed to schedule donation. Please try again.",
        variant: "destructive"
      });
    }
  }

  if (isLoading) {
    return (
      <div className="bg-gray-50 min-h-screen flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blood mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading request details...</p>
        </div>
      </div>
    );
  }

  if (isSubmitted && bookingDetails) {
    return (
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-blood-navy">Donation Appointment Confirmed!</h1>
            <p className="text-gray-600 mt-2">
              Thank you for scheduling your blood donation. Your generosity will help save lives.
            </p>
          </div>
          
          <Card className="border-none shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-xl font-semibold text-blood-navy mb-6">Appointment Details</h2>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-gray-500 text-sm">Donor Name</h3>
                    <p className="font-medium">{bookingDetails.name}</p>
                  </div>
                  <div>
                    <h3 className="text-gray-500 text-sm">Blood Type</h3>
                    <p className="font-medium">{bookingDetails.bloodType}</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                  <div className="flex items-start gap-4">
                    <CalendarIcon className="h-5 w-5 text-blood mt-0.5" />
                    <div>
                      <p className="font-medium">Date & Time</p>
                      <p className="text-gray-600">
                        {format(bookingDetails.donationDate, "EEEE, MMMM d, yyyy")}
                        <span className="mx-2">•</span>
                        {bookingDetails.donationTime}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <MapPin className="h-5 w-5 text-blood mt-0.5" />
                    <div>
                      <p className="font-medium">Donation Center</p>
                      <p className="text-gray-600">{bookingDetails.donationCenter}</p>
                    </div>
                  </div>
                </div>
                
                {bloodRequest && (
                  <div className="bg-blood/5 border border-blood/20 rounded-lg p-4">
                    <h3 className="font-medium text-blood-navy mb-2">Blood Request Information</h3>
                    <p className="text-gray-700">
                      Your donation will help patient <span className="font-medium">{bloodRequest.patientName}</span> at {bloodRequest.hospitalName}.
                    </p>
                  </div>
                )}
                
                <div className="bg-blood/5 border border-blood/20 rounded-lg p-4">
                  <h3 className="font-medium text-blood-navy mb-2">Preparation Instructions</h3>
                  <ul className="text-gray-600 space-y-2">
                    <li>• Get a good night's sleep before donation day</li>
                    <li>• Eat a healthy meal before your appointment</li>
                    <li>• Stay hydrated by drinking extra water</li>
                    <li>• Bring a photo ID to your appointment</li>
                    <li>• Wear a short-sleeved shirt or a shirt with sleeves that roll up easily</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-gray-600 mb-4">
                  Need to reschedule? Give us a call at <span className="font-medium">1-800-DONATE</span>
                </p>
                <Button className="bg-blood hover:bg-blood-dark" onClick={() => setIsSubmitted(false)}>
                  Schedule Another Donation
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
      <section className="bg-blood text-white py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {bloodRequest ? `Donate for ${bloodRequest.patientName}` : "Schedule Your Blood Donation"}
            </h1>
            <p className="text-white/90 text-lg">
              {bloodRequest 
                ? `Your donation of ${bloodRequest.bloodType} blood will directly help this patient at ${bloodRequest.hospitalName}.` 
                : "Complete the form below to schedule your appointment. It takes just a few minutes and will help save lives."}
            </p>
          </div>
        </div>
      </section>

      <section className="py-8 bg-white shadow">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-blood/10 rounded-full flex items-center justify-center mb-3">
                <Droplet className="h-6 w-6 text-blood" />
              </div>
              <h3 className="font-medium text-blood-navy">All Blood Types Needed</h3>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-blood/10 rounded-full flex items-center justify-center mb-3">
                <Clock className="h-6 w-6 text-blood" />
              </div>
              <h3 className="font-medium text-blood-navy">Process Takes ~45 Minutes</h3>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-blood/10 rounded-full flex items-center justify-center mb-3">
                <CalendarIcon className="h-6 w-6 text-blood" />
              </div>
              <h3 className="font-medium text-blood-navy">Open 7 Days a Week</h3>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-10">
            <h2 className="text-2xl font-bold text-blood-navy mb-6">Donor Information</h2>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="john@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="(555) 123-4567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age</FormLabel>
                        <FormControl>
                          <Input type="number" min="18" max="65" placeholder="30" {...field} />
                        </FormControl>
                        <FormDescription>
                          You must be between 18-65 years old to donate.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="bloodType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Blood Type</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                        disabled={!!bloodRequest}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your blood type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {bloodTypes.map((type) => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {bloodRequest && (
                        <FormDescription>
                          Blood type is pre-selected based on the patient's needs.
                        </FormDescription>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <h2 className="text-2xl font-bold text-blood-navy pt-4">Appointment Details</h2>
                
                <FormField
                  control={form.control}
                  name="donationDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Donation Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Select date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => 
                              date < new Date() || 
                              date > new Date(new Date().setDate(new Date().getDate() + 30))
                            }
                            initialFocus
                            className="pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        Appointments are available up to 30 days in advance.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="donationTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Time</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a time slot" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {timeSlots.map((slot) => (
                              <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="donationCenter"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Donation Center</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                          disabled={!!bloodRequest}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a donation center" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {donationCenters.map((center) => (
                              <SelectItem key={center} value={center}>{center}</SelectItem>
                            ))}
                            {bloodRequest && !donationCenters.includes(bloodRequest.hospitalName) && (
                              <SelectItem value={bloodRequest.hospitalName}>
                                {bloodRequest.hospitalName}
                              </SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                        {bloodRequest && (
                          <FormDescription>
                            Donation center is pre-selected based on the request.
                          </FormDescription>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <h2 className="text-2xl font-bold text-blood-navy pt-4">Health Information</h2>
                
                <FormField
                  control={form.control}
                  name="previousDonation"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Have you donated blood before?</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex space-x-4"
                        >
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="yes" />
                            </FormControl>
                            <FormLabel className="font-normal">Yes</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="no" />
                            </FormControl>
                            <FormLabel className="font-normal">No</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="medicalConditions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Medical Conditions or Medications (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Please list any medical conditions or medications that might affect your ability to donate blood."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        This information helps us determine your eligibility to donate.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {requestId && (
                  <input type="hidden" {...form.register('bloodRequestId')} value={requestId} />
                )}

                <div className="pt-4">
                  <Button type="submit" className="bg-blood hover:bg-blood-dark w-full md:w-auto">
                    Schedule Appointment
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

export default Donate;
