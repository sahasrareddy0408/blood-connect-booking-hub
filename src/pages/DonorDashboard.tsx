
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Droplet } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { bloodRequestService, donationService } from "@/services/api";
import { toast } from "@/components/ui/use-toast";
import { useNavigate, useSearchParams } from "react-router-dom";

interface BloodRequest {
  _id: string;
  patientName: string;
  bloodType: string;
  unitsNeeded: number;
  hospital: string;
  location: string;
  urgency: string;
  requestDate: string;
}

const DonorDashboard = () => {
  const { user } = useAuth();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [timeSlot, setTimeSlot] = useState("");
  const [appointments, setAppointments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<BloodRequest | null>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const requestId = searchParams.get('requestId');

  // Fetch donor's appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      if (user) {
        try {
          const response = await donationService.getDonorAppointments(user.id);
          setAppointments(response.data);
        } catch (error) {
          console.error('Error fetching appointments:', error);
        }
      }
    };

    fetchAppointments();
  }, [user]);

  // Fetch the requested blood request if requestId is provided
  useEffect(() => {
    const fetchRequestDetails = async () => {
      if (requestId) {
        try {
          const response = await bloodRequestService.getRequestById(requestId);
          setSelectedRequest(response.data);
        } catch (error) {
          console.error('Error fetching request details:', error);
          toast({
            variant: "destructive",
            title: "Error",
            description: "Could not fetch the requested blood donation details",
          });
        }
      }
    };

    fetchRequestDetails();
  }, [requestId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select a date for your appointment",
      });
      return;
    }
    
    if (!timeSlot) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select a time slot for your appointment",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const appointmentData = {
        donorId: user?.id,
        donorName: user?.name,
        bloodRequestId: selectedRequest?._id,
        appointmentDate: date,
        timeSlot,
        status: "scheduled",
      };
      
      await donationService.scheduleDonation(appointmentData);
      
      toast({
        title: "Success",
        description: "Your donation appointment has been scheduled",
      });
      
      // Refresh the appointments list
      if (user) {
        const response = await donationService.getDonorAppointments(user.id);
        setAppointments(response.data);
      }
      
      // Clear form
      setDate(undefined);
      setTimeSlot("");
      setSelectedRequest(null);
      
      // Clear the URL parameter
      navigate('/donor-dashboard');
    } catch (error) {
      console.error('Error scheduling appointment:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not schedule your appointment. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-bold mb-6">Donor Dashboard: {user.name}</h1>
      
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Schedule Donation Form */}
        <Card>
          <CardHeader>
            <CardTitle>Schedule a Blood Donation</CardTitle>
            <CardDescription>
              {selectedRequest 
                ? `Donating for ${selectedRequest.patientName} (${selectedRequest.bloodType})`
                : "Fill out the form to schedule your donation appointment"}
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {selectedRequest && (
                <div className="bg-gray-50 p-4 rounded-md mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">{selectedRequest.patientName}</h3>
                    <div className="flex items-center bg-white px-2 py-1 rounded-full border">
                      <Droplet className="h-3 w-3 text-blood mr-1" />
                      <span className="text-sm font-semibold">{selectedRequest.bloodType}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">
                    <strong>Location:</strong> {selectedRequest.hospital}, {selectedRequest.location}
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Urgency:</strong> {selectedRequest.urgency}
                  </p>
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="date">Appointment Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="timeSlot">Time Slot</Label>
                <Select value={timeSlot} onValueChange={setTimeSlot}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time slot" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="09:00 AM - 10:00 AM">09:00 AM - 10:00 AM</SelectItem>
                    <SelectItem value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</SelectItem>
                    <SelectItem value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</SelectItem>
                    <SelectItem value="01:00 PM - 02:00 PM">01:00 PM - 02:00 PM</SelectItem>
                    <SelectItem value="02:00 PM - 03:00 PM">02:00 PM - 03:00 PM</SelectItem>
                    <SelectItem value="03:00 PM - 04:00 PM">03:00 PM - 04:00 PM</SelectItem>
                    <SelectItem value="04:00 PM - 05:00 PM">04:00 PM - 05:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full bg-blood hover:bg-blood/90 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Scheduling..." : "Schedule Donation"}
              </Button>
            </CardFooter>
          </form>
        </Card>
        
        {/* Upcoming Appointments */}
        <Card>
          <CardHeader>
            <CardTitle>Your Donation Appointments</CardTitle>
            <CardDescription>
              View your upcoming and past donation appointments
            </CardDescription>
          </CardHeader>
          <CardContent>
            {appointments.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-gray-500">You have no scheduled appointments yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {appointments.map((appointment, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold">
                        {new Date(appointment.appointmentDate).toLocaleDateString()}
                      </h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        appointment.status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : appointment.status === 'cancelled'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">
                      <strong>Time:</strong> {appointment.timeSlot}
                    </p>
                    {appointment.bloodRequestId && (
                      <p className="text-sm text-gray-700">
                        <strong>Request ID:</strong> {appointment.bloodRequestId}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DonorDashboard;
