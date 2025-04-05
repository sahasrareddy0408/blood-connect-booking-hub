
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { bloodRequestService } from "@/services/api";
import { Droplet, Calendar, MapPin, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";

interface BloodRequest {
  _id: string;
  patientName: string;
  bloodType: string;
  unitsNeeded: number;
  hospital: string;
  location: string;
  urgency: string;
  requestDate: string;
  status: string;
}

const Donate = () => {
  const [bloodRequests, setBloodRequests] = useState<BloodRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [searchParams] = useSearchParams();
  const requestId = searchParams.get('requestId');

  useEffect(() => {
    const fetchBloodRequests = async () => {
      try {
        const response = await bloodRequestService.getAllRequests();
        setBloodRequests(response.data);
      } catch (error) {
        console.error("Error fetching blood requests:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load blood requests. Please try again later.",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBloodRequests();
  }, []);

  const handleDonateClick = (requestId: string) => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to schedule a donation.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    
    if (user?.userType !== "donor") {
      toast({
        title: "Action not allowed",
        description: "Only donors can schedule donations.",
        variant: "destructive",
      });
      return;
    }
    
    navigate(`/donor-dashboard?requestId=${requestId}`);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency.toLowerCase()) {
      case 'critical':
        return 'bg-red-600';
      case 'urgent':
        return 'bg-orange-500';
      case 'moderate':
        return 'bg-yellow-500';
      default:
        return 'bg-green-500';
    }
  };

  // If a specific requestId is provided, filter to show only that request
  const displayRequests = requestId 
    ? bloodRequests.filter(req => req._id === requestId) 
    : bloodRequests;

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h1 className="text-3xl font-bold mb-4 text-blood">Blood Donation Requests</h1>
        <p className="text-gray-600">
          Your donation can save lives. Choose a request below to schedule your donation.
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blood"></div>
        </div>
      ) : displayRequests.length === 0 ? (
        <div className="text-center p-10 border rounded-lg bg-gray-50">
          <h3 className="text-xl mb-2">No blood requests found</h3>
          <p className="text-gray-600">
            There are currently no active blood donation requests.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayRequests.map((request) => (
            <Card key={request._id} className="overflow-hidden">
              <div className={`h-2 ${getUrgencyColor(request.urgency)}`}></div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{request.patientName}</CardTitle>
                  <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                    <Droplet className="h-4 w-4 text-blood mr-1" />
                    <span className="font-semibold">{request.bloodType}</span>
                  </div>
                </div>
                <CardDescription>
                  <div className="flex items-center mt-2">
                    <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                    {request.hospital}, {request.location}
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <div className="text-gray-500">Urgency</div>
                    <div className="font-medium capitalize">{request.urgency}</div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <div className="text-gray-500">Units Needed</div>
                    <div className="font-medium">{request.unitsNeeded} unit(s)</div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <div className="text-gray-500">Posted</div>
                    <div className="font-medium">
                      {new Date(request.requestDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-blood hover:bg-blood/90 text-white" 
                  onClick={() => handleDonateClick(request._id)}
                >
                  Donate Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <div className="text-center mt-12">
        <h3 className="text-xl font-semibold mb-4">Why Donate Blood?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="p-6 border rounded-lg bg-white shadow-sm">
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-red-100 p-3">
                <Droplet className="h-6 w-6 text-blood" />
              </div>
            </div>
            <h4 className="font-semibold mb-2">Save Lives</h4>
            <p className="text-sm text-gray-600">
              Your donation can help save up to three lives with a single unit of blood.
            </p>
          </div>

          <div className="p-6 border rounded-lg bg-white shadow-sm">
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-red-100 p-3">
                <Calendar className="h-6 w-6 text-blood" />
              </div>
            </div>
            <h4 className="font-semibold mb-2">Regular Need</h4>
            <p className="text-sm text-gray-600">
              Blood is needed every 2 seconds for emergencies and ongoing medical care.
            </p>
          </div>

          <div className="p-6 border rounded-lg bg-white shadow-sm">
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-red-100 p-3">
                <User className="h-6 w-6 text-blood" />
              </div>
            </div>
            <h4 className="font-semibold mb-2">Health Benefits</h4>
            <p className="text-sm text-gray-600">
              Donating blood can reduce the risk of heart attacks and cancer.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donate;
