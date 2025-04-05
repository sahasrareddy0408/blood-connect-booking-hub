
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { bloodRequestService } from "@/services/api";
import { useToast } from "@/components/ui/use-toast";

interface BloodRequest {
  _id: string;
  patientName: string;
  hospitalName: string;
  bloodType: string;
  urgency: string;
  createdAt: string;
  contactName: string;
  unitsNeeded: number;
}

const DonorDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [bloodRequests, setBloodRequests] = useState<BloodRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBloodRequests = async () => {
      try {
        setLoading(true);
        const response = await bloodRequestService.getAllRequests();
        setBloodRequests(response.data);
      } catch (error) {
        console.error("Error fetching blood requests:", error);
        toast({
          title: "Failed to load blood requests",
          description: "Please try refreshing the page.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBloodRequests();
  }, [toast]);

  const getUrgencyColor = (urgency: string) => {
    switch (urgency.toLowerCase()) {
      case "urgent":
        return "bg-red-500 hover:bg-red-600";
      case "high":
        return "bg-amber-500 hover:bg-amber-600";
      default:
        return "bg-primary hover:bg-primary/90";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const handleDonateClick = (requestId: string) => {
    // Navigate to donation form for specific request
    navigate(`/donate?requestId=${requestId}`);
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Donor Dashboard</h1>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Last Donation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">March 12, 2025</p>
            <p className="text-muted-foreground">85 days ago</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Blood Type</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">O+</p>
            <p className="text-muted-foreground">Universal Donor</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Donations</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">8</p>
            <p className="text-muted-foreground">Total Lifetime</p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-bold mb-4">Blood Requests Near You</h2>
      
      {loading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blood"></div>
        </div>
      ) : bloodRequests.length === 0 ? (
        <Card className="text-center p-6">
          <p className="text-lg text-muted-foreground">No blood requests available at the moment.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {bloodRequests.map((request) => (
            <Card key={request._id} className={request.urgency.toLowerCase() === "urgent" ? "border-red-500 border-2" : ""}>
              <CardContent className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-lg">{request.hospitalName}</h3>
                    {request.urgency.toLowerCase() === "urgent" && (
                      <Badge variant="destructive">EMERGENCY</Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground mb-2">
                    Patient: {request.patientName} • Posted on {formatDate(request.createdAt)}
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <Badge variant="outline" className="text-lg px-3">
                      {request.bloodType}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Units needed: {request.unitsNeeded}
                    </span>
                  </div>
                </div>
                <Button 
                  className={getUrgencyColor(request.urgency)}
                  onClick={() => handleDonateClick(request._id)}
                >
                  Donate Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default DonorDashboard;
